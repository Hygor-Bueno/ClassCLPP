import { UserCheckList } from "../Connection/UserCheckList.js";
import { $, $_all, closeModal, getB_id } from "../Util/compressSyntaxe.js";
import { MessageList } from "./messageList.js";
import { Users } from "./objects/user.js";
import { ConnectionCLPP } from "../Connection/ConnectionCLPP.js";
import { GeneralModal } from "./generalModal/modal_geral.js";

export class ListUser {
  // TEMPLATES:
  messageList = new MessageList();
  async main(id_user) {
    if (id_user != localStorage.getItem("id")) {
      const user = new Users();
      await user.populate(id_user);
      let data = `
        <div class="divUser" id="sender_${user.getId_user()}" data-update=0>
            <div class="divColab">
                <img id="photoUser" src="${user.getPhoto().src}"/>
                <p>${user.getName()}</p>
            </div>
        </div>                
        `;
      return data;
    } else {
      return "";
    }
  }
  buttonBack() {
    return `
    <div id="displayHeader">  
          <div id="borderBack">
            <img src="./assets/images/cancel.svg" title ="Fechar">
          </div>
          <header id="headerUserList"><h1>Incluir Usuario:</h1></header>
    </div>
    `;
  }
  async checkBoxUser(users, idChecklist) {
    document.querySelector(".container").insertAdjacentHTML("beforeend", "<div id='templateListUser'></div>");
    document.querySelector("#templateListUser").insertAdjacentHTML(
      "beforeend",
      '<div id="listUser" class="style_scroll"></div>'
    );
    document.querySelector("#listUser").insertAdjacentHTML("beforeend", `${users}`);
    let list = document.querySelectorAll("#templateListUser .divUser");
    this.insertVerification(list);
    if (idChecklist) {
      document.querySelector("#templateListUser").insertAdjacentHTML("afterbegin", this.buttonBack());
      getB_id("borderBack").addEventListener("click", () => {
        let user = document.querySelectorAll(".divUser[data-update='1']");
        /* let modal = new GeneralModal();
        let msg = "Houve alteração deseja realmente sair?" 
        let local = document.querySelector('#templateListUser').insertAdjacentHTML("afterbegin", modal.main(msg, true))*/
        if (user.length >= 1 && confirm("Houve alteração deseja realmente sair?")) {
          closeModal();
        } else if (user.length < 1) { closeModal() }
      });
    }

    document.querySelector("#templateListUser").insertAdjacentHTML(
      "beforeend",
      `<div id="buttonGroup"><button id="saveGroup">Salvar</button></div>`
    );
    document.querySelector(".container").setAttribute("style", "display:flex");
    idChecklist && (await this.validationUserChecklist(idChecklist));
    idChecklist && getB_id("saveGroup").addEventListener("click", () => {
      this.updateChecked(idChecklist);
      alert("Atualizado com sucesso!");
      closeModal();
    });
  }

  insertVerification(list) {
    for (const iterator of list) {
      iterator.addEventListener("click", () => {
        iterator.getAttribute("data-update") == 0 ? iterator.setAttribute("data-update", 1) : iterator.setAttribute("data-update", 0);
        document.querySelector(`#${iterator.getAttribute("id")} input[type=checkbox]`
        ).checked
          ? this.markoffUser(iterator.getAttribute("id"))
          : this.markUser(iterator.getAttribute("id"));
      });
      iterator.insertAdjacentHTML(
        "beforeend",
        `<label class="labelCheck" style="display:none"> &#128504; </label><input type="checkbox" style="display:none"/>`
      );
    }
  }

  // FUNCIONALIDADES:
  markUser(idDivUser) {
    console.log(idDivUser);
    document.querySelector(`#${idDivUser} input[type=checkbox]`).checked = true;
    document.querySelector(`#${idDivUser} label`).setAttribute("style", "display:flex");
    document.querySelector(`#templateListUser #${idDivUser} div`).setAttribute("style", "opacity:.3");
  }

  markoffUser(idDivUser) {
    document.querySelector(
      `#${idDivUser} input[type=checkbox]`
    ).checked = false;
    document.querySelector(`#${idDivUser} label`).setAttribute("style", "display:none");
    document.querySelector(`#templateListUser #${idDivUser} div`).setAttribute("style", "opacity:1");
  }

  async validationUserChecklist(idCheck) {
    let userCheckList = new UserCheckList();
    let userAccess = await userCheckList.get("&id_checklist=" + idCheck);
    userAccess &&
      userAccess.forEach((element) => {
        this.markUser(`sender_${element.id_user}`);
      });
  }
  insertChecked() {
    let divUser = $_all("#templateListUser .divUser");
    let arrayUser = [];

    for (let value of divUser) {
      let idUser = value.getAttribute("id");
      if (document.querySelector(`#${idUser} input[type=checkbox]`).checked) {
        arrayUser.push(idUser.split("_")[1]);
      }
    }
    return arrayUser;
  }
  updateChecked(idChecklist) {
    let connectionClpp = new ConnectionCLPP();
    let array = $_all("#templateListUser .divUser");
    let nodeListForArray = Array.from(array);
    let filterUpdate = nodeListForArray.filter((element) => {
      return element.getAttribute("data-update") == 1;
    });

    filterUpdate.forEach((element) => {
      let user = element.getAttribute("id").split("_")[1];

      $(`#${element.getAttribute("id")} input[type=checkbox]`).checked
        ? connectionClpp.post(
          { id_user: user, id_checklist: idChecklist },
          "CLPP/UserCheckList.php",
          true
        )
        : connectionClpp.delete(
          { id_user: user, id_checklist: idChecklist },
          "CLPP/UserCheckList.php",
          true
        );
    });
  }
}

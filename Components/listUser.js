import { UserCheckList } from "../Connection/UserCheckList.js";
import { closeModal, getB_id } from "../Util/compressSyntaxe.js";
import { MessageList } from "./messageList.js";
import { Users } from "./objects/user.js";

export class ListUser {
  messageList = new MessageList();
  async main(id_user) {
    const user = new Users();
    await user.populate(id_user);

    let data = `
        <div class="divUser" id="sender_${user.getId_user()}">
            <div class="divColab">
                <img id="photoUser" src="${user.getPhoto().src}"/>
                <p>${user.getName()}</p>
            </div>

        </div>                
        `;
    return data;
  }

  async checkBoxUser(users, idChecklist) {
    console.log(users, idChecklist)
    document.querySelector(".container").insertAdjacentHTML("beforeend", "<div id='tamplateListUser'></div>")
    document.querySelector("#tamplateListUser").insertAdjacentHTML("beforeend", '<div id="listUser" class="style_scroll"></div>');
    document.querySelector("#listUser").insertAdjacentHTML("beforeend", `${users}`);
    let list = document.querySelectorAll(".divUser");
    for (const iterator of list) {
      iterator.addEventListener("click", () => {
        // console.log(document.querySelector(`#${iterator.getAttribute('id')} input[checkbox]`))
        console.log(iterator.getAttribute('id'))
        document.querySelector(`#${iterator.getAttribute('id')} input[type=checkbox]`).checked ? this.markoffUser(iterator.getAttribute('id')) : this.markUser(iterator.getAttribute('id'))
      })
      iterator.insertAdjacentHTML("beforeend", `<label class="labelCheck" style="display:none"> &#128504; </label><input type="checkbox" style="display:none"/>`);
    }
    if (idChecklist) {
      document.querySelector("#tamplateListUser").insertAdjacentHTML("afterbegin", this.buttonBack());
      getB_id('borderBack').addEventListener("click", () => {closeModal()})
    }
    document.querySelector("#tamplateListUser").insertAdjacentHTML("beforeend", `<div id="buttonGroup"><button id="saveGroup">Salvar</button></div>`);
    document.querySelector(".container").setAttribute("style", "display:flex");
    idChecklist && await this.validationUserChecklist(idChecklist);
  }

  markUser(idDivUser) {
    document.querySelector(`#${idDivUser} input[type=checkbox]`).checked = true;
    document.querySelector(`#${idDivUser} label`).setAttribute('style','display:flex');
  }
  markoffUser(idDivUser) {
    document.querySelector(`#${idDivUser} input[type=checkbox]`).checked = false;
    document.querySelector(`#${idDivUser} label`).setAttribute('style','display:none');
  }

  async validationUserChecklist(idCheck) {
    let userCheckList = new UserCheckList;
    let userAccess = await userCheckList.get("&id_checklist=" + idCheck)
    userAccess && userAccess.forEach(element => { 
      this.markUser(`sender_${element.id_user}`)

    });
  }

  buttonBack() {
    return `
    <div id="displayHeader">  
          <div id="borderBack">
              <img src="./assets/images/setaLeft.svg"/>
          </div>
          <header id="headerUserList"><h1>Incluir Usuario:</h1></header>
    </div>
    `
  }

};

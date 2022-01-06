import { UserCheckList } from "../Connection/UserCheckList.js";
import { $, $_all, closeModal, getB_id } from "../Util/compressSyntaxe.js";
import { MessageList } from "./messageList.js";
import { Users } from "./objects/user.js";

export class ListUser {
  // TEMPLATES:
  messageList = new MessageList();
  async main(id_user) {
    if (id_user != localStorage.getItem('id')) {
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
    }else{
      return "";
    }
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
  async checkBoxUser(users, idChecklist) {    
    document.querySelector(".container").insertAdjacentHTML("beforeend", "<div id='templateListUser'></div>");
    document.querySelector("#templateListUser").insertAdjacentHTML("beforeend", '<div id="listUser" class="style_scroll"></div>');
    document.querySelector("#listUser").insertAdjacentHTML("beforeend", `${users}`);
    let list = document.querySelectorAll("#templateListUser .divUser");
    this.insertVerification(list);
    if (idChecklist){
      document.querySelector("#templateListUser").insertAdjacentHTML("afterbegin", this.buttonBack());
      getB_id('borderBack').addEventListener("click", () => { closeModal() })
    }
    document.querySelector("#templateListUser").insertAdjacentHTML("beforeend", `<div id="buttonGroup"><button id="saveGroup">Salvar</button></div>`);
    document.querySelector(".container").setAttribute("style", "display:flex");
    idChecklist && await this.validationUserChecklist(idChecklist);   
    idChecklist && getB_id('saveGroup').addEventListener("click",()=> this.updateChecked())
}  
  insertVerification(list){
    for (const iterator of list) {
      iterator.addEventListener("click", () => {
        iterator.getAttribute('data-update') == 0 ? iterator.setAttribute('data-update',1):iterator.setAttribute('data-update',0);
        document.querySelector(`#${iterator.getAttribute('id')} input[type=checkbox]`).checked ? this.markoffUser(iterator.getAttribute('id')) : this.markUser(iterator.getAttribute('id'))
      })
      iterator.insertAdjacentHTML("beforeend", `<label class="labelCheck" style="display:none"> &#128504; </label><input type="checkbox" style="display:none"/>`);
    }
  }

  // FUNCIONALIDADES:
  markUser(idDivUser) {
    document.querySelector(`#${idDivUser} input[type=checkbox]`).checked = true;
    document.querySelector(`#${idDivUser} label`).setAttribute('style', 'display:flex');
  }

  markoffUser(idDivUser) {
    document.querySelector(`#${idDivUser} input[type=checkbox]`).checked = false;
    document.querySelector(`#${idDivUser} label`).setAttribute('style', 'display:none');
  }

  async validationUserChecklist(idCheck) {
    let userCheckList = new UserCheckList;
    let userAccess = await userCheckList.get("&id_checklist=" + idCheck)
    userAccess && userAccess.forEach(element => {
      this.markUser(`sender_${element.id_user}`)
    });
  }
  insertChecked(){
    let v = $_all('#templateListUser .divUser input[type=checkbox]').checked;
    console.log(v || 'nenhum colaborador foi verificado.')
  }
  updateChecked(){
    let array = $_all('#templateListUser .divUser');
    let nodeListForArray =  Array.from(array)
    let filterUpdate = nodeListForArray.filter(element => {return element.getAttribute('data-update') == 1})
    filterUpdate.forEach(element=> $(`#${element.getAttribute('id')} input[type=checkbox]`).checked ? alert(` Vou inserir o usuário ${element.getAttribute('id')}`):alert(` Vou excluir o usuário ${element.getAttribute('id')}`))
  }
};

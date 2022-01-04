import { UserCheckList } from "../Connection/UserCheckList.js";
import { Routers } from "../Routers/router.js";
import { MessageList } from "./messageList.js";
import { Users } from "./objects/user.js";

export class ListUser {
  messageList = new MessageList();
  router = new Routers;
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

  async checkBoxUser(ids,idChecklist) {
    console.log(ids, idChecklist)
    
    document.querySelector(".container").insertAdjacentHTML("beforeend", '<div id="listUser" class="style_scroll"></div>');    
    document.querySelector("#listUser").insertAdjacentHTML("beforeend", `${ids}`);
    let list = document.querySelectorAll(".divUser");
    for (const iterator of list) {
      iterator.insertAdjacentHTML("beforeend", `<input type="checkbox" />`);
    }
    document.querySelector(".container").insertAdjacentHTML("afterbegin", this.buttonBack(),);
    document.querySelector(".container").insertAdjacentHTML("beforeend",`<div id="buttonGroup"><button id="saveGroup">Salvar</button></div>`);
    document.querySelector(".container").setAttribute("style", "display:flex");
    await this.validationUserChecklist(idChecklist);
  }

  async validationUserChecklist(idCheck){
    let userCheckList = new UserCheckList;
    let userAccess = await userCheckList.get("&id_checklist=" + idCheck)    
    userAccess && userAccess.forEach(element => {document.querySelector(`#sender_${element.id_user} input`).checked = true});
  }

  buttonBack(){ 
    return`
    <div id="displayHeader">  
          <div id="borderBack">
              <img src="../assets/images/setaLeft.svg" "/>
          </div>
          <header id="headerUserList"><h1>Incluir Usuario</h1></header>
    </div>`
  }

};

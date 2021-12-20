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
  async checkBoxUser(ids) {
    let response = "";
    document.querySelector(".container").insertAdjacentHTML("beforeend", '<div id="listUser"></div>');
    for (const element of ids) {
      response += `${await this.main(element.id)}`;
    }
    document.querySelector("#listUser").insertAdjacentHTML("beforeend", `${response}`);
    let list = document.querySelectorAll(".divUser");
    for (const iterator of list) {
      iterator.insertAdjacentHTML("beforeend", `<input type="checkbox"/>`);
    }
    document.querySelector(".container").insertAdjacentHTML("afterbegin",`<header id="headerUserList"><h1>Incluir sem vergonha</h1></header>` );
    document.querySelector(".container").setAttribute("style", "display:flex");
  }
}

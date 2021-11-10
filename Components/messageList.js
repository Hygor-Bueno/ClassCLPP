import { EmployeePhoto } from "../Connection/EmployeePhoto.js";
import { Message } from "../Connection/Message.js";
var employeePhoto = new EmployeePhoto;

export class MessageList {
    groups = [];
    users = [];
    messages = [];
  
    notSeen() {
        return this.messages.filter(
            (element) => element.notification == 1
        )
    }
    notSeenGroup() {
        return this.groups.filter(
            (element) => element.notification == 1
        )
    }
    notSeenUser() {
        return this.users.filter(
            (element) => element.notification == 1
        )
    }
    async separator(messages) {
        this.messages = []
        for (const iterator of messages) {
            if (iterator.id_group) {
                this.groups.push(iterator)
            } else {
                iterator.photo = await employeePhoto.getPhoto('&id=' + iterator.id_user)
                this.users.push(iterator)
                this.messages.push(iterator)
            }
        }
    }
    async chatCLPP(senderObject) {
        let response =
        `
            <div id="bodyMessageDiv">
                ${this.headerChat(senderObject)}
                ${await this.bodyChat(senderObject)}
                ${this.footerChat()}
            </div>
        `
        return response;
    }
    headerChat(senderObject) {
        let response =
        `
        <header>
            <p><b>${senderObject.name}</b></p>
            <img id="buttonReply" src="assets/images/reply.svg" title="Fechar Mensagem"/>
        </header>
        `
        return response;
    }
    async bodyChat(senderObject) {
        let messages = new Message;
        let getMessage =await messages.get(`&id_user=${localStorage.getItem('id')}&id_send=${senderObject.id}&pages=1`)
        getMessage.reverse()
        let response =
        `
        <section>
            ${getMessage.map((element)=>(`
                <div class="${element.id_user != localStorage.getItem('id')?"messageReceived":"messageSend"}">
                    <p>${element.message}</p>
                </div>
            `)).join("")}
        </section>
        `
        return response;
    }
    footerChat(){
        let response= 
        `
        <footer>
            <input id="inputSend" type="text" placeholder="Digite sua mensagem aqui."></input>
            <button id="buttonSend" type="button"><img src="assets/images/enviar.svg" title="Enviar Mensagem"></img></button>
        </footer>
        `
        return response;
    }
    addMessage(message){
        document.querySelector('#bodyMessageDiv section').insertAdjacentHTML('beforeend',`<div class="messageSend"><p>${message}</p></div>`)
    }
}
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
    async separator(listUser) {
        this.messages = []
        for (const iterator of listUser) {
            if (iterator.id_group) {
                iterator.photo = { 'src': "./assets/images/logoCLPP.png" }
                this.groups.push(iterator)
            } else {
                iterator.photo = await employeePhoto.getPhoto('&id=' + iterator.id_user)
                this.users.push(iterator)
            }
            this.messages.push(iterator)
        }
    }
    async chatCLPP(senderObject, page) {
        let response =
            `
            <div id="bodyMessageDiv">
                ${this.headerChat(senderObject)}
                ${await this.bodyChat(senderObject, page)}
                ${this.footerChat()}
            </div>
        `
        return response;
    }
    headerChat(senderObject) {
        let response =
            `
        <header data-id="${senderObject.id}">
            <p><b>${senderObject.name}</b></p>
            <img id="buttonReply" src="assets/images/reply.svg" title="Fechar Mensagem"/>
        </header>
        `
        return response;
    }
    async bodyChat(senderObject, page) {
        let response
        try {
            if (!page) page = 1
            let messages = new Message;
            let getMessage = await messages.get(`&id_user=${localStorage.getItem('id')}${senderObject.destiny}${senderObject.id}&pages=${page}`) 
            getMessage.reverse()

            response =
                `<section>
                    ${getMessage.map((element) => (`
                    <div class="${element.id_user != localStorage.getItem('id') ? "messageReceived" : "messageSend"}">
                        <p>${element.message}</p>
                    </div>`)).join("")}
                </section>`
        } catch (e) {
            console.log(e);
            response = `<section><p class="errorReqMessage">Desculpe. Você não possuí conversas com esse colaborador.</p></section>`;
        }
        return response;
    }
    footerChat() {
        let response =
            `
        <footer>
            <input id="inputSend" type="text" placeholder="Digite sua mensagem aqui."></input>
            <button id="buttonSend" type="button"><img src="assets/images/enviar.svg" title="Enviar Mensagem"></img></button>
        </footer>
        `
        return response;
    }
    addMessage(local, message, classMessage) {
        document.querySelector(local).insertAdjacentHTML('beforeend', `<div class="${classMessage}"><p>${message}</p></div>`)
    }
}
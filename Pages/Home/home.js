import { Checklist } from "../../Connection/Checklist.js";
import { Employee } from "../../Connection/Employee.js";
import { UsefulComponents } from "../../Util/usefulComponents.js";
import { UserAccess } from "../../Connection/UserAccess.js"
import { Message } from "../../Connection/Message.js";
import { MessageList } from "../../Components/messageList.js";
import { SettingHome } from "./settingHome.js";

var employee = new Employee;
var usefulComponents = new UsefulComponents;
var checklist = new Checklist;
var userAccess = new UserAccess;
var message = new Message;
var listMessage = new MessageList;

export class HomePage extends SettingHome {
    userJson;
    accessClpp;
    checklistJson;
    message;

    async main() {
        this.userJson = await employee.get("&id=" + localStorage.getItem("id"),true);
        this.accessClpp = await userAccess.get('&application_id=7&web');
        let nameUser = usefulComponents.splitStringName(this.userJson.name, " ")
        let response =
            `
            <div id="homeDiv">
                <section id="homeLeft">
                    <header id="welcom">
                        <h1>Bem Vindo, ${nameUser} ao CLPP</h1>
                        <p><b>Informações:</b> ${this.userJson.company + " -> " + this.userJson.shop + " -> " + this.userJson.departament + " -> " + this.userJson.sub}</p>
                    </header>
                    <div id="bodyHome">
                        <div id="messageDiv">
                            <header class= "dashboardHome">
                                <h1> Mensagens não Visualizadas: </h1>
                            </header>
                            <div id="bodyChDiv">
                                ${await this.messageReceived()}
                            </div>
                        </div>
                        <div id="checkResponseDiv">
                            <header class= "dashboardHome">
                                <h1> Checklist Respondidos: </h1>
                            </header>
                        </div>
                    </div>
                </section>
                <aside id="homeRight">
                    <div id="checkDiv">
                        <header><h1>Cabeçalho do Checklist</h1></header>
                        <div id=bodyCheckDiv>
                            ${await this.checklistCreated() || `<p></p>`}
                        </div>   
                    </div>
                    <div id="recordDiv">
                        <header><h1>Cabeçalho dos Relatórios </h1></header>
                    </div>
                </aside>
            </div>
            `
        return response;
    }
    async messageReceived() {
        try {
            await message.get("&id=" + localStorage.getItem('id'))
            await listMessage.separator(await message.get("&id=" + localStorage.getItem('id')))
            if (document.getElementById('bodyChDiv')) document.getElementById('bodyChDiv').innerHTML = ""
            return this.validatorChat(listMessage.notSeen()).map((element) => (
                `
                <div class="cardMessageUser" id="${element.id_user? `send_${element.id_user}` :`group_${element.id_group}`}">
                    <img class="photosUsers" src ="${element.photo.src}" />
                    <p>${usefulComponents.splitStringName(element.description, " ")}</p>
                </div>
                `
            )).join("")
        } catch (error) {
            console.error('Falha ao carregar o arquivo: ' + error)
            return `<div class="ErrorPageDefault"><p>Desculpe, não foi possivél carregar as informações...</p></div>`
        }
    }
    async checklistCreated() {
        try {
            this.checklistJson = await checklist.get('&web&id_user=' + localStorage.getItem('id'));            
                return this.checklistJson.map((element) => (
                    `<div class="cardCheck" id="check_${element.id}">
                    <header><p>${element.description.slice(0, 14) + "..."}</p></header>
                    <section>
                        <p><b>Notificação:</b> ${element.notification == 1 ? "Sim" : "Não"}</P>
                        <p><b>Data:</b><br/> ${element.date_init ? "Inicial: " + element.date_init + " <br/> " + "Final:  " + element.date_final : "Não Possuí Válidade Definida."}</P>
                    </section>
                </div>`
                )).join("")            
        } catch (e) {
            console.error(e + " : Falha ao realizar a requisição...")
            return `<div class="ErrorPageDefault"><p>Desculpe, não foi possivél carregar as informações...</p></div>`
        }
    }
    validatorChat(object) {
        if (document.querySelector('#bodyMessageDiv header')) {
            let exception = document.querySelector('#bodyMessageDiv header').getAttribute('data-id');
            let response = object.filter((element) => element.id_user != exception)
            return response;
        } else {
            return object;
        }
    }
    async upMsgReceived(getNotify) {
        console.log(getNotify)
        if (document.getElementById('bodyChDiv')) {
            console.log('Entrei no primeiro if')
            document.getElementById('bodyChDiv').insertAdjacentHTML('beforeend', await this.messageReceived());
            this.settings();
            if (document.getElementById('bodyMessageDiv') && document.querySelector('#bodyMessageDiv header').getAttribute('data-id') == getNotify.send_user) {
                console.log('Entrei no segundo if')
                document.querySelector('#bodyMessageDiv section').insertAdjacentHTML('beforeend', `<div class= "messageReceived"><p>${getNotify.message}</p></div>`)
                document.querySelector('#bodyMessageDiv section').scrollTop = document.querySelector('#bodyMessageDiv section').scrollHeight;
            }
        }
    }
}
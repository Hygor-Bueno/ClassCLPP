import { Checklist } from "../../Connection/Checklist.js";
import { Employee } from "../../Connection/Employee.js";
import { UsefulComponents } from "../../Util/usefulComponents.js";
import { UserAccess } from "../../Connection/UserAccess.js"
import { Message } from "../../Connection/Message.js";
import { MessageList } from "../../Components/messageList.js";
import { SettingHome } from "./settingHome.js";
import { ObjectChecklist } from "../../Components/objects/checklistObject.js";

var employee = new Employee;
var usefulComponents = new UsefulComponents;
var checklist = new Checklist;
var userAccess = new UserAccess;
var message = new Message;
var listMessage = new MessageList;

export class HomePage extends SettingHome {
    userJson;
    accessClpp;
    checklistJson = {};
    message;

    async main() {
        await this.createObjChecklist();
        this.userJson = await employee.get("&id=" + localStorage.getItem("id"), true);
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
                        <div id="bodyCheckDiv">
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
                <div class="cardMessageUser" id="${element.id_user ? `send_${element.id_user}` : `group_${element.id_group}`}">
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
        // try {
            return Object.keys(this.checklistJson).map((element) => (
                `<div class="cardCheck" id="check_${this.checklistJson[element].getIdChecklist()}">
                    <header><h2>${this.checklistJson[element].getTitle().slice(0, 30) + "..."}</h2></header>
                    <section>
                        <article class="articleLeftChecklist style_scroll"> 
                            <div class="notificationChecklist">
                                <p><b>Notificação:</b></p> 
                                ${this.checklistJson[element].getNotification() == 1 ? "<p class='unicNotifyOn'>&#10003;</p>" : "<p class='unicNotifyOff'>&#128473;</p>"}
                            </div>
                            <div class="dateChecklist">
                                <p><b>Data:</b> ${this.checklistJson[element].getDate_init() ? "<br/> Inicial: " + this.checklistJson[element].getDate_init() + " <br/> " + "Final:  " + this.checklistJson[element].getDate_final() : "Não Possuí Válidade Definida."}</P>
                            </div>
                            <div class="checklistItensQuantities">
                                ${this.tamplateQuestions(this.checklistJson[element])}
                            <div>
                        </article>
                        <article class="articleRigthChecklist style_scroll"> 
                        
                        <article>  
                    </section>
                </div>`)).join("")
        // } catch (e) {
        //     console.error(e + " : Falha ao realizar ao carregar o tamplate...")
        //     return `<div class="ErrorPageDefault"><p>Desculpe, não foi possivél carregar as informações...</p></div>`
        // }
    }
    tamplateQuestions(checklist){
        console.log(checklist.getIdChecklist())
        let jsonQuestion = this.addressIssues(checklist);
        return `
        <p><b>Quantidade de Itens:</b> ${jsonQuestion.numberItems}</p>
        <p><b>Quantidade de Assinaturas:</b> ${jsonQuestion.numberQuestions}</p>
        <p><b>Quantidade de Questões:</b> ${jsonQuestion.numberSignatures}</p>
        <div class="listQuestionsDiv">
            <div class="listQuestionsHeader"><b>Vizualizar lista de questões:</b><button type="button" class="viewQuizList" data-id="${checklist.getIdChecklist()}" id="viewQuizList_${checklist.getIdChecklist()}"></button></div>
            <div class="listQuestions" id="listQuestion_${checklist.getIdChecklist()}"><ol>${jsonQuestion.listItens.map(element => (`<li>${element}</li>`)).join("")}</ol></div>
        </div>

        `
    }
    addressIssues(checklist) {
        let total_items = checklist.getQuestion().length;
        let signatures=0;
        let title_Questions = [];
        checklist.getQuestion().forEach((element,index) => {
            if (element.type > 2){signatures++;}
            title_Questions.push(element.description)
        })
        let response = {numberItems:total_items,numberSignatures:signatures,numberQuestions:total_items - signatures,listItens:title_Questions} 
        return response
    }
    async createObjChecklist() {
        let req = await checklist.get('&web&id_user=' + localStorage.getItem('id'));
        req.forEach(element => {
            let objectChecklist = new ObjectChecklist;
            objectChecklist.loadingCheckDataBase(element);
            this.checklistJson[element.id] = objectChecklist;
        })
        return;
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
        console.log(getNotify.message)
        if (document.getElementById('bodyChDiv')) {
            document.getElementById('bodyChDiv').insertAdjacentHTML('beforeend', await this.messageReceived());
            this.settings();
            if (document.getElementById('bodyMessageDiv') && document.querySelector('#bodyMessageDiv header').getAttribute('data-id') == getNotify.send_user) {
                document.querySelector('#bodyMessageDiv section').insertAdjacentHTML('beforeend', `${getNotify.type == 2 ?
                    `<div class="messageReceived formatImg"><img src=http://192.168.0.99:71/GLOBAL/Controller/CLPP/uploads/${getNotify.message}></div>`
                    :
                    `<div class= "messageReceived"><p>${getNotify.message}</p></div>`}`)
                document.querySelector('#bodyMessageDiv section').scrollTop = document.querySelector('#bodyMessageDiv section').scrollHeight;
            }
        }
    }
}
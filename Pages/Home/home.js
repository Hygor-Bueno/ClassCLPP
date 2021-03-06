import { Checklist } from "../../Connection/Checklist.js";
import { Employee } from "../../Connection/Employee.js";
import { UsefulComponents } from "../../Util/usefulComponents.js";
import { UserAccess } from "../../Connection/UserAccess.js"
import { Message } from "../../Connection/Message.js";
import { MessageList } from "../../Components/messageList.js";
import { SettingHome } from "./settingHome.js";
import { ObjectChecklist } from "../../Components/objects/checklistObject.js";
import { WebSocketCLPP } from "../../Connection/WebSocket.js";
import { TemplateChecklist } from "../../Components/templateChecklist.js";
import { ConnectionCLPP } from "../../Connection/ConnectionCLPP.js";
import { RecordObject } from "../../Components/objects/recordObject.js";

var employee = new Employee;
var usefulComponents = new UsefulComponents;
var checklist = new Checklist;
var userAccess = new UserAccess;
var message = new Message;
var listMessage = new MessageList;
var ws = new WebSocketCLPP;
var connectionCLPP = new ConnectionCLPP;

export class HomePage extends SettingHome {

    userJson;
    accessClpp;
    checklistJson = {};
    message;
    teplateChecklist = new TemplateChecklist;
    getRecord;
    async main() {
        this.userJson = await employee.get("&id=" + localStorage.getItem("id"), true);
        await this.createObjChecklist();
        this.getRecord =  await connectionCLPP.get(`&id_user=${localStorage.getItem("id")}`, "CLPP/Record.php");
        // console.log(await employee.get("&id=5", true))
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
                            <div id="bodyReportDiv" class="style_scroll">
                            </div>
                        </div>
                    </div>
                </section>
                <aside id="homeRight">
                    <div id="checkDiv">
                        <header><h1>Checklist criados:</h1></header>
                        <div id="bodyCheckDiv">
                            ${this.checklistCreated() || `<p></p>`}
                        </div>   
                    </div>
                    <div id="recordDiv">
                    
                        <header><h1>Relatório Criados:  </h1> 
                            <button type="button" id="teste">T</button>
                            <button type="button" id="teste2">T2</button>
                        </header>
                    
                        <div id="subRecordDiv" class="style_scroll">
                            <section id="bodyRecordDiv">
                                ${this.recordCreate(this.getRecord) ||  `<p></p>`}
                            </section>
                        </div>
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
    checklistCreated() {
        let resp;
        try {
            resp = Object.keys(this.checklistJson).map((element) => (
                `<div class="cardCheck" id="check_${this.checklistJson[element].getIdChecklist()}">
                    <header><h2>${this.checklistJson[element].getTitle().slice(0, 30) + "..."}</h2><button type="button" class="editBtnCss editChecklistCard" id="btnCheckCard_${this.checklistJson[element].getIdChecklist()}"></button></header>
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
                            ${this.templateListLinkedEmployees(this.checklistJson[element])}
                        <article>  
                    </section>
                </div>`)).join("")
        } catch (e) {
            console.error(e + " : Falha ao realizar ao carregar o tamplate...")
            return `<div class="ErrorPageDefault"><p>Desculpe, não foi possivél carregar as informações...</p></div>`
        }
        return resp
    }
    templateListLinkedEmployees(checklist) {
        let response
        try {
            if (!checklist.getLinkedEmployees().length) throw new Error("Não possuí usuários vinculados")
            response = `
            <h2><b>Usuários vinculados: </b></h2>
            <div class="listEmployees">
                <ol>
                    ${checklist.getLinkedEmployees().map(element => (`<li>${element.getName()}</li>`)).join("")}
                </ol>
            </div>
            `
        } catch (e) {
            // console.error(e)
            response = `
            <h2><b>Lista de usuários: </b></h2><br/>         
                <p class= "listEmployeesEmpty">Checklist não possuí usuários vinculados.</p>         
            `
        }
        return response;
    }
    tamplateQuestions(checklist) {
        let jsonQuestion = this.addressIssues(checklist);

        return `
        <p><b>Quantidade de Itens:</b> ${jsonQuestion.numberItems}</p>       
        <p><b>Quantidade de Assinaturas:</b> ${jsonQuestion.numberSignatures}</p>
        <p><b>Quantidade de Questões:</b> ${jsonQuestion.numberQuestions}</p>
        <div class="listQuestionsDiv">
            <div class="listQuestionsHeader"><p><b>Vizualizar lista de questões:</b><button type="button" class="viewQuizList" data-id="${checklist.getIdChecklist()}" id="viewQuizList_${checklist.getIdChecklist()}"></button></p></div>
            <div class="listQuestions" id="listQuestion_${checklist.getIdChecklist()}"><ol>${jsonQuestion.listItens.map(element => (`<li>${element}</li>`)).join("")}</ol></div>
        </div>
        `
    }
    addressIssues(checklist) {
        let total_items = checklist.getQuestion().length;
        let signatures = 0;
        let title_Questions = [];
        checklist.getQuestion().forEach((element) => {
            if (element.type > 2) { signatures++; }
            title_Questions.push(element.description)
        })
        let response = { numberItems: total_items, numberSignatures: signatures, numberQuestions: total_items - signatures, listItens: title_Questions }
        return response
    }
    async createObjChecklist() {
        try{
            let req = await checklist.get('&web&id_user=' + localStorage.getItem('id'));
            req.forEach(element => {
                let objectChecklist = new ObjectChecklist;
                objectChecklist.loadingCheckDataBase(element);
                this.checklistJson[element.id] = objectChecklist;
            })

            return;
        }catch (exception) {
            console.log(exception)
            return `<P></P>`
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
        let aux = getNotify.group_id || getNotify.send_user
        console.log(getNotify);
        await listMessage.receiverName();
        if (document.getElementById('bodyChDiv')) {
            document.getElementById('bodyChDiv').insertAdjacentHTML('beforeend', await this.messageReceived());
            this.notifyMessage()
            if (document.getElementById('bodyMessageDiv') && aux == document.querySelector('#bodyMessageDiv header').getAttribute('data-id')) {
                document.querySelector('#bodyMessageDiv section').insertAdjacentHTML('beforeend', `${getNotify.type == 2 ?
                    `<div class="messageReceived formatImg">${getNotify.group_id ? `<span>${listMessage.employeers[getNotify.send_user] + ": "}</span>` : ""}<img src=http://192.168.0.99:71/GLOBAL/Controller/CLPP/uploads/${getNotify.message}></div>` : `<div class= "messageReceived"> ${getNotify.group_id ? `<span>${listMessage.employeers[getNotify.send_user].user + ": "}</span>` : ``} <p>${getNotify.message}</p></div>`}`)
                document.querySelector('#bodyMessageDiv section').scrollTop = document.querySelector('#bodyMessageDiv section').scrollHeight;
                console.log([document.querySelector('#bodyMessageDiv header').getAttribute('data-destiny'), document.querySelector('#bodyMessageDiv header').getAttribute('data-id')])
                ws.informPreview([document.querySelector('#bodyMessageDiv header').getAttribute('data-destiny'), document.querySelector('#bodyMessageDiv header').getAttribute('data-id')])
            }
        }
    }
}
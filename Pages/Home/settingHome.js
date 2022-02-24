import { MessageList } from "../../Components/messageList.js";
import { getB_id, $_all, $, closeModal, openModal } from "../../Util/compressSyntaxe.js";
import { UsefulComponents } from "../../Util/usefulComponents.js"
import { Validation } from "../../Util/validation.js";
import { GeneralModal } from '../../Components/generalModal/modal_geral.js'
import { Message } from "../../Connection/Message.js";
import { WebSocketCLPP } from "../../Connection/WebSocket.js";
import { Routers } from "../../Routers/router.js";
import { ConnectionCLPP } from "../../Connection/ConnectionCLPP.js";
import { RecordObject } from "../../Components/objects/recordObject.js";
import { ObjectChecklist } from "../../Components/objects/checklistObject.js";
import { ClppGraphichObject } from "../../Components/objects/clppGraphichObject.js";

var listMessage = new MessageList
var validator = new Validation
var generalModal = new GeneralModal;
var usefulComponents = new UsefulComponents;
var messages = new Message;
var webSocket = new WebSocketCLPP;
var connectionCLPP = new ConnectionCLPP;

export class SettingHome {
    recordObject = new RecordObject;
    checklistObject = new ObjectChecklist;
    objectRecord={};
    async settings() {
        this.notifyMessage();
        this.carousel();
        this.buttonCardChecklist();
        this.buttonEditChecklist();
        await this.reportAnsweredToday(this.checklistJson)
        this.configRecord()
    }
    openMessage() {
        getB_id('message').setAttribute('style', 'display:flex')
    }
    closeMessage() {
        getB_id('message').setAttribute('style', 'display:none')
        document.querySelector('#message :first-child').remove()
    }
    notifyMessage() {
        let notify = $_all('.cardMessageUser')
        for (const iterator of notify) {
            var usefulComponentsSplit = new UsefulComponents;
            let split = usefulComponentsSplit.splitString(iterator.getAttribute('id'), '_')
            let objectSenders = usefulComponents.createObject([
                [split[0], split[0]],
                ['id', split[1]],
                ['temp', split],
                ['name', $(`#${iterator.getAttribute('id')} p`).innerText],
                ['destiny', `&id_${split[0]}=`]
            ])
            this.eventNotifyMessage(iterator, objectSenders);
        }
    }
    buttonCardChecklist() {
        $_all('.viewQuizList').forEach(element => {
            element.addEventListener("click", () => {
                let divList = getB_id(`listQuestion_${element.getAttribute('data-id')}`);
                if (window.getComputedStyle(divList, null).display == 'none') {
                    divList.style.display = "flex"
                    element.style.backgroundImage = "url('./assets/images/up.svg')"
                } else {
                    divList.style.display = "none"
                    element.style.backgroundImage = "url('./assets/images/down.svg')"
                }
            })
        })
    }
    eventNotifyMessage(iterator, objectSenders) {
        let temp = objectSenders.temp
        delete objectSenders['temp']
        iterator.addEventListener('click', async () => {
            this.openMessage();                                                                                                             // Abre a tela de chat
            if (document.querySelector('#message :first-child')) document.querySelector('#message :first-child').remove();                  // se já houver um susário carregado na tela, ele remove esse usuário.
            getB_id('message').insertAdjacentHTML('beforeend', await listMessage.chatCLPP(objectSenders, 1))                                // adiciono o template chat dentro da área de mensagens.
            getB_id(`${iterator.getAttribute('id')}`).remove()                                                                              // remove o usuário da lista de mensagens não vizualizadas.
            this.settingsButtonChat(temp)                                                                                                   // Atribui as funcionalidades aos botões do Chat.
            document.querySelector('#bodyMessageDiv section').scrollTop = document.querySelector('#bodyMessageDiv section').scrollHeight;   // Faz com que o Scroll preaneça sempre em baixo.
            webSocket.informPreview([objectSenders.send ? 'send' : 'group', objectSenders.id])                                                 // informa so websocket que o usuário abriu uma mensagem, passando por parâmento o destinatário da mensagem.
        })
    }
    settingsButtonChat(idSender) {
        getB_id('buttonReply').addEventListener('click', () => this.closeMessage());
        getB_id('buttonSend').addEventListener('click', () => { this.buttonSend(idSender, getB_id('inputSend').value, 1, '#bodyMessageDiv section') });
        getB_id('inputSend').addEventListener('keypress', (enter) => { if (enter.key === 'Enter') getB_id('buttonSend').click() })
    }
    async buttonSend(idSender, message, type, local, localScroll) {
        if (type == 2 ? true : validator.minLength(message, 0) && validator.maxLength(message, 200)) {
            let objectSend = [['id_sender', localStorage.getItem('id')], [idSender[0] == 'group' ? "id_group" : `id_user`, idSender[1]], ['message', message], ['type', type]]
            let req = await messages.post(usefulComponents.createObject(objectSend), true);
            listMessage.addMessage(local, message, 'messageSend', type);
            webSocket.informSending(req.last_id, idSender);
            getB_id('inputSend').value = "";
            $('.errorReqMessage') && $('.errorReqMessage').remove();
        } else {
            this.error('Atenção! \n O campo de envio não pode estar vazio... E não deve utrapassar 200 caracteres')
        }
        document.querySelector(localScroll ? localScroll : local).scrollTop = document.querySelector(localScroll ? localScroll : local).scrollHeight;
    }
    error(message) {
        openModal(generalModal.main(message, true))
        generalModal.close()
        setTimeout(() => { closeModal() }, generalModal.readingTime(message));
    }
    carousel() {
        document.querySelector('#bodyCheckDiv').addEventListener("wheel", event => {
            if (event.deltaY > 0) {
                event.target.scrollBy(-$(".cardCheck").offsetWidth, 0)
            } else {
                event.target.scrollBy($(".cardCheck").offsetWidth, 0)
            }
        })
    }

    buttonEditChecklist() {
        $_all(".editChecklistCard").forEach(element => {
            element.addEventListener("click", async () => {
                let router = new Routers;
                localStorage.setItem("editChecklist", element.getAttribute("id").split("_")[1])
                await router.routers("checklistCreated")
            })
        })
    }

    async reportAnsweredToday(checklistJson) {
        // try{
        let reportDay;
        let shops;
        let req = ""
        await Promise.all([connectionCLPP.get(`&id_user=${localStorage.getItem("id")}&notification`, "CLPP/Response.php"), connectionCLPP.get("&company_id=1", 'CCPP/Shop.php')]).then(response => { req = response })
        reportDay = req[0]
        shops = this.shopJson(req[1].data)
        let jsonReportCard = await this.contructorJsonCard(this.recordObject.separateChecklist(reportDay), checklistJson, shops)
        this.cardRecord(jsonReportCard, '#bodyReportDiv');
        // }catch (e) {
        //     console.error(e)
        // }
    }

    async contructorJsonCard(pay, checklistJson, shops) {
        let response = []
        for await (const uniqueChecklist of pay) {
            let userData = await connectionCLPP.get("&id=" + uniqueChecklist[0].id_user, "CCPP/Employee.php")
            let arrayGraphic = this.recordObject.generalGraphic([uniqueChecklist])
            let result = {}
            result.cod = uniqueChecklist[0].id_checklist + "_" + uniqueChecklist[0].id_user + "_" + uniqueChecklist[0].id_shop
            result.user = usefulComponents.splitStringName(userData.data[0].name, " ");
            result.shop = shops[uniqueChecklist[0].id_shop].description;
            result.porcent = arrayGraphic[1][1];
            result.graphich = arrayGraphic;
            response.push(result);
        }
        return response
    }

    cardRecord(jsonReportCard, context) {
        $(`${context}`).insertAdjacentHTML("beforeend", jsonReportCard.map(jsonCard => (
            `
                <div id="${jsonCard.cod}" class="cardRecordClass" >
                    <aside>
                        <p><b>Nome:</b> ${jsonCard.user}</p>
                        <p><b>Unidade:</b> ${jsonCard.shop}</p>
                        <p><b>Pontuação:</b>  ${jsonCard.porcent}%</p>
                    </aside>
                    <section>
                        <canvas id="can_${jsonCard.cod}">
                        </canvas>
                    </section>
                </div>
             `
        )).join(""))
        jsonReportCard.forEach(elementGraphic => this.createGraphichCard(elementGraphic))
    }
    
    createGraphichCard(jsonGraphich) {
        let clppGraphic = new ClppGraphichObject;
        clppGraphic.clppGraphics(jsonGraphich.graphich, `#can_${jsonGraphich.cod}`, 3)
    }
    shopJson(response) {
        let jsonShop = {};
        response.forEach(shop => {
            jsonShop[shop.id] = shop
        })
        return jsonShop;
    }
    recordCreate(arrayRecord) {
        this.createJsonObject(arrayRecord)

        return arrayRecord.data.map(recordCard => (
            `
            <div id="cardRecord_${recordCard.id}" class="cardRecord" data-idrecord="${recordCard.id}">
                <section>
                    <div>
                        <label><b>Nome do relatório:</b></label><P>${recordCard.description}</P>
                    </div>
                    <div>
                        <label><b>Data de criação:</b></label><P>${recordCard.date}</P>
                    </div>
                    <div>
                        <label><b>Pontuação geral:</b></label><p>${recordCard.point}%</p> 
                    </div>                
                </section>
            </div>
            `
        )).join("")
    }
    createJsonObject(arrays){
        arrays.data.forEach(array =>{
            this.objectRecord[array.id] = array;
        })
    }
    configRecord(){
        let routers = new Routers;
        $_all(".cardRecord").forEach(cardRecord => cardRecord.addEventListener("click",()=>{ 
            console.log(this.objectRecord[cardRecord.getAttribute("data-idrecord")])
            localStorage.setItem("jsonRecord",JSON.stringify(this.objectRecord[cardRecord.getAttribute("data-idrecord")]))
            routers.routers("record")
        }))
    }
}
// date: "2022-02-22"
// description: "Record 02"
// filters: "{\"id_shops\": [], \"checklist\": {\"titles\": [\"344\"], \"question\": [], \"date_checklist\": []}, \"date_response\": {\"date_init_response\": \"2022-02-22\", \"date_final_response\": \"2022-02-22\"}}"
// id: "55"
// id_user: "148"
// point: "55.56"
// type: "3"
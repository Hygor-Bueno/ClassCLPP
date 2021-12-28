import { $, $_all, getB_id } from "../../Util/compressSyntaxe.js"
import { MessageList } from "../../Components/messageList.js";
import { UsefulComponents } from "../../Util/usefulComponents.js";
import { Validation } from "../../Util/validation.js";
import { SettingHome } from "../Home/settingHome.js";
import { Message } from "../../Connection/Message.js";
import { ListUser } from "../../Components/listUser.js";
import { WebSocketCLPP } from "../../Connection/WebSocket.js";
import { UserAccess } from "../../Connection/UserAccess.js";
import { Users } from "../../Components/objects/user.js";
import { convertBase64 } from "../../Util/convertBase64.js";

const id = localStorage.getItem("id")

export class SettingMessage {
    userAccess = new UserAccess;
    validation = new Validation;
    messageList = new MessageList;
    usefulComponents = new UsefulComponents;
    settingHome = new SettingHome;
    message = new Message;
    ws = new WebSocketCLPP;
    listUser = new ListUser;
    employeeAccess;
    templateUser;
    divUserAll;
    pages = 1;
    typeMsg;
    chatIdSender;
    chatIdPage;
    chatScroll;
    positionChat=0;

    async setting() {
        this.clickDivUser('.divUser')
        this.searchUser()
        this.scrollMsg()
        this.searchName()
    }
    clickSend() {
        getB_id('buttonSend').addEventListener('click', () => {
            this.sendMsg();
            this.notificationMsg();
        });
        getB_id('inputSend').addEventListener('keypress', (enter) => { if (enter.key === 'Enter') getB_id('buttonSend').click() })
    }
    chergeSendButtom(){
        $('.footSend').innerHTML = " ";
        const chargeButton = `                        
        <input type="file" accept=".doc, .pdf, image/png, image/jpg, image/jpeg, image/gif, video/mp4," id="file">
        <label for="file"><img class="fileButton" src="./assets/images/clip.svg"></label>
        <input type="text" class="msg_write" id='inputSend' maxlength="200">
        <img class="buttonSendMsg" id='buttonSend' src="./assets/images/enviar.svg">
        `;
        $('.footSend').insertAdjacentHTML('beforeend', chargeButton);
        this.clickSend()
    }
    async sendMsg(){
        let sending = getB_id('inputSend').value
        if(sending) {
            this.typeMsg = 1
            await this.settingHome.buttonSend(this.chatIdSender, sending, this.typeMsg, this.chatIdPage, this.chatScroll);
        }else {
            this.previewFile(getB_id('file').files[0])
            this.typeMsg = 2
        }
    }
     previewFile(imgFile){
        let img = document.createElement('img')
        const reader = new FileReader();
        if (imgFile) {
            reader.readAsDataURL(imgFile);
        } else {
            img.src = "";
        }
        reader.onloadend = async () => {            
            img.src = reader.result;   
            await this.settingHome.buttonSend(this.chatIdSender, img.src.replace(/^data:image\/[a-z]+;base64,/,""), this.typeMsg, this.chatIdPage, this.chatScroll);         
        } 
    }
    clickDivUser(local) {
        $_all(local).forEach(element => element.addEventListener('click',  () => {this.clickEvents(element); this.chergeSendButtom()}))
    }
    async clickEvents(element){
        this.pages = 1;
        $('.msg_out').innerHTML = "";   
        this.changeHeader(element);
        $('.user_in').setAttribute('style', 'display:flex');
        $('.templateSearchUser').setAttribute('style', 'display:none');
        $('.searchUnic').setAttribute('style', 'display:none');
        element.querySelector('.imgNotify') && element.querySelector('.imgNotify').setAttribute('src', './assets/images/notification.svg');
        await this.chargePageMsg(this.usefulComponents.splitString(element.getAttribute('id'), '_'),'beforeend');
        $('.msg_out ').scrollTop = $('.msg_out ').scrollHeight;
        this.chatIdSender = this.usefulComponents.splitString(element.getAttribute('id'), '_');
        this.chatIdPage = `#${$('.msg_out section').getAttribute('id')}`;
        this.chatScroll = `.msg_out`;
        this.ws.informPreview(this.chatIdSender);
        this.notificationMsg();
    }
    async chargePageMsg(split, position) {
        let object = split[0] == 'sender' ? { 'id': split[1], 'destiny': '&id_send=' } : { 'id': split[1], 'destiny': '&id_group=' };        
        $('.msg_out').insertAdjacentHTML(position, await this.messageList.bodyChat(object, this.pages))
        $('.msg_out section').setAttribute('id', `pages_${this.pages}`)
    }
    changeHeader(element) {
        $('.colabHead').setAttribute('data-id', element.getAttribute('id'))
        $('.colabHead').innerHTML = element.innerHTML
        $(`.part2 .notifyMsg`) && $(`.part2 .notifyMsg`).remove();
        $('.part2 .colabHead').insertAdjacentHTML('beforeend', 
        `<div class="notifyMsg">
            <img class="imgNotify" src=./assets/images/notification.svg>
        </div>`)
    }
    searchUser() {
        $('.searchUser').addEventListener('click', () => {
            $('.searchUnic').setAttribute('style', 'display:none')
            if ($('.user_in').style.display == 'flex') {
                $('.user_in').setAttribute('style', 'display:none')
                $('.templateSearchUser').setAttribute('style', 'display:flex')
            } else {
                $('.user_in').setAttribute('style', 'display:flex')
                $('.templateSearchUser').setAttribute('style', 'display:none')
            }
        })
    }
    createListUser() {
        let nameArray = []
        const divArray = $_all('.templateSearchUser .divUser')
        for (let index = 0; index < divArray.length; index++) {
            nameArray.push({ 'name': $(`#${divArray[index].getAttribute('id')} p`).innerText, 'id': divArray[index].getAttribute('id')
            .replace('sender_', ' ') })
        }
        return nameArray
    }
    searchName() {
        $('.searchName').addEventListener('click', async () => {
            if($('.searchUserBar').value){
                let searchName = $('.searchUserBar').value
                let findName = this.createListUser().filter(valor => valor.name.toLowerCase().includes(searchName.toLowerCase()))
                $('.user_in').setAttribute('style', 'display:none')
                $('.templateSearchUser').setAttribute('style', 'display:none')
                $('.searchUnic').innerHTML = " "
                $('.searchUnic').setAttribute('style', 'display:flex')
                for (let i = 0; i < findName.length; i++) {
                    if (!findName[i].id.includes(localStorage.getItem('id'))) $('.searchUnic').insertAdjacentHTML("afterbegin", await this.listUser.main(findName[i].id))
                }
            }
            this.clickDivUser('.searchUnic')
        })
        $('.searchUserBar').addEventListener('keypress', (e) => { if (e.key === 'Enter') $('.searchName').click() })
    }
    async visualizationMsg(params) {
        if ($('.colabHead .divColab') && $('.colabHead').getAttribute('data-id').split('_')[1] == params.user){
            $_all('.messageSend')[$_all('.messageSend').length - 1].setAttribute('data-view', '0')
            this.notificationMsg()
        }
    }
    scrollMsg() {
        $('.msg_out').addEventListener('scroll', async () => {
            if($('.msg_out').scrollTop == 0 && !$('.errorReqMessage')){
                this.pages++
                await this.chargePageMsg(this.usefulComponents.splitString($('.colabHead').getAttribute('data-id'), '_'),'afterbegin')
                $('.msg_out').scrollTop = parseInt($(`#pages_${this.pages}`).scrollHeight)
            }
        })
    }
    notificationMsg() {
        let notific = $('.messageSend') && $_all('.messageSend')[$_all('.messageSend').length - 1].getAttribute('data-view')
        if(notific == 1){
            $('.colabHead div:nth-child(2) img').setAttribute('src', './assets/images/notify.svg')
        }else{
            $('.colabHead div:nth-child(2) img').setAttribute('src', './assets/images/notification.svg')
        }
    }
    async methodUnited(dataId) {
        let response = ""
        for (const iterator of dataId.data) {
            if(id != iterator.id)response += await this.listUser.main(iterator.id)
        }
        return response;
    }
    convertArray(obj){
        let response=[],key;
        key = Object.keys(obj)
        key.forEach(valor => {response.push(obj[valor])})
        return response
    }
}
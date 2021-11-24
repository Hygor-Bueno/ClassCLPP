import { $, $_all, getB_id } from "../../Util/compressSyntaxe.js"
import { MessageList } from "../../Components/messageList.js";
import { UsefulComponents } from "../../Util/usefulComponents.js";
import { Validation } from "../../Util/validation.js";
import { SettingHome } from "../Home/settingHome.js";
import { Message } from "../../Connection/Message.js";
import { ListUser } from "../../Components/listUser.js";
import { WebSocketCLPP } from "../../Connection/WebSocket.js";


const id = localStorage.getItem("id")

export class SettingMessage {
    validation = new Validation;
    messageList = new MessageList;
    usefulComponents = new UsefulComponents;
    settingHome = new SettingHome;
    message = new Message;
    ws = new WebSocketCLPP;
    listUser = new ListUser;
    divUserAll;
    pages=1;

    chatIdSender;
    chatIdPage;
    chatScroll;
    async setting() {
        this.clickDivUser()
        this.searchUser()
        this.searchName(await this.message.get("&id=" + id),false)
        this.scrollMsg()
        getB_id('buttonSend').addEventListener('click', ()=> this.settingHome.buttonSend(this.chatIdSender,  this.chatIdPage,  this.chatScroll));
        getB_id('inputSend').addEventListener('keypress', (enter) => { if (enter.key === 'Enter') getB_id('buttonSend').click() })
    }
    clickDivUser() {
        $_all('.divUser').forEach(element =>
            element.addEventListener('click', async () => {
                this.pages=1;
                this.changeHeader(element)
                $('.user_in').setAttribute('style', 'display:flex')
                $('.templateSearchUser').setAttribute('style', 'display:none')
                $('.msg_out :first-child') && $('.msg_out section').remove()
                await this.chargePageMsg(this.usefulComponents.splitString(element.getAttribute('id'), '_'))
                $(`#${element.getAttribute('id')} .notifyMsg img`).setAttribute('src', './assets/images/notification.svg')
                $('.msg_out ').scrollTop = $('.msg_out ').scrollHeight;
                this.chatIdSender=this.usefulComponents.splitString($('.colabHead ').getAttribute('data-id'), "_");
                this.chatIdPage=`#${$('.msg_out section').getAttribute('id')}`;
                this.chatScroll=`.${$('.msg_out ').getAttribute('class')}`;
                this.ws.informPreview(this.chatIdSender)
            }) 
        )
    }
    async chargePageMsg(split) {
        console.log(split)
        let object = split[0] == 'sender' ? { 'id': split[1], 'destiny': '&id_send=' } : { 'id': split[1], 'destiny': '&id_group=' };
        $('.msg_out').insertAdjacentHTML('beforeend', await this.messageList.bodyChat(object,this.pages))
        $('.msg_out section').setAttribute('id', `pages_${this.pages}`)
        
    }
    changeHeader(element) {
        $('.colabHead').setAttribute('data-id', element.getAttribute('id'))
        $('.colabHead').innerHTML = element.innerHTML
        $('.colabHead .notifyMsg img').setAttribute('src','./assets/images/notification.svg')
    }
    searchUser() {
        const getAllNotify =  document.querySelectorAll('.templateSearchUser .notifyMsg');
        getAllNotify.forEach(a => a.remove());
        $('.searchUser').addEventListener('click', async () => {
            if ($('.user_in').style.display == 'flex') {
                $('.user_in').setAttribute('style', 'display:none')
                $('.templateSearchUser').setAttribute('style', 'display:flex')
                this.clickDivUser();
            } else {
                $('.user_in').setAttribute('style', 'display:flex')
                $('.templateSearchUser').setAttribute('style', 'display:none')
            }
        })
    } 
    searchName(obj){
        $('.searchName').addEventListener('click', async () => {
                $('.templateSearchUser').innerHTML = " "
                let searchName = $('.searchUserBar').value
                let findName = obj.filter(valor => valor.description.toLowerCase().includes(searchName.toLowerCase()))
                $('.user_in').setAttribute('style', 'display:none')
                $('.templateSearchUser').setAttribute('style', 'display:flex')
                $('.templateSearchUser').insertAdjacentHTML("afterbegin", await this.listUser.main(findName)) 
                this.clickDivUser();
        })
        $('.searchUserBar').addEventListener('keypress', (e) => {if (e.key === 'Enter') $('.searchName').click()})
    }
    
      
    scrollMsg(){
        $('.msg_out').addEventListener('scroll', () => {
            const sectionPage = $_all('.msg_out section')
            const beatTop = $('.msg_out').scrollTop 
            sectionPage.forEach(element => {console.log(element)})
        })
    }
}

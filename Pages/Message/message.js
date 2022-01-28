import { MessageList } from "../../Components/messageList.js";
import { EmployeePhoto } from "../../Connection/EmployeePhoto.js";
import { Message } from "../../Connection/Message.js";
import { SettingMessage } from "./settingMessage.js";
import { UsefulComponents } from "../../Util/usefulComponents.js";
import { $ } from "../../Util/compressSyntaxe.js";
import { Users } from "../../Components/objects/user.js";

var userJson = {}

export class MessagePage extends SettingMessage {
    message = new Message();
    employeePhoto = new EmployeePhoto();
    messageList = new MessageList();
    usefulComponents = new UsefulComponents();
    
    
    async main() {
        this.employeeAccess = await this.userAccess.get('&application_id=7&web', false);
        const id = localStorage.getItem('id')
        const getInfo = await this.message.get("&id=" + id)
        await this.messageList.separator(getInfo)        
        const user = new Users();
        getInfo.forEach(objs => { 
            user.userInner(objs)
            userJson[objs.id_user ? 'user_' + objs.id_user :'group_'+ objs.id_group] = user.classObj()
        })
        let response =
            `
        <div class="containerMsg">
            <div class="part1">
                <header class="searchHead">
                    <img class="searchName" src="./assets/images/Search.svg">
                    <input type="text" class="searchUserBar">
                    <img class="searchUser" src="./assets/images/icons8-search-client-24.png">
                    <img class="searchGroup" src="./assets/images/icons8-people-working-together-50.png">
                </header>
                <div class="user_in style_scroll" style="display:flex">
                    ${this.userReceived(this.convertArray(userJson))}
                </div>
                <div class="templateSearchUser style_scroll" style="display:none"> 
                    ${await this.methodUnited(this.employeeAccess)}           
                </div>
                <div class="searchUnic style_scroll" style="display:none">
                </div>
            </div>
            <div class="presentation"style="display:flex">
                <img class="imgPresentation" src="./assets/images/logoPPG.png">
            </div>
            <div class="part2" style="display:none">
                <header class="colabHead">
                </header>
                <div class="msg_in">
                    <div class="msg_out style_scroll" id="bodyMessageDiv">
                    </div>
                    <footer class="footSend">
                    </footer>
                </div>
            </div>
        </div>
        `
        return response;
    }
    userReceived(obj) {
        let receiv = obj.sort((a,b) =>  {if(a.notification > b.notification) return -1})
        const conversation = receiv.map((element) => (
            `            
            <div class="divUser" id="${element.id_user ? 'send_' + element.id_user : 'group_' + element.id_group}">
                <div class="divColab">
                    <img id="photoUser" src="${element.photo.src}">
                    <p>${this.usefulComponents.splitStringName(element.description, " ")}</p>
                </div>
                <div class="notifyMsg">
                    <img class="imgNotify" src="${element.notification == 0 ? `assets/images/notification.svg` : `assets/images/notify.svg`}">
                </div>
            </div>
            `
        )).join('')
        return `${conversation}`;
    }
    async setNotify(notify){ 
        const user = new Users();
        await user.populate(notify.send_user);
        if ($('.colabHead .divColab') && ($('.colabHead').getAttribute('data-id').split('_')[1] == notify.send_user || $('.colabHead').getAttribute('data-id').split('_')[1] == notify.group_id )){          
            $('#bodyMessageDiv section').insertAdjacentHTML('beforeend',` ${notify.type == 2 ?
                `<div class="messageReceived formatImg" data-view="0">
                ${notify.group_id ? `<span>${user.getName()}</span>`:""}<img src=http://192.168.0.99:71/GLOBAL/Controller/CLPP/uploads/${notify.message}></div>`
                :
                `<div class= "messageReceived" data-view="0">${notify.group_id ? `<span>${user.getName()}</span>`:""}<p>${notify.message}</p></div>`}`)     
            $('.msg_out ').scrollTop = $('.msg_out ').scrollHeight;
            this.ws.informPreview($('.colabHead').getAttribute('data-id').split('_'));
        }else {
            if(document.querySelector('.user_in :first-child')) document.querySelector('.user_in').innerHTML = ' ';
            userJson[!notify.group_id?'user_'+ notify.send_user:'group_'+ notify.group_id].notification = 1
            $('.user_in').insertAdjacentHTML('beforeend', this.userReceived(this.convertArray(userJson)))
            this.clickDivUser('.user_in .divUser')
        }
    }
}
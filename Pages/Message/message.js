import { MessageList } from "../../Components/messageList.js";
import { EmployeePhoto } from "../../Connection/EmployeePhoto.js";
import { Message } from "../../Connection/Message.js";
import { SettingMessage } from "./settingMessage.js";
import { UsefulComponents } from "../../Util/usefulComponents.js";
import { $ } from "../../Util/compressSyntaxe.js";
import { UserAccess } from "../../Connection/UserAccess.js";
import { Users } from "../../Components/objects/user.js";
import { ListUser } from "../../Components/listUser.js";

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
                    <img class="searchUser" src="./assets/images/person_black_24dp.svg">
                    <img class="searchGroup" src="./assets/images/groups_black_24dp.svg">
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
            <div class="part2">
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
            <div class="divUser" id="${element.id_user ? 'sender_' + element.id_user : 'group_' + element.id_group}">
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
        if ($('.colabHead .divColab') && $('.colabHead').getAttribute('data-id').split('_')[1] == notify.send_user){
            $('.msg_out :first-child') && $('.msg_out section').remove()
            await this.chargePageMsg(this.usefulComponents.splitString($('.colabHead').getAttribute('data-id'), '_'))
            $('.msg_out ').scrollTop = $('.msg_out ').scrollHeight;
        }else{
            console.log("foi")
            if(document.querySelector('.user_in :first-child')) document.querySelector('.user_in').innerHTML = ' ';
            userJson[notify.send_user?'user_'+ notify.send_user:'group_'+ notify.send_user].notification = 1
            $('.user_in').insertAdjacentHTML('beforeend', this.userReceived(this.convertArray(userJson)))
            this.clickDivUser('.user_in .divUser')
        }
    }
}
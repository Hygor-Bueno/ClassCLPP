import { MessageList } from "../../Components/messageList.js";
import { EmployeePhoto } from "../../Connection/EmployeePhoto.js";
import { Message } from "../../Connection/Message.js";
import { SettingMessage } from "./settingMessage.js";
import { UsefulComponents } from "../../Util/usefulComponents.js";
import { $ } from "../../Util/compressSyntaxe.js";
import { UserAccess } from "../../Connection/UserAccess.js";
import { Users } from "../../Components/objects/user.js";
import { ListUser } from "../../Components/listUser.js";

//Modificado por Hygor: Correção do templateSearchUser 
export class MessagePage extends SettingMessage {
    message = new Message();
    employeePhoto = new EmployeePhoto();
    messageList = new MessageList();
    usefulComponents = new UsefulComponents();

    async main() {
        const id = localStorage.getItem('id')
        const getInfo = await this.message.get("&id=" + id)
        await this.messageList.separator(getInfo)
        this.employeeAccess = await this.userAccess.get('&application_id=7&web', false);

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
                <div class="user_in" style="display:flex">
                    ${this.userReceived(getInfo)}
                </div>
                <div class="templateSearchUser" style="display:none"> 
                    ${await this.methodUnited(this.employeeAccess)}           
                </div>
            </div>
            <div class="part2">
                <header class="colabHead">                    
                </header>
                <div class="msg_in">
                    <div class="msg_out"></div>
                    <footer class="footSend">
                        <input type="file" accept=".doc, .pdf, image/png, image/jpg, image/jpeg, image/gif, video/mp4," id="file">
                        <label for="file"><img class="fileButton" src="./assets/images/clip.svg"></label>
                        <input type="text" class="msg_write" id='inputSend' maxlength="200">
                        <img class="buttonSendMsg" id='buttonSend' src="./assets/images/enviar.svg">
                    </footer>
                </div>
            </div>
        </div>
        `
        return response;
    }
    userReceived(obj) {
        return obj.map((element) => (
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
    }
}
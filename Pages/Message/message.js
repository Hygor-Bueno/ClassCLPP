import { MessageList } from "../../Components/messageList.js";
import { EmployeePhoto } from "../../Connection/EmployeePhoto.js";
import { Message } from "../../Connection/Message.js";
import { SettingMessage } from "./settingMessage.js";
import { UsefulComponents } from "../../Util/usefulComponents.js";

export class MessagePage extends SettingMessage{
    message = new Message();
    employeePhoto = new EmployeePhoto();
    messageList = new MessageList();
    usefulComponents = new UsefulComponents();
    
    async main(){
        document.getElementById('message').setAttribute('style', 'display:none'); 
        const id = localStorage.getItem('id')
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
                    ${await this.userReceived(await this.message.get("&id=" + id),true)}
                </div>
                <div class="templateSearchUser" style="display:none">
                    ${await this.userReceived(await this.message.get("&id=" + id),false)}
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

    async userReceived(obj,value){   
        await this.messageList.separator(obj)
        return obj.map((element) => (
            `
            <div class="divUser" id="${element.id_user ? 'user_' + element.id_user :'group_' + element.id_group}">
                <div class="divColab">
                    <img id="photoUser" src="${element.photo.src}"/>
                    <p>${this.usefulComponents.splitStringName(element.description," ")}</p>
                </div>
                <div class="notifyMsg">${value ? `<img class="imgNotify" src="./assets/images/notification.svg">`:" "}</div>
            </div>
            `
        )).join('')
    }

}
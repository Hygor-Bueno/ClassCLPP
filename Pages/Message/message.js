import { MessageList } from "../../Components/messageList.js";
import { EmployeePhoto } from "../../Connection/EmployeePhoto.js";
import { Message } from "../../Connection/Message.js";
import { SettingMessage } from "./settingMessage.js";


export class MessagePage extends SettingMessage{
    message = new Message();
    employeePhoto = new EmployeePhoto();
    messageList = new MessageList();

    async main(){
        document.getElementById('message').setAttribute('style', 'display:none'); 
        const id = localStorage.getItem('id')
        let response = 
        `
        <div class="containerMsg">
            <div class="part1">
                <header class="searchHead">
                    <input type="text" class="searchUserBar">
                    <img class="searchUser" src="./assets/images/person_black_24dp.svg">
                    <img class="searchGroup" src="./assets/images/groups_black_24dp.svg">
                </header>
                <div class="user_in">
                    ${await this.userReceived(await this.message.get("&id=" + id))}
                </div>
            </div>
            <div class="part2">
                <header class="colabHead">
                    <div class="photoColab"></div>
                    <img class="notifyMsg" src="./assets/images/notification.svg">
                </header>
                <div class="msg_in">
                    <div class="msg_out"></div>
                    <footer class="footSend">
                        <img class="fileSend" src="./assets/images/clip.svg">
                        <input type="text" class="msg_write" maxlength="200">
                        <img class="msgSend" src="./assets/images/enviar.svg">
                    </footer>
                </div>
            </div>
        </div>
        `
        return response;
    }

    async userReceived(obj){
        await this.messageList.separator(obj)
         return obj.map((element) => (
            `
            <div class="divUser">
                <div class="divColab">
                    <img id="photoUser" src="${element.photo.src}"/>
                     <p>${element.description}</p>
                </div>
                <img class="notifyMsg" src="./assets/images/notification.svg">
            </div>
            `
        )).join('')
    }
}
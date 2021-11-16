import { UsefulComponents } from "../Util/usefulComponents.js"
import { MessageList } from "./messageList.js";

export class ListUser {
    messageList = new MessageList;
    usefulComponents = new UsefulComponents;
    async main(obj) {
        await this.messageList.separator(obj)
        return obj.map((element) => (
            `
            <div class="divUser" id="${element.id_user ? 'user_' + element.id_user : 'group_' + element.id_group}">
            <div class="divColab">
            <img id="photoUser" src="${element.photo.src}"/>
            <p>${this.usefulComponents.splitStringName(element.description, " ")}</p>
            </div>
            <div class="notifyMsg"></div>
            </div>
            `
        )).join('')
    }
}
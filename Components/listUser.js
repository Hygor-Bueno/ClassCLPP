import { MessageList } from "./messageList.js";
import { Users } from "./objects/user.js";

export class ListUser {
    messageList = new MessageList;
    
    async main(id_user) {
        const user=  new Users;
        await user.populate(id_user);
        let data = `
        <div class="divUser" id="user_${user.getId_user()}">
            <div class="divColab">
                <img id="photoUser" src="${user.getPhoto().src}"/>
                <p>${user.getName()}</p>
            </div>
        </div>                
        ` 
        return  data         
    }

    
}
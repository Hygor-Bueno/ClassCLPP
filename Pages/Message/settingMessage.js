import {$,$_all,getB_id} from "../../Util/compressSyntaxe.js"
import { MessageList } from "../../Components/messageList.js";
import { UsefulComponents } from "../../Util/usefulComponents.js";

export class SettingMessage{
    messageList = new MessageList();
    usefulComponents = new UsefulComponents();
    divUserAll;

    setting(){
        this.divUserAll = $_all('.divUser')
        this.divUserAll.forEach(user => 
            user.addEventListener('click', async () =>{
                document.querySelector('.msg_out :first-child') && document.querySelector('.msg_out section').remove()
                let split = this.usefulComponents.splitString(user.getAttribute('id'), '_')
                let object = split[0] == 'user'? {'id':split[1],'destiny':'&id_send='} : {'id':split[1],'destiny':'&id_group='};                
                $('.msg_out').insertAdjacentHTML('beforeend', await this.messageList.bodyChat(object))
            })
        )
    }
}


import {$,$_all,getB_id} from "../../Util/compressSyntaxe.js"
import { MessageList } from "../../Components/messageList.js";
import { UsefulComponents } from "../../Util/usefulComponents.js";
import { Validation } from "../../Util/validation.js";
import { SettingHome } from "../Home/settingHome.js";

export class SettingMessage{
    validation = new Validation();
    messageList = new MessageList();
    usefulComponents = new UsefulComponents();
    settingHome = new SettingHome();
    divUserAll;

    setting(){
        this.clickDivUser()
    }
    clickDivUser(){
        this.divUserAll = $_all('.divUser')
        this.divUserAll.forEach(element => 
            element.addEventListener('click', async () => {
                this.changeHeader(element)
                $('.msg_out :first-child') && $('.msg_out section').remove()
                await this.chargePageMsg(element)
                $('.msg_out ').scrollTop = $('.msg_out ').scrollHeight;
            })
            )
        }
        async chargePageMsg(element){
            let split = this.usefulComponents.splitString(element.getAttribute('id'), '_')
            let object = split[0] == 'user'? {'id':split[1],'destiny':'&id_send='} : {'id':split[1],'destiny':'&id_group='};
            $('.msg_out').insertAdjacentHTML('beforeend', await this.messageList.bodyChat(object))
            $('.msg_out section').setAttribute('id', 'page_1')        
            this.settingHome.buttonSend(this.usefulComponents.splitString($('.colabHead ').getAttribute('data-id'),"_")[1],`#${$('.msg_out section').getAttribute('id')}`, `.${$('.msg_out ').getAttribute('class')}`)
    }
    changeHeader(element){
        $('.colabHead').setAttribute('data-id', element.getAttribute('id'))
        $('.colabHead').innerHTML = element.innerHTML
    }
}

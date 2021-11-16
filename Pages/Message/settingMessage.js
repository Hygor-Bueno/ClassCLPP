import { $, $_all, getB_id } from "../../Util/compressSyntaxe.js"
import { MessageList } from "../../Components/messageList.js";
import { UsefulComponents } from "../../Util/usefulComponents.js";
import { Validation } from "../../Util/validation.js";
import { SettingHome } from "../Home/settingHome.js";
import { Message } from "../../Connection/Message.js";
import { ListUser } from "../../Components/listUser.js";

const id = localStorage.getItem('id')

export class SettingMessage {
    validation = new Validation();
    messageList = new MessageList();
    usefulComponents = new UsefulComponents();
    settingHome = new SettingHome();
    message = new Message();
    listUser = new ListUser;
    divUserAll;

    async setting() {
        this.clickDivUser()
        this.searchUser(await this.message.get("&id=" + id),false)
        this.searchName(await this.message.get("&id=" + id),false)
    }
    clickDivUser() {
        console.log("asd")
        this.divUserAll = $_all('.divUser')
        this.divUserAll.forEach(element =>
            element.addEventListener('click', async () => {
                this.changeHeader(element)
                $('.user_in').setAttribute('style', 'display:flex')
                $('.templateSearchUser').setAttribute('style', 'display:none')
                $('.msg_out :first-child') && $('.msg_out section').remove()
                await this.chargePageMsg(element)
                $('.msg_out ').scrollTop = $('.msg_out ').scrollHeight;
            })
        )
    }
    async chargePageMsg(element) {
        let split = this.usefulComponents.splitString(element.getAttribute('id'), '_')
        let object = split[0] == 'user' ? { 'id': split[1], 'destiny': '&id_send=' } : { 'id': split[1], 'destiny': '&id_group=' };
        $('.msg_out').insertAdjacentHTML('beforeend', await this.messageList.bodyChat(object))
        $('.msg_out section').setAttribute('id', 'page_1')
        this.settingHome.buttonSend(this.usefulComponents.splitString($('.colabHead ').getAttribute('data-id'), "_")[1], `#${$('.msg_out section').getAttribute('id')}`, `.${$('.msg_out ').getAttribute('class')}`)
        
    }
    changeHeader(element) {
        $('.colabHead').setAttribute('data-id', element.getAttribute('id'))
        $('.colabHead').innerHTML = element.innerHTML
    }
    searchUser(obj) {
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
                console.log('eis-me aqui!')
        })
        $('.searchUserBar').addEventListener('keypress', (e) => {if (e.key === 'Enter') $('.searchName').click()})
    }
}

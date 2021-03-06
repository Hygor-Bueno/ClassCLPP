import { $, $_all, getB_id, closeModal, openModal } from "../../Util/compressSyntaxe.js"
import { MessageList } from "../../Components/messageList.js";
import { UsefulComponents } from "../../Util/usefulComponents.js";
import { Validation } from "../../Util/validation.js";
import { SettingHome } from "../Home/settingHome.js";
import { Message } from "../../Connection/Message.js";
import { ListUser } from "../../Components/listUser.js";
import { WebSocketCLPP } from "../../Connection/WebSocket.js";
import { UserAccess } from "../../Connection/UserAccess.js";
import { GroupMessage } from "../../Components/objects/groupMessage.js";
import { Routers } from "../../Routers/router.js";
import { ConnectionCLPP } from "../../Connection/ConnectionCLPP.js";

export class SettingMessage {
    userAccess = new UserAccess;
    validation = new Validation;
    messageList = new MessageList;
    usefulComponents = new UsefulComponents;
    settingHome = new SettingHome;
    connectionCLPP = new ConnectionCLPP;
    message = new Message;
    ws = new WebSocketCLPP;
    listUser = new ListUser;
    groupMessage = new GroupMessage(localStorage.getItem('id'));
    employeeAccess;
    templateUser;
    divUserAll;
    pages = 1;
    typeMsg;
    chatIdSender;
    chatIdPage;
    chatScroll;
    positionChat = 0;
    allEmployers = {}

    async setting() {
        this.clickDivUser('.divUser')
        this.searchUser()
        this.searchName()
        this.modalImg()
        this.createGroup()
    }
    clickSend() {
        getB_id('buttonSend').addEventListener('click', () => { this.sendMsg(); this.notificationMsg(); });
        getB_id('inputSend').addEventListener('keypress', (enter) => { if (enter.key === 'Enter') getB_id('buttonSend').click() })
    }
    chergeSendButtom() {
        $('.footSend').innerHTML = " ";
        const chargeButton = `                        
        <input type="file" accept=".doc, .pdf, image/png, image/jpg, image/jpeg, image/gif, video/mp4," id="file">
        <label for="file"><img class="fileButton" src="./assets/images/clip.svg"></label>
        <input type="text" class="msg_write" id='inputSend' maxlength="200">
        <img class="buttonSendMsg" id='buttonSend' src="./assets/images/enviar.svg">`;
        $('.footSend').insertAdjacentHTML('beforeend', chargeButton);
        this.clickSend()
    }
    async sendMsg() {
        let sending = getB_id('inputSend').value
        let sendImg = getB_id('file').files[0]
        this.typeMsg = 1
        sending && await this.settingHome.buttonSend(this.chatIdSender, sending, this.typeMsg, this.chatIdPage, this.chatScroll); this.notificationMsg();
        sendImg && this.previewFile(sendImg);
    }
    previewFile(imgFile) {
        this.typeMsg = 2
        let img = document.createElement('img')
        const reader = new FileReader();
        if (imgFile) {
            reader.readAsDataURL(imgFile);
        } else {
            img.src = "";
        }
        reader.onloadend = async () => {
            img.src = reader.result;
            await this.settingHome.buttonSend(this.chatIdSender, img.src.replace(/^data:image\/[a-z]+;base64,/, ""), this.typeMsg, this.chatIdPage, this.chatScroll);
        }
        getB_id('file').value = ""
    }
    clickDivUser(local) {
        $_all(local).forEach(element => element.addEventListener('click', () => { this.clickEvents(element); this.chergeSendButtom() }))
    }
    async clickEvents(element) {
        this.tradeDiv();
        this.preparatePages();
        this.changeHeader(element);
        this.consultGroup();
        $('.user_in').setAttribute('style', 'display:flex');
        $('.searchUnic').setAttribute('style', 'display:none');
        $('.templateSearchUser').setAttribute('style', 'display:none');
        element.querySelector('.imgNotify') && element.querySelector('.imgNotify').setAttribute('src', './assets/images/notification.svg');
        await this.chargePageMsg(this.usefulComponents.splitString(element.getAttribute('id'), '_'), 'beforeend');
        this.chatIdSender = this.usefulComponents.splitString(element.getAttribute('id'), '_');
        this.chatIdPage = `#${$('.msg_out section').getAttribute('id')}`;
        this.chatScroll = `.msg_out`;
        this.ws.informPreview(this.chatIdSender);
        this.notificationMsg();
        this.scrollMsg()
    }
    preparatePages() {
        this.pages = 1;
        $('.msg_out ').remove();
        $('.msg_in').insertAdjacentHTML("afterbegin", '<div class="msg_out style_scroll" id="bodyMessageDiv"></div>');
        this.modalImg();
    }
    async chargePageMsg(split, position) {
        let object = split[0] == 'send' ? { 'id': split[1], 'destiny': '&id_send=' } : { 'id': split[1], 'destiny': '&id_group=' };
        $('.msg_out').insertAdjacentHTML(position, await this.messageList.bodyChat(object, this.pages))
        $('.msg_out ').scrollTop = $('.msg_out ').scrollHeight;
        $('.msg_out section').setAttribute('id', `pages_${this.pages}`)
    }
    changeHeader(element) {
        $('.colabHead').setAttribute('data-id', element.getAttribute('id'))
        $('.colabHead').innerHTML = element.innerHTML
        $(`.part2 .notifyMsg`) && $(`.part2 .notifyMsg`).remove();
        $('.part2 .colabHead').insertAdjacentHTML('beforeend',
            `${element.getAttribute('id').split('_')[0] == "group" ? `<button class="btnOnlyGroup" type="button"><img src="./assets/images/icons8-search-group-24.png"></button>` : ""}
            <div class="notifyMsg">
                <img class="imgNotify" src=./assets/images/notification.svg>
            </div>`)
    }
    searchUser() {
        this.chargeEmploy()
        $('.searchUser').addEventListener('click', async () => {
            if ($('.user_in').style.display == 'flex') {
                $('.user_in').setAttribute('style', 'display:none')
                $('.searchUnic').setAttribute('style', 'display:none')
                $('.templateSearchUser').setAttribute('style', 'display:flex')
            } else {
                $('.templateSearchUser').setAttribute('style', 'display:none')
                $('.searchUnic').setAttribute('style', 'display:none')
                $('.user_in').setAttribute('style', 'display:flex')
            }
            this.clickDivUser('.templateSearchUser .divUser')
        })
    }
    async chargeEmploy() {
        if (!$('.templateSearchUser .divUser')) {
            $('.templateSearchUser').insertAdjacentHTML('beforeend', await this.methodUnited())
        }
    }
    createListUser() {
        let nameArray = []
        const divArray = $_all('.templateSearchUser .divUser')
        for (let index = 0; index < divArray.length; index++) {
            nameArray.push({
                'name': $(`#${divArray[index].getAttribute('id')} p`).innerText, 'id': divArray[index].getAttribute('id').replace('sender_', ' ')
            })
        }
        return nameArray
    }
    searchName() {
        $('.searchName').addEventListener('click', async () => {
            this.chargeEmploy()
            if ($('.searchUserBar').value) {
                let searchName = $('.searchUserBar').value;
                let findName = this.createListUser().filter(valor => valor.name.toLowerCase().includes(searchName.toLowerCase()));
                $('.user_in').setAttribute('style', 'display:none');
                $('.templateSearchUser').setAttribute('style', 'display:none');
                $('.searchUnic').innerHTML = '';
                for (let i = 0; i < findName.length; i++) {
                    if (!findName[i].id.includes(localStorage.getItem('id'))) $('.searchUnic').insertAdjacentHTML("afterbegin", await this.listUser.main(findName[i].id.split('_')[1]))
                }
                $('.searchUnic').setAttribute('style', 'display:flex');
            }
            this.clickDivUser('.searchUnic .divUser')
        })
        $('.searchUserBar').addEventListener('keypress', (e) => { if (e.key === 'Enter') $('.searchName').click() })
    }
    createGroup() {
        $('.searchGroup').addEventListener('click', () => {
            const nameGroup = `
            <div class="nameGroup">
                <header><div id="borderBack">
                <img src="./assets/images/cancel.svg" title ="Fechar">
                </div>
                <h1>Insira o nome do grupo</h1></header>
                <input type="text">
                <footer><button class="buttonProgress"><a>Continuar</a></button></footer>
            </div>`
            openModal(nameGroup);
            this.saveGroup()
            getB_id('borderBack').addEventListener('click', () => closeModal())
        })
    }
    saveGroup() {
        $('.buttonProgress').addEventListener('click', async () => {
            if ($('.nameGroup input').value) {
                await this.groupMessage.main($('.nameGroup input').value)
                closeModal()
                this.usersInGroup(1)
            }
        })
    }
    async usersInGroup(check) {
        this.chargeEmploy()
        let idsUsers = ""
        check == 0 && this.showUsers($('.colabHead').getAttribute('data-id').split('_')[1])
        $_all('.templateSearchUser .divUser').forEach((element) => idsUsers += element.outerHTML)
        await this.listUser.checkBoxUser(idsUsers)
        $('#templateListUser').insertAdjacentHTML("afterbegin", `
        <div id="displayHeader">  
            <div id="borderBack">
                <img src="./assets/images/cancel.svg" title ="Fechar">    
            </div>
            <header id="headerUserList">
                <h1>Usu??rio do grupo:</h1>
            </header>
        </div>`)
        this.settingGroup(check)
    }
    settingGroup(check) {
        getB_id('borderBack').addEventListener('click', () => closeModal())
        getB_id('saveGroup').addEventListener('click', () => {
            if (check == 1){
                this.groupMessage.addUsers(this.listUser.insertChecked());
                this.groupMessage.saveGroupAll();
                const routers = new Routers;
                routers.routers(localStorage.getItem('router'))
            }else{
                this.listUser.updateChecked({ id_group: $('.colabHead').getAttribute('data-id').split('_')[1] }, "CLPP/Group.php")
            }   
            closeModal()
        })
    }
    consultGroup() {
        if ($('.colabHead .btnOnlyGroup')) $('.btnOnlyGroup').addEventListener('click', () => {
            this.usersInGroup(0);
        })
    }
    async showUsers(idGroup) {
        let response = await this.connectionCLPP.get("&id=" + idGroup, "CLPP/Group.php")
        response.data.forEach(user => { user.id_user != localStorage.getItem('id') && this.listUser.markUser(`send_${user.id_user}`) })
    }
    visualizationMsg(params) {
        if ($('.colabHead .divColab') && $('.colabHead').getAttribute('data-id').split('_')[1] == params.user) {
            $_all('.messageSend')[$_all('.messageSend').length - 1].setAttribute('data-view', '0')
            this.notificationMsg()
        }
    }
    scrollMsg() {
        $('.msg_out').addEventListener('scroll', async () => {
            if ($('.msg_out').scrollTop == 0 && !$('.errorReqMessage')) {
                this.pages++
                await this.chargePageMsg(this.usefulComponents.splitString($('.colabHead').getAttribute('data-id'), '_'), 'afterbegin')
                $('.msg_out').scrollTop = parseInt($(`#pages_${this.pages}`).scrollHeight);
            }
        })
    }
    notificationMsg() {
        let notific = $('.messageSend') && $_all('.messageSend')[$_all('.messageSend').length - 1].getAttribute('data-view')
        if (notific == 1) {
            !$('.colabHead div:nth-child(3) img') ? $('.colabHead div:nth-child(2) img').setAttribute('src', './assets/images/notify.svg') :
                $('.colabHead div:nth-child(3) img').setAttribute('src', './assets/images/notify.svg')
        } else {
            !$('.colabHead div:nth-child(3) img') ? $('.colabHead div:nth-child(2) img').setAttribute('src', './assets/images/notification.svg') :
                $('.colabHead div:nth-child(3) img').setAttribute('src', './assets/images/notification.svg')
        }
    }
    async methodUnited() {
        let dataId = await this.userAccess.get('&application_id=7&web', false);
        let response = ""
        let auxArray = []
        let nameId = dataId.data.sort((a, b) => a.user.trim().localeCompare(b.user.trim()));
        for (const iterator of nameId) {
            auxArray.push(this.listUser.main(iterator.id))
        }
        await Promise.all(auxArray).then(data => { response = data.join("") })
        return response;
    }
    convertArray(obj) {
        let response = [], key;
        key = Object.keys(obj)
        key.forEach(valor => { response.push(obj[valor]) })
        return response
    }
    modalImg() {
        $('.msg_out').addEventListener('click', (evt) => {
            if (evt.target.tagName === 'IMG') {
                openModal(`<div id="closeImg"> ${evt.target.outerHTML}</div>`)
                $('.container').addEventListener('click', (events) => {
                    if ($('#closeImg') && !$('#closeImg').contains(events.target)) closeModal()
                })
            }
        })
    }
    tradeDiv() {
        $('.presentation').setAttribute('style', 'display:none')
        $('.part2').setAttribute('style', 'display:flex')
    }
}
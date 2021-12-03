import { MessageList } from "../../Components/messageList.js";
import { getB_id, $_all, $, closeModal, openModal } from "../../Util/compressSyntaxe.js";
import { UsefulComponents } from "../../Util/usefulComponents.js"
import { Validation } from "../../Util/validation.js";
import { GeneralModal } from '../../Components/generalModal/modal_geral.js'
import { Message } from "../../Connection/Message.js";
import { WebSocketCLPP } from "../../Connection/WebSocket.js";

var listMessage = new MessageList
var validator = new Validation
var generalModal = new GeneralModal;
var usefulComponents = new UsefulComponents;
var messages = new Message;
var webSocket = new WebSocketCLPP;

export class SettingHome {
    settings() {
        this.notifyMessage();
    }
    openMessage() {
        getB_id('message').setAttribute('style', 'display:flex')
    }
    closeMessage() {
        getB_id('message').setAttribute('style', 'display:none')
        document.querySelector('#message :first-child').remove()
    }
    notifyMessage() {
        let notify = $_all('.cardMessageUser')
        for (const iterator of notify) {
            var usefulComponentsSplit = new UsefulComponents;
            let split = usefulComponentsSplit.splitString(iterator.getAttribute('id'), '_')
            let objectSenders = usefulComponents.createObject([
                    ['id', split[1]],
                    ['temp',split],
                    ['name', $(`#${iterator.getAttribute('id')} p`).innerText],
                    ['destiny', `&id_${split[0]}=`]
                ])
            this.eventNotifyMessage(iterator, objectSenders);
        }
    }

    eventNotifyMessage(iterator, objectSenders) {
        let temp = objectSenders.temp        
        delete objectSenders['temp']
        iterator.addEventListener('click', async () => {
            this.openMessage();                                                                                                             // Abre a tela de chat
            if (document.querySelector('#message :first-child')) document.querySelector('#message :first-child').remove();                  // se já houver um susário carregado na tela, ele remove esse usuário.
            getB_id('message').insertAdjacentHTML('beforeend', await listMessage.chatCLPP(objectSenders, 1))                                // adiciono o template chat dentro da área de mensagens.
            getB_id(`${iterator.getAttribute('id')}`).remove()                                                                              // remove o usuário da lista de mensagens não vizualizadas.
            this.settingsButtonChat(temp)                                                                                                   // Atribui as funcionalidades aos botões do Chat.
            document.querySelector('#bodyMessageDiv section').scrollTop = document.querySelector('#bodyMessageDiv section').scrollHeight;   // Faz com que o Scroll preaneça sempre em baixo.
            webSocket.informPreview(objectSenders.id)                                                                                       // informa so websocket que o usuário abriu uma mensagem, passando por parâmento o destinatário da mensagem.
        })
    }
    settingsButtonChat(idSender) {
        getB_id('buttonReply').addEventListener('click', () => this.closeMessage());
        getB_id('buttonSend').addEventListener('click',  () => {this.buttonSend(idSender,'#bodyMessageDiv section')});
        getB_id('inputSend').addEventListener('keypress', (enter) => { if (enter.key === 'Enter') getB_id('buttonSend').click() })
    }
    async buttonSend(idSender, local, localScroll) {      
        let input = getB_id('inputSend')
        if (validator.minLength(input.value, 0) && validator.maxLength(input.value, 200)) {
            let objectSend = [['id_sender', localStorage.getItem('id')], [idSender[0] == 'group'?"id_group":`id_user`, idSender[1]], ['message', input.value], ['type', '1']]
            let req = await messages.post(usefulComponents.createObject(objectSend), true)
            listMessage.addMessage(local, input.value, 'messageSend')
            webSocket.informSending(req.last_id, idSender[1])
            input.value = ""
            document.querySelector(localScroll ? localScroll : local).scrollTop = document.querySelector(localScroll ? localScroll : local).scrollHeight;
            $('.errorReqMessage') &&  $('.errorReqMessage').remove();
        } else {
            this.error('Atenção! \n O campo de envio não pode estar vazio... E não deve utrapassar 200 caracteres')
        }        
    }
    error(message) {
        openModal(generalModal.main(message, true))
        generalModal.close()
        setTimeout(() => { closeModal() }, generalModal.readingTime(message));
    }
}

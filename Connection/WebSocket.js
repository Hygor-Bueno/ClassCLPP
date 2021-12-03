import { HomePage } from "../Pages/Home/home.js";
import { MessagePage } from "../Pages/Message/message.js";
import { Message } from "./Message.js";

var ws
var isConnected = false;
const id = localStorage.getItem('id')

export class WebSocketCLPP {
    connectWebSocket() {
        try {
            ws = new WebSocket('ws://192.168.0.99:9191')
            ws.onopen = () => { this.OnOpen() }
            ws.onerror = (ev) => { this.OnError(ev) }
            ws.onclose = () => { this.OnClose() }
            ws.onmessage = (ev) => { this.OnMessage(ev); }
        } catch (error) {
            console.log(error, true)
        }
    }
    OnOpen() {
        let jsonString = {
            auth: localStorage.getItem('token'),
            app_id: 7
        }
        ws.send(JSON.stringify(jsonString))
        isConnected = true
    }
    OnError(ev) {
        console.log(ev.data, true)
    }
    OnClose() {
        setTimeout(() => { this.connectWebSocket() }, 1000)
        isConnected = false
    }
    async OnMessage(ev) {        
        if (ev.data.toString() == "__pong__") {
            pong()
            return
        }
        let getNotify = JSON.parse(ev.data)
        // console.log(getNotify)
        if (getNotify.objectType == 'notification') {
            console.log(' ****** vizualizaram sua mensagem ****** ')
            this.routerSettingsWs(localStorage.getItem('router'), '_viewed',getNotify)
        } else if (getNotify.message) {
            console.log(' ****** Você recebeu uma mensagem ****** ')
            this.routerSettingsWs(localStorage.getItem('router'), '_received',getNotify)
        }
    }
    messageViewed(param){
        const Msg = new MessagePage;
        Msg.visualizationMsg(param)
    }
    async messageReceived(param){
        const Msg = new MessagePage;
        const message = new Message();
        Msg.userReceived(await message.get("&id=" + id));
    }
    homeReceived(param){
        var home = new HomePage;
        home.upMsgReceived(param, document.getElementById('bodyChDiv'))
    }
    routerSettingsWs(page, path,param) {
        console.log(page)
        page += path
        console.log(page)
        switch (page) {
            case 'message_viewed':
                this.messageViewed(param);
                break;
            case 'message_received':
                this.messageReceived(param);
                break;
            case 'home_received':
                this.homeReceived(param);
                break;
            default:
                console.error('Atenção, página não encontrada ou inválida!')
                break;
        }
    }
    // "Eu visualizei a mensagem"
    informPreview(idSender) {
        let jsonString = {
            type: 3,
            send_id: idSender
        }
        ws.send(JSON.stringify(jsonString))
    }
    // Eu estou enviando a mensagem  
    informSending(idMessage, idUserSend) {
        let jsonString = {
            type: 2,
            send_id: idUserSend,
            last_id: idMessage
        }
        ws.send(JSON.stringify(jsonString))
    }
}

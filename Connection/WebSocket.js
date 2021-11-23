import { HomePage } from "../Pages/Home/home.js";
var ws
var isConnected = false;
export class WebSocketCLPP {
    connectWebSocket() {
        try {
            ws = new WebSocket('ws://192.168.0.99:9191')
            ws.onopen =    () => {this.OnOpen()}
            ws.onerror =   (ev) => {this.OnError(ev)}
            ws.onclose =   () => {this.OnClose()}
            ws.onmessage = (ev) => {this.OnMessage(ev);}
        } catch (error) {
            console.log(error, true)
        }
    }
    OnOpen(){
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
    OnClose(){
        setTimeout(()=>{this.connectWebSocket()}, 1000)
        isConnected = false
    }
    async OnMessage(ev) {
        if (ev.data.toString() == "__pong__") {
            pong()
            return
        }
        let getNotify = JSON.parse(ev.data)
        // console.log(getNotify)
        //Mensagem vizualizada
        if (getNotify.objectType == 'notification') {
            console.log(' ****** vizualizaram sua mensagem ****** ')
        }else if (getNotify.message) {
            console.log(' ****** Você recebeu uma mensagem ****** ') 
            console.log('---------------------------------------------------') 
            console.log(getNotify)
            //Você recebeu uma mensagem...            
            var home = new HomePage;
            home.upMsgReceived(getNotify)  
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

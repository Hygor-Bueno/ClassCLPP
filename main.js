import { Template } from "./Components/template.js";
import { AppVersion } from "./Connection/AppVersion.js";
import {LoginPage} from "./Pages/Login/login.js";
import {WebSocketCLPP} from "./Connection/WebSocket.js"

var pageLogin = new LoginPage();
var principal = new Template();
var version = new AppVersion();
var webSocket = new WebSocketCLPP();

if(localStorage.getItem('token')){  
    await principal.main() 
    webSocket.connectWebSocket();
}else{
    if(await version.main()){
        document.querySelector('body').insertAdjacentHTML('beforeend',pageLogin.main())
        pageLogin.buttonLogin()
    }else{
        alert("Atenção! Sua versão está desatualizada.")
    }
}
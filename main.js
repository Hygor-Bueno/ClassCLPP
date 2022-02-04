import { Template } from "./Components/template.js";
import { AppVersion } from "./Connection/AppVersion.js";
import {LoginPage} from "./Pages/Login/login.js";
import {WebSocketCLPP} from "./Connection/WebSocket.js"

var pageLogin = new LoginPage();
var principal = new Template();
var version = new AppVersion();
var webSocket = new WebSocketCLPP();

(async function app(){
    webSocket.connectWebSocket();
    if(localStorage.getItem('token')){
        if(!localStorage.getItem('router')) localStorage.setItem('router','home')
        await principal.main() 
    }else{
        if(await version.main()){
            document.querySelector('body').insertAdjacentHTML('beforeend',pageLogin.main())
            pageLogin.buttonLogin()
            document.querySelector('.login__form').addEventListener('keypress', (element)=>{if(element.key === "Enter") {
                document.querySelector(".login__submit").click()}})
        }else{
            alert("Atenção! Sua versão está desatualizada.")
        }
    }
})()
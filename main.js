import { Template } from "./Components/template.js";
import { AppVersion } from "./Connection/AppVersion.js";
import {LoginPage} from "./Pages/Login/login.js";

let pageLogin = new LoginPage();
let principal = new Template();
let version = new AppVersion();

if(localStorage.getItem('token')){
    await principal.main() 
}else{
    if(await version.main()){
        document.querySelector('body').insertAdjacentHTML('beforeend',pageLogin.main())
        pageLogin.buttonLogin()
    }else{
        alert("Atenção! Sua versão está desatualizada.")
    }
}
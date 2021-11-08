import { LoginPage } from "../Pages/Login/login.js";
import { PassDefault } from "../Components/passwordDefault/modal_PassDefault.js";
import { Login } from "../Connection/Login.js";
import { Translate } from "./translate.js";
import { GeneralModal } from "../Components/generalModal/modal_geral.js";
import { closeModal } from "../Util/compressSyntaxe.js"

export class ErrorHandling {
    
    main(error) {
        let translate = new Translate();
        let modal = new GeneralModal();
        let responseTranslate = translate.main(error)

        switch (error) {
            case "Authorization denied":
                let body =  document.querySelector('body')
                body.innerHTML = `<div class="container"></div>`
                document.querySelector('.container').setAttribute('style','display:flex')               
                document.querySelector('.container').insertAdjacentHTML('beforeend', modal.main(responseTranslate, true))
                setTimeout(() => {this.returnLogin()}, responseTranslate.length > 16 ? modal.readingTime(responseTranslate) : 2000)
                break;
            case "Default password is not permited": 
                document.querySelector('.container').insertAdjacentHTML('beforeend', modal.main(responseTranslate, true))
                document.querySelector('.container').setAttribute('style', 'display:flex')
                document.getElementById('closeAlert').disabled = true;
                setTimeout(() => {
                    closeModal();
                    this.defaultPassword();
                }, responseTranslate.length > 16 ? modal.readingTime(responseTranslate) : 2000)
                break;
            default:
                document.querySelector('.container').insertAdjacentHTML('beforeend', modal.main(responseTranslate, true))
                document.querySelector('.container').setAttribute('style', 'display:flex')
                modal.close()
                setTimeout(() => {closeModal()}, responseTranslate.length > 16 ? modal.readingTime(responseTranslate) : 2000)
                break;
        }
    }

    defaultPassword() {
        let modalPassDefault = new PassDefault();
        let updatePass = new Login();
        document.querySelector('.container').insertAdjacentHTML('beforeend', modalPassDefault.template());
        document.querySelector('.container').setAttribute('style', 'display:flex')
        document.getElementById("salve").addEventListener('click', () => {
            if (modalPassDefault.validatorPassword()) {
                let loginUser = {}
                loginUser.user = document.getElementById('userLogin').value;
                loginUser.password = document.getElementById('userPassword').value;
                loginUser.new_password = document.getElementById('newPass').value;
                if (!updatePass.put(loginUser)) this.returnLogin();
            }
        })
    }
    returnLogin() {
        localStorage.clear();
        let login = new LoginPage();
        document.querySelector('body').insertAdjacentHTML('beforeend', login.main());
        login.buttonLogin()
        closeModal()
    }
}
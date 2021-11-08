import  {LoginPage}  from "../../Pages/Login/login.js";

export class Logof{
    template(){
        document.getElementById("StyleModal").setAttribute('href', "./Components/logof/modal_logof.css")
        let response=
        `
            <div class="modal">                  
                <button id="closeModal" class="close">X</button>
                <h1>Deseja sair?</h1>
                <button id="confirm">Confirmar</button>
                </form>
            </div>
        `
        return response;
    }
    settings(){
        document.getElementById('closeModal').addEventListener('click',()=> this.closeModal())
        document.getElementById('confirm').addEventListener('click',()=> this.logof())
    } 
    closeModal(){
        document.querySelector('.container').setAttribute('style','display:none');
        document.querySelector('.modal').remove();
    }
    logof(){
        let login = new LoginPage();
        document.querySelector('body').innerHTML = "";
        localStorage.clear()
        document.querySelector('body').insertAdjacentHTML('beforeend',login.main())
        login.buttonLogin()        
    }
}
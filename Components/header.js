import { Routers } from "../Routers/router.js"
import { Logof } from "./logof/modal_logof.js"

export class HeaderCLPP{
    routes = new Routers
    template(photo){
        let response = 
        `
        <header class = "nav">         
            <nav class="menu"> 
                <ul class="principal">
                    <li id="pageHome">HOME</li>
                    <li> CHECKLIST
                        <ul>
                            <li id="pageNewChecklist">NOVO</li>    
                            <li id="pageChecklistCreated">CRIADOS</li>
                        </ul>
                    </li>
                    <li id="pageRecord">RELATÓRIO</li>
                    <li id="pageMessage">MENSAGEM</li>
                    <li id="linePhotoUser"><img title="Foto do usuário" src='${photo}' id="photoUser"/></li>
                </ul>
            </nav>
        </header>
        `
        return response
    }
    setting(){
        let idLine = ["pageHome","pageNewChecklist","pageChecklistCreated","pageRecord","pageMessage"]
        let router = ['home','checklistCreate','checklistCreated','record','message']
        for(let index =0; index < 5; index++){
            document.getElementById(idLine[index]).addEventListener('click',()=>{this.routes.routers(router[index])})
        }

        document.getElementById('linePhotoUser').addEventListener('click',()=>{
            let logof = new Logof();
            document.querySelector('.container').insertAdjacentHTML("beforeend", logof.template())
            document.querySelector('.container').setAttribute('style','display:flex')  
            logof.settings()      
        })
    }
}
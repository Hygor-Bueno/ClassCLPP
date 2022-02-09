import {$,$_all,getB_id, closeModal} from "../../Util/compressSyntaxe.js";
import { ConnectionCLPP } from "../../Connection/ConnectionCLPP.js";

export class RecordObject extends ConnectionCLPP {
    #id_user;
    #point;
    #date;
    #type;
    #description;
    #filters;

    alertSave(){
        const modalAlert = `
            <div id="modalAlert">
                <div id="alertMsg">
                    <h1>Deseja salvar o arquivo em seu computador?</h1>
                </div>    
                <footer id="alertBtn">
                    <button id="saveFile">Salvar</button>
                    <button id="cancelFile">Cancelar</button>
                </footer>
            </div> `
        return modalAlert;
    }

    settingBtnAlertSave(){
        $('#modalAlert').addEventListener('click', (element) => {
            if (element.target.tagName.toLowerCase() == 'button') this.filtarBtnModalAlert(element.target)
        })
    }
    filtarBtnModalAlert(element){
        switch (element.getAttribute('id')){
            case ("saveFile"):
                console.log("saveFile")
                break;
            case ("cancelFile"):
                closeModal()
                break;
            default:
                console.error("not found!")       
        }
    }
}
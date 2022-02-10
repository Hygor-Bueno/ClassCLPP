import {$,$_all,getB_id, closeModal} from "../../Util/compressSyntaxe.js";
import { ConnectionCLPP } from "../../Connection/ConnectionCLPP.js";
import { UsefulComponents } from "../../Util/usefulComponents.js";

export class RecordObject extends ConnectionCLPP {
    #id_user;
    #point;
    #date;
    #type;
    #description;
    #filters;
    #checkInfo = {}
    userFulComponents = new UsefulComponents;

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
        getB_id('cancelFile').addEventListener('click', () => {
            closeModal()
        })
        getB_id('saveFile').addEventListener('click', () => {
            console.log('saveFile')
        })
    }
    saveReport(){
        this.lockInfo()
        let json ={
            id_user: localStorage.getItem("id"), 
            point: " ",
            date: this.userFulComponents.currentDate(),
            type: " ", 
            nome: $('#inputTitle input[type=text]').value,
            filters: this.#checkInfo
        }
        console.log(json)
    }
    lockInfo(){
        this.#checkInfo = {
            checklist:{
                titles:this.selectInfo('#titleChecklistOption input[type=checkbox]',"todos"), 
                question:this.selectInfo("#titleQuestion input[type=checkbox]"),
                date_checklist:this.selectInfo("#validCheckBlock input[type=checkbox]")
            },
            id_shops:[this.selectInfo("#selShop input[type=checkbox]")],
            date_response:{
                date_init_response:getB_id("initDate").value,
                date_final_response:getB_id("finalDate").value
            }
        }
    }
    selectInfo(local,exception){
        let checklistJson = []
        $_all(local).forEach((ele)=>{
            if (ele.checked && ele.getAttribute('data-id') != exception) checklistJson.push(ele.getAttribute('data-id'))
        })
        return checklistJson;
    }
}
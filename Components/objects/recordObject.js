import { $, $_all, getB_id, closeModal } from "../../Util/compressSyntaxe.js";
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

    graphicRecord;

    alertSave() {
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

    filtarBtnModalAlert(element) {
        switch (element.getAttribute('id')) {
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
    // saveReport(){

    // }
    clppGraphics(arrayValues, context, types) {
       this.graphicRecord =  new Chart(document.querySelector(`${context}`).getContext("2d"),
            {
                type: this.typeGraphics(types),
                data: {
                    labels: [...arrayValues.map(item => item[0])],

                    datasets: [
                        {
                            label: "Porcentagem de vendas",
                            data: [...arrayValues.map(item => item[1])],
                           
                            backgroundColor: [
                                "#ccc", "blue", "red",
                            ],
                            borderColor: "#000",
                            borderWidth: 1
                        }
                    ]
                },
                options: {
                    scales: {
                        y: {
                            ticks: {
                                callback: function (value) {
                                    return value + " %"
                                }
                            },
                            suggestedMax: 100
                        }
                    }
                }
            });
    }

    typeGraphics(value) {
        console.log(value.trim().toLowerCase());
        let response;
        switch (value.trim().toLowerCase()) {
            case "pizza":
                response = "pie";
                break;
            case "barra":
                response = "bar"
                break;
            case "linha":
                response = "line"
                break;
            default:
                response = "doughnut"
        }
        return response;

    }
}
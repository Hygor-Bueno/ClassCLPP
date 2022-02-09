import { ObjectChecklist } from "../../Components/objects/checklistObject.js";
import { RecordObject } from "../../Components/objects/recordObject.js";
import { ConnectionCLPP } from "../../Connection/ConnectionCLPP.js";
import { getB_id, $, $_all, openModal, closeModal } from "../../Util/compressSyntaxe.js";
import { UsefulComponents } from "../../Util/usefulComponents.js";

export class SettingRecord {
    searchOption;
    searchDateInit;
    searchDateFinal;
    jsonCheck = {};
    expanded = false;
    connectionCLPP = new ConnectionCLPP;
    userFulComponents = new UsefulComponents;
    recordObject = new RecordObject;

    async setting(objectChecklist) {
        this.clickPage();
        this.jsonChecklists(objectChecklist);
        this.templateDate(objectChecklist);
        let req = await this.getShop()
        getB_id('selShop').insertAdjacentHTML('beforeend', this.templateOption(null, 'description', req))
        getB_id('titleDate').onchange = () => {
            let selectChecklist = getB_id('titleChecklist')
            this.populaValidade(selectChecklist)
            selectChecklist.disabled = true;
        }
        this.blockQuestion()
    }
    jsonChecklists(objectChecklist) {
        objectChecklist.data.forEach(async (element) => {
            const objectChecklist = new ObjectChecklist;
            await objectChecklist.loadingCheckDataBase(element)
            this.jsonCheck[element.id] = objectChecklist            
        })
    }
    clickPage() {
        $('#divRecord').addEventListener("click", (event) => {
            if (event.target.tagName.toLowerCase() == "button") this.functionFilter(event.target)
        })
    }

    functionFilter(element) {
        switch (element.getAttribute("data-function")) {
            case "clearBtn":
                this.clearFilter()
                break;
            case "buttonRecordGraphic":
                this.buttonGraphic(element)
                break;
            case "titleChecklist":
                this.openClose(element)
                break;
            case "validade":
                this.openClose(element)
                break;
            case "unidade":
                this.openClose(element)
                break;
            case "titleQuestion":
                this.openClose(element)
                break;
            case "buttonRecordPrint":
                openModal(this.recordObject.alertSave())
                this.recordObject.settingBtnAlertSave()
                break;
            default:
                console.error("data-function")
        }
    }
    openClose(element) {
        getB_id(element.getAttribute("data-linked")).style.display == 'none'
            ? getB_id(element.getAttribute("data-linked")).setAttribute("style", "display:block")
            : getB_id(element.getAttribute("data-linked")).setAttribute("style", "display:none")
    }

    clearFilter() {
        this.resetOptions()
        this.clearDate()
    }

    resetOptions() {
        const clear = document.querySelectorAll(".option")
        clear.forEach(options => {
            options.checked = false
        });
        this.ativaQuestion();
    }

    clearDate() {
        const data = document.querySelectorAll("input[type='date']")
        data.forEach(date => { date.value = "" })
    }

    templateOption(objectChecklist, key, array) {
        let response = ""
        let auxArray = array || objectChecklist.data
        console.log
        auxArray.map(element => {
            element[key] ? response +=
                `<div class="testandoTest">
                <input type="checkbox" class="option" data-id="${element.id}" value="${element[key]}">
                    <p class="valorCheck">${element[key]}</p>
                </input>
            </div>` : ""
        })
        return response;
    }

    templateDate(objectChecklist) {
        let jsonDate = [];
        objectChecklist.data.forEach(element => {
            let newJson = {
                date: element.date_init ? this.userFulComponents.convertData(element.date_init, "-") + " - " + this.userFulComponents.convertData(element.date_final, "-") : false,
                id: (element.id)
            }
            jsonDate.push(newJson)
        })
        $('#titleDate .testandoTest').insertAdjacentHTML('beforeend', this.templateOption(null, 'date', jsonDate))
    }

    buttonGraphic(element) {
        let array = [getB_id('buttonRecordBar'), getB_id('buttonRecordPizza'), getB_id('buttonRecordPercentage')]
        array.forEach((e) => {
            if (element.getAttribute('id') == e.getAttribute('id')) e.setAttribute("style", "opacity: 1")
            else e.setAttribute("style", "opacity: 0.3")
        })
    }

    controllerSelect(local,message,check) {
        check ? getB_id(local).setAttribute("style", "opacity:1"):getB_id(local).setAttribute("style", "opacity:0.3")
        $(`#${local} p`).innerText = message
    }

    blockQuestion() {
        getB_id('titleChecklistOption').onchange = async () => {
            let arrayChecked = this.walksArray('#titleChecklistOption input[type=checkbox]')
            if(arrayChecked.length == 1){
                let reqQuestion = await this.getQuestion()
                getB_id('titleQuestionOption').insertAdjacentHTML('beforeend', this.templateOption(null, 'description', reqQuestion))
                this.todos()
                this.validateParameter(arrayChecked.length, arrayChecked);
                this.controllerSelect("selectButtonValidade", "Multiplos checklist",false)
                this.controllerSelect('selectButtonQuestion',"Selecione a pergunta:",true)
            }else if(arrayChecked.length >=2 ){
                this.controllerSelect("selectButtonQuestion", "Multiplos checklist",false)
            }else if(arrayChecked.length<=0){
                this.controllerSelect('selectButtonValidade',"Selecione a validade:",true)
            }
        }
    }
    
    todos() {
        document.querySelectorAll('#titleChecklistOption input[type=checkbox]').forEach(element => {
            if (document.querySelector('#todos').checked == true) {
                element.checked = true
            }
        })
    }
    walksArray(local) {
        let array = []
        document.querySelectorAll(local).forEach(element => {
            if (element.checked) array.push(element)
        })
        return array
    }

    validateParameter(array, cont) {
        if (array > 1) document.getElementById("selectTitulo").innerHTML = "Multi selecionado"
        else if (array == 1) document.getElementById("selectTitulo").innerHTML = cont[0].defaultValue.toLowerCase().slice(0, 20) + ".."
        else if (array == 0) document.getElementById("selectTitulo").innerHTML = "Selecione o checklist:"
    }

    async getChecklist() {
        return await this.connectionCLPP.get("&web=&id_user=" + localStorage.getItem("id"), 'CLPP/Checklist.php')
    }

    async getShop() {
        let response = await this.connectionCLPP.get("&company_id=1", 'CCPP/Shop.php')
        return response.data
    }

    async getQuestion() {
        let cont = this.walksArray('#titleChecklistOption input[type=checkbox]')
        if (cont.length != 0) {
            let response = await this.connectionCLPP.get("&id=" + cont[0].attributes[2].value + "&user_id=" + localStorage.getItem("id"), 'CLPP/Question.php')
            return response.data
        }
    }
}  
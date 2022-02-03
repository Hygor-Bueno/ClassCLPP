import { ObjectChecklist } from "../../Components/objects/checklistObject.js";
import { ConnectionCLPP } from "../../Connection/ConnectionCLPP.js";
import { getB_id, $, $_all, openModalCheck, closeModalCheck } from "../../Util/compressSyntaxe.js";
import { UsefulComponents } from "../../Util/usefulComponents.js";

export class SettingRecord {
    searchOption;
    searchDateInit;
    searchDateFinal;
    jsonCheck = {};
    expanded = false;
    connectionCLPP = new ConnectionCLPP;
    userFulComponents = new UsefulComponents;

    async setting(objectChecklist) {
        this.clickPage();
        this.jsonChecklists(objectChecklist);
        this.templateDate(objectChecklist);
        /* getB_id('titleChecklist').onchange = () => {
            this.populaQuestion()
        }
 */
        let req = await this.getShop()
        getB_id('selShop').insertAdjacentHTML('beforeend', this.templateOption(null, 'description', req))

        getB_id('titleDate').onchange = () => {
            let selectChecklist = getB_id('titleChecklist')
            this.populaValidade(selectChecklist)
            // this.populaQuestion()
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
        document.addEventListener("click", (event) => {
            if (event.target.tagName.toLowerCase() == "button") {
                this.functionFilter(event.target)
            }
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
        auxArray.map(element => {
            element[key] ? response += `<div class="testandoTest"><input type="checkbox" class="option" data-id="${element.id}" value="${element[key]}"><p class="valorCheck">${element[key]}</p></input></div>` : ""
        })
        return response;
    }

    templateDate(objectChecklist) {
        let objDateId;
        let objDateInit;
        let objDateFinal;
        let newJson;
        let jsonDate = [];
        objectChecklist.data.forEach(element => {
            objDateId = element.id
            objDateInit = element.date_init
            objDateFinal = element.date_final
            newJson = {
                date: objDateInit ? this.userFulComponents.convertData(objDateInit, "-") + " - " + this.userFulComponents.convertData(objDateFinal, "-") : false,
                id: (objDateId)
            }
            jsonDate.push(newJson)
        })
        $('#titleDate .testandoTest').insertAdjacentHTML('beforeend',
            this.templateOption(null, 'date', jsonDate))
    }

    buttonGraphic(element) {
        let array = [getB_id('buttonRecordBar'), getB_id('buttonRecordPizza'), getB_id('buttonRecordPercentage')]
        array.forEach((e) => {
            if (element.getAttribute('id') == e.getAttribute('id')) {
                e.setAttribute("style", "opacity: 1")
            } else {
                e.setAttribute("style", "opacity: 0.3")
            }
        })
    }

    ativaQuestion() {
        getB_id('selectQuestionCheck').setAttribute("style", "opacity:1")
        getB_id('selectTituloQuestion').setAttribute("style", "opacity:1")
    }

    bloqueiaQuestion() {
        getB_id('selectQuestionCheck').setAttribute("style", "opacity:0.3")
        getB_id('selectTituloQuestion').setAttribute("style", "opacity:0.3")
    }

    blockQuestion() {
        getB_id('titleChecklistOption').onchange = () => {
            let cont = 0
            document.querySelectorAll('#titleChecklistOption input[type=checkbox]').forEach(element => {
                if (element.checked) cont++;
            })
            if (cont >= 2) this.bloqueiaQuestion()
            if (cont <= 1) this.ativaQuestion()
        }
    }

    changeTitle() {
        getB_id('titleChecklistOption').onchange = () => {
            let cont = 0
            document.querySelectorAll('#titleChecklistOption input[type=checkbox]').forEach(element => {
                if (element.checked) cont++;
            })
            if (cont <= 1) this.ativaQuestion()
            if (cont >= 2) this.bloqueiaQuestion()
        }
    }

    async getChecklist() {
        return await this.connectionCLPP.get("&web=&id_user=" + localStorage.getItem("id"), 'CLPP/Checklist.php')
    }
    async getShop() {
        let response = await this.connectionCLPP.get("&company_id=1", 'CCPP/Shop.php')
        return response.data
    }
} 
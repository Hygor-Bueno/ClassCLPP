import { ObjectChecklist } from "../../Components/objects/checklistObject.js";
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
        // this.changeTitle()
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
            case "buttonRecordPrint":
                //openModal()
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
            if (element.getAttribute('id') == e.getAttribute('id')) {
                e.setAttribute("style", "opacity: 1")
            } else {
                e.setAttribute("style", "opacity: 0.3")
            }
        })
    }

    ativaQuestion() {
        getB_id('selectButtonQuestion').setAttribute("style", "display:flex")
        getB_id('selectButtonValidade').setAttribute("style", "display:flex")
        getB_id('selectButtonReserva').setAttribute("style", "display:none")
        getB_id('selectButtonReservaValidade').setAttribute("style", "display:none")
    }

    bloqueiaQuestion() {

        getB_id('selectButtonQuestion').setAttribute("style", "display:none")
        getB_id('selectButtonValidade').setAttribute("style", "display:none")

        getB_id('selectButtonReserva').setAttribute("style", "display:flex")
        getB_id('selectButtonReserva').setAttribute("style", "opacity:0.3")

        getB_id('selectButtonReservaValidade').setAttribute("style", "display:flex")
        getB_id('selectButtonReservaValidade').setAttribute("style", "opacity:0.3")
    }

    blockQuestion() {
        getB_id('titleChecklistOption').onchange = () => {
            let cont = this.m();
            document.querySelectorAll('#titleChecklistOption input[type=checkbox]').forEach(element => {
                if (element.checked) cont++;
                console.log(cont)
            })
            if (cont.length >= 2) this.bloqueiaQuestion()
            if (cont.length <= 1) this.ativaQuestion()
        }
    }

    m(local) {

        let array
        // array vazio
        //percorrer o local ['#titleChecklistOption input[type=checkbox]'] forEach(element=>{})
        // dar um arra.push(element) que estiver selecionado;
        // retornar o array populado;
    }

    n(array) {
        // verificar se array é maior do que 1
        // se for maior retornar Multiplas checklist
        // senão for maior retornar valor.
    }
    n2(valor, local) {

    }


    async getChecklist() {
        return await this.connectionCLPP.get("&web=&id_user=" + localStorage.getItem("id"), 'CLPP/Checklist.php')
    }
    async getShop() {
        let response = await this.connectionCLPP.get("&company_id=1", 'CCPP/Shop.php')
        return response.data
    }
} 
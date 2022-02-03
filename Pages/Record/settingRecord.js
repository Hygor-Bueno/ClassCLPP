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
        getB_id('titleChecklist').onchange = () => {
            this.populaQuestion()
        }

        let req = await this.getShop()
        getB_id('selShop').insertAdjacentHTML('beforeend', this.templateOption(null, 'description', req))

        getB_id('titleDate').onchange = () => {
            let selectChecklist = getB_id('titleChecklist')
            this.populaValidade(selectChecklist)
            this.populaQuestion()
            selectChecklist.disabled = true;
        }
    }

    /* openCloseFilter(view, click) {
        click.addEventListener("click", () => {
            view.setAttribute('style', view.style.display == 'none' ? "display:block" : "display:none")
        })
    }

    // clearOption(local, message) {
    //     getB_id(local).innerHTML = ""
    //     getB_id(local).insertAdjacentHTML('beforeend', `<option class="option" value="none" selected="" disabled="" hidden="">${message}</option>`)
    // }


    openCloseTitleCheck() {
        let localClicavel = document.querySelector('.sel')
        let localAparece = document.querySelector('.testandoTest')
        this.openCloseFilter(localAparece, localClicavel);
    }

    openCloseValidade() {
        let localClicavel = document.querySelector('#titleDate')
        let localAparece = document.querySelector('.bodyChecklist').lastElementChild
        this.openCloseFilter(localAparece, localClicavel);
    } */

    // let selectChecklist = getB_id('titleChecklist')
    // selectChecklist.disabled = false;
    // this.clearOption('titleQuestion', 'Selecione a pergunta')

    //element[key].insertAdjacentHTML('afterbegin', `<input type="checkbox" class="option" data-id="${element.id}" value="${element[key]}">${element[key]}</input>`)

    /* populaValidade(selectChecklist) {
        let select = getB_id('titleDate')
        let indexSelect = select.selectedIndex;
        let idCheckSelected = select.options[indexSelect].getAttribute("data-id");
        console.log(idCheckSelected)
        this.jsonCheck[idCheckSelected].getQuestion()
        selectChecklist.value = this.jsonCheck[idCheckSelected].getTitle()
    } */

    // populaQuestion() {
    //     getB_id('titleQuestion').innerHTML = ""
    //     let select = getB_id('titleChecklist');
    //     // let indexSelect = select.selectedIndex;
    //     // let idCheckSelected = select.options[indexSelect].getAttribute("data-id");
    //     getB_id('titleQuestion').insertAdjacentHTML('beforeend', '<div class="subTestandoTest"><input type="checkbox" class="option"><p class="valorCheck"></p></input></div>')
    //     getB_id('titleQuestion').insertAdjacentHTML('beforeend', this.templateOption(null, "description", this.jsonCheck[idCheckSelected].getQuestion()))
    // }

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
        console.log(element.style)
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

    async getChecklist() {
        return await this.connectionCLPP.get("&web=&id_user=" + localStorage.getItem("id"), 'CLPP/Checklist.php')
    }

    async getShop() {
        let response = await this.connectionCLPP.get("&company_id=1", 'CCPP/Shop.php')
        return response.data
    }
} 
import { ObjectChecklist } from "../../Components/objects/checklistObject.js";
import { ConnectionCLPP } from "../../Connection/ConnectionCLPP.js";
import { getB_id, $, $_all, openModalCheck, closeModalCheck } from "../../Util/compressSyntaxe.js";
import { UsefulComponents } from "../../Util/usefulComponents.js";

export class SettingRecord {
    searchOption;
    searchDateInit;
    searchDateFinal;
    jsonCheck = {};
    connectionCLPP = new ConnectionCLPP;
    userFulComponents = new UsefulComponents;

    async setting(objectChecklist) {
        this.clickPage();
        this.jsonChecklists(objectChecklist);
        this.templateDate(objectChecklist)
        getB_id('titleChecklist').onchange = () => {
            getB_id('titleQuestion').innerHTML = ""
            let select = getB_id('titleChecklist');
            let indexSelect = select.selectedIndex;
            let idCheckSelected = select.options[indexSelect].getAttribute("data-id");
            getB_id('titleQuestion').insertAdjacentHTML('beforeend',
                this.templateOption(null, "description", this.jsonCheck[idCheckSelected].getQuestion())
            )
        }
        let req = await this.getShop()
        getB_id('shop').insertAdjacentHTML('beforeend', this.templateOption(null, 'description', req))
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
            default:
                console.error("data-function")
        }
    }

    clearFilter() {
        this.clearDate()
        this.clearOptions()
    }

    clearOptions() {
        const test = document.querySelectorAll(".sel")
        test.forEach(options => {
            options.options[0].selected = true
        });
        document.querySelectorAll('#titleDate option').forEach((e, index) => { index > 0 ? e.remove() : "" })
    }

    clearDate() {
        const data = document.querySelectorAll(".date")
        data.forEach(date => {
            date.value = ""
        })
    }

    templateOption(objectChecklist, key, array) {
        let response = ""
        let auxArray = array || objectChecklist.data
        auxArray.map(element => {
            response += `<option class="option" data-id="${element.id}" value="${element[key]}">${element[key]}</option>`
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
                date: this.userFulComponents.convertData(objDateInit, "-") + " - " + this.userFulComponents.convertData(objDateFinal, "-"),
                id: (objDateId)
            }
            jsonDate.push(newJson)

        })
        getB_id('titleDate').insertAdjacentHTML('beforeend',
            this.templateOption(null, 'date', jsonDate))
    }

    async shopFilter() {
        /* let filterShop = getB_id('shop')
        let array = await this.getShop()
        array.forEach(element => {
            `<option class="option" data-id="${element.id}" value="${element[key]}">${element[key]}</option>`
        }) */
    }

    async getChecklist() {
        return await this.connectionCLPP.get("&web=&id_user=" + localStorage.getItem("id"), 'CLPP/Checklist.php')
    }

    async getShop() {
        let response = await this.connectionCLPP.get("&company_id=1", 'CCPP/Shop.php')
        return response.data
    }
} 
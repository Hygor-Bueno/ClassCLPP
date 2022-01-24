import { ObjectChecklist } from "../../Components/objects/checklistObject.js";
import { ConnectionCLPP } from "../../Connection/ConnectionCLPP.js";
import { getB_id, $, $_all, openModalCheck, closeModalCheck } from "../../Util/compressSyntaxe.js";

export class SettingRecord {
    searchOption;
    searchDateInit;
    searchDateFinal;
    jsonCheck = {}
    connectionCLPP = new ConnectionCLPP;

    setting(objectChecklist) {
        this.clickPage();
        this.jsonChecklists(objectChecklist);

        getB_id('titleChecklist').onchange = () => {
            getB_id('titleQuestion').innerHTML = ""
            let select = getB_id('titleChecklist');
            let indexSelect = select.selectedIndex;
            let idCheckSelected = select.options[indexSelect].getAttribute("data-id");
            getB_id('titleQuestion').insertAdjacentHTML('beforeend',
                this.templateOption(null, "description", this.jsonCheck[idCheckSelected].getQuestion())
            )
        }

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
            case "openCloseFilter":
                this.openCloseFilter(element);
                break;
            case "clearBtn":
                this.clearFilter()
                break;
            default:
                console.error("data-function")
        }
    }

    openCloseFilter(element) {
        let bodyBlock = document.getElementById(`${element.getAttribute("data-block")}`)
        if (bodyBlock.style.display == 'none') {
            bodyBlock.setAttribute('style', "display:block")
            element.style.backgroundImage = "url('./assets/images/down.svg')";
        } else {
            bodyBlock.setAttribute('style', "display:none")
            element.style.backgroundImage = "url('./assets/images/up.svg')";
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
        document.querySelectorAll('#titleQuestion option').forEach((e, index) => { index > 0 ? e.remove() : "" })
    }

    clearDate() {
        const data = document.querySelectorAll(".date")
        data.forEach(date => {
            date.value = ""
        })
    }

    filterReport() {

    }
    templateOption(objectChecklist, key, array) {
        let response = ""
        let auxArray = array || objectChecklist.data
        auxArray.map(element => {
            response += `<option class="option" data-id="${element.id}" value="${element[key]}">${element[key]}</option>`
        })
        return response;
    }

    async getChecklist() {
        return await this.connectionCLPP.get("&web=&id_user=" + localStorage.getItem("id"), 'CLPP/Checklist.php')
    }
} 
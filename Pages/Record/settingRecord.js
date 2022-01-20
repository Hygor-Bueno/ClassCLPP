import { getB_id, $, $_all, openModalCheck, closeModalCheck } from "../../Util/compressSyntaxe.js";
export class SettingRecord {
    searchOption;
    searchDateInit;
    searchDateFinal;
    setting() {
        this.clickPage();
        this.filterReposrt()
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
    }

    clearDate() {
        const data = document.querySelectorAll(".date")
        data.forEach(date => {
            date.value = ""
        })
    }

    filterReposrt() {
        const valueDate = document.querySelectorAll(".date")



        document.addEventListener("click", (event) => {
            if (event.target.tagName.toLowerCase() == "input") {
                valueDate.forEach(datas => {
                    console.log(datas)
                })
            }


        })

    }
} 
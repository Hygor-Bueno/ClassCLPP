
export class SettingRecord {
    setting() {
        this.clickPage();
    }

    clickPage() {
        document.addEventListener("click", (event) => {
            // console.log(event.target)
            if (event.target.tagName.toLowerCase() == "button") {
                this.filterFunction(event.target)
                this.clearFilter(event.target)
            }
        })
    }

    filterFunction(element) {
        if (element.className == "imgButton openCloseBlock openCloseBtnCss") {
            let bodyBlock = document.getElementById(`${element.getAttribute("data-block")}`)
            bodyBlock.setAttribute('style', bodyBlock.style.display == 'none' ? "display:block" : "display:none")
        }
    }

    clearFilter(element) {
        if (element.className == "clearBtn") {
            let btnClear = `${element.getAttribute("data-clear")}`
            console.log(btnClear)
            btnClear.addEventListener("click", () => {
                let option = document.querySelector('');
                this.uva = $("#dateFinal").value || "";
            })
        }
    }
}
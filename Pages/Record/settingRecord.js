
export class SettingRecord {
    setting() {
        this.clickPage();
    }

    clickPage() {
        document.addEventListener("click", (event) => {
            if (event.target.parentNode.tagName.toLowerCase() == "button") {
                this.filterFunction(event.target.parentNode)
            }
        })
    }

    filterFunction(element) {
        if (element.className == "imgButton openCloseBlock") {
            let bodyBlock = document.getElementById(`${element.getAttribute("data-block")}`)
            bodyBlock.setAttribute('style', bodyBlock.style.display == 'none' ? "display:block" : "display:none")
        }
    }
}
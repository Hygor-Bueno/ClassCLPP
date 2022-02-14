import { ObjectChecklist } from "../../Components/objects/checklistObject.js";
import { RecordObject } from "../../Components/objects/recordObject.js";
import { getB_id, $, $_all, openModal, closeModal } from "../../Util/compressSyntaxe.js";
import { UsefulComponents } from "../../Util/usefulComponents.js";

export class SettingRecord {
    searchOption;
    searchDateInit;
    searchDateFinal;
    jsonCheck = {};
    jsonShop = {};
    expanded = false;
    typeGraph = 3
    userFulComponents = new UsefulComponents;
    recordObject = new RecordObject;
    fockingArray = localStorage.getItem("JSONfilters") ? JSON.parse(localStorage.getItem("JSONfilters")):"" 

    async setting(objectChecklist) {
        this.clickPage();
        this.jsonChecklists(objectChecklist);
        this.templateDate(objectChecklist);
        await this.populaShop();
        this.shopJson(await this.getShop());
        this.blockQuestion();
        this.pegandoValidade();
        setTimeout(async () => {

        }, 1000);

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

    async functionFilter(element) {
        switch (element.getAttribute("data-function")) {
            case "clearBtn":
                this.controllerBtns(["#buttonRecordPrint"], true)
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
                openModal(this.alertSave())
                this.settingBtnAlertSave()
                break;

            case "filterBtn":
                this.controllerBtns(["#buttonRecordPrint"], false)
                this.recordObject.setFilters(this.lockInfo())
                break;    
            case "graphicButton":
                // alert("Você abrirá um gráfico")
                let req = await this.recordObject.get("&id_user=148&date_init_response='2022-02-08'", "CLPP/Response.php");
                this.recordObject.clppGraphich.clppGraphics(this.recordObject.getDataForGraphic(this.recordObject.separateChecklist(req), this.jsonCheck, this.jsonShop), "#mainGraphic", this.typeGraph);
                break;
            case "teste":
                //this.loadSavedReports("#titleChecklistOption input[type=checkbox]" , this.fockingArray.filters.checklist.titles, "#titleChecklistOption")
                !localStorage.getItem("JSONfilters") && localStorage.setItem("JSONfilters",JSON.stringify(this.recordObject.getJsonRecord()))//apagar quando cards da home estiver ok 
                this.noGusta(this.fockingArray.filters)
                break;
            default:
                console.error("data-function")
        }
    }
    noGusta(stop_json){
        console.log(stop_json.checklist)
        Object.keys(stop_json.checklist).forEach(element => {
            stop_json.checklist[element] != "" && console.log(stop_json.checklist[element])
        })
    }
    openClose(element) {
        getB_id(element.getAttribute("data-linked")).style.display == 'none'
            ? getB_id(element.getAttribute("data-linked")).setAttribute("style", "display:block")
            : getB_id(element.getAttribute("data-linked")).setAttribute("style", "display:none")
    }

    clearFilter() {
        this.clearDate()
        this.resetOptions()
    }
    resetOptions() {
        const clear = document.querySelectorAll(".option")
        clear.forEach(options => {
            options.checked = false
        });
        this.controllerSelect('selectButtonQuestion', "Selecione a pergunta:", true)
        this.controllerSelect('selectButtonValidade', "Selecione a validade:", true)
    }
    clearDate() {
        const data = document.querySelectorAll("input[type='date']")
        data.forEach(date => { date.value = "" })
        document.getElementById("selectTitulo").innerHTML = "Selecione o checklist:"
    }
    templateOption(objectChecklist, key, array) {
        let response = ""
        let auxArray = array || objectChecklist.data
        auxArray.map(element => {
            element[key] ? response +=
                `<div class="optionSelect">
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
        $('#titleDate .optionSelect').insertAdjacentHTML('beforeend', this.templateOption(null, 'date', jsonDate))
    }
    buttonGraphic(element) {
        let array = [getB_id('buttonRecordBar'), getB_id('buttonRecordPizza'), getB_id('buttonRecordPercentage')]
        array.forEach((e) => {
            if (element.getAttribute('id') == e.getAttribute('id')) {
                e.setAttribute("style", "opacity: 1")
                this.changeChartType(e.getAttribute('id'));
            } else {
                e.setAttribute("style", "opacity: 0.3")
            }
        })
    }
    changeChartType(value) {
        this.closeGraphic();

        if (value == 'buttonRecordBar') {
            this.typeGraph = 2
        } else if (value == 'buttonRecordPizza') {
            this.typeGraph = 1
        } else {
            this.typeGraph = 3
        }
    }
    closeGraphic() {
        getB_id('mainGraphic').getContext('2d').clearRect(0, 0, getB_id('mainGraphic').width, getB_id('mainGraphic').height)
        this.recordObject.clppGraphich.graphicRecord && this.recordObject.clppGraphich.graphicRecord.destroy();
    }
    controllerSelect(local, message, check) {
        if (check) {
            getB_id(local).setAttribute("style", "opacity:1")
            $(`#${local} button`).disabled = false
        } else {
            getB_id(local).setAttribute("style", "opacity:0.3")
            $(`#${local} button`).disabled = true
        }
        $(`#${local} p`).innerText = message
    }
    async populaShop() {
        let req = await this.getShop()
        getB_id('selShop').insertAdjacentHTML('beforeend', this.templateOption(null, 'description', req))
    }
    pegandoValidade() {
        let array = [];
        getB_id('validCheckBlock').onchange = (validade) => {
            let arrayValidade = this.walksArray('#validCheckBlock input[type=checkbox]')
            if (validade.target.checked) {
                let arrayChecked = this.walksArray2('#titleChecklistOption input[type=checkbox]', arrayValidade[0].attributes[2].value)
                array.push(arrayChecked)

                this.validateParameter(array.length, arrayChecked);
                arrayValidade.forEach(element => {
                    arrayChecked = this.walksArray2('#titleChecklistOption input[type=checkbox]', element.attributes[2].value)
                    arrayChecked.checked = true;
                })
            } else {
                let element = this.walksArray2('#titleChecklistOption input[type=checkbox]', validade.target.getAttribute("data-id"))
                element.checked = false;
            }
        }
    }
    blockQuestion() {
        getB_id('titleChecklistOption').onchange = async () => {
            getB_id('titleQuestionOption').innerHTML = ""
            let arrayChecked = this.walksArray('#titleChecklistOption input[type=checkbox]')
            this.validateParameter(arrayChecked.length, arrayChecked[0].attributes[3]);
            if (!getB_id('todos').checked) {
                if (arrayChecked.length == 1) {
                    let reqQuestion = await this.getQuestion(arrayChecked)
                    getB_id('titleQuestionOption').insertAdjacentHTML('beforeend', this.templateOption(null, 'description', reqQuestion))
                    this.controllerSelect("selectButtonValidade", "Checklist selecionada", false)
                    this.controllerSelect('selectButtonQuestion', "Selecione a pergunta:", true)
                } else if (arrayChecked.length >= 2) this.controllerSelect("selectButtonQuestion", "Multiplos checklist", false)
                else if (arrayChecked.length <= 0) this.controllerSelect('selectButtonValidade', "Selecione a validade:", true)
            } else this.selectAll()
        }
    }
    selectAll() {
        document.querySelectorAll('#titleChecklistOption input[type=checkbox]').forEach(element => {
            element.checked = true
            document.querySelector('#selectTitulo').innerHTML = "Multiplos checklist"
            this.controllerSelect("selectButtonValidade", "Multiplos checklist", false)
            this.controllerSelect("selectButtonQuestion", "Multiplos checklist", false)
        })
    }
    walksArray(local) {
        let array = []
        document.querySelectorAll(local).forEach(element => {
            if (element.checked) {
                array.push(element)
            }
        })
        return array
    }
    walksArray2(local, id) {
        let response
        document.querySelectorAll(local).forEach(element => {
            if (element.getAttribute("data-id") == id) {
                response = element
            }
        })
        return response
    }
    validateParameter(array, cont) {
        if (array > 1) document.getElementById("selectTitulo").innerHTML = "Multi selecionado"
        if (array == 1) document.getElementById("selectTitulo").innerHTML = cont.value.toLowerCase().slice(0, 20) + ".."
        if (array < 1) document.getElementById("selectTitulo").innerHTML = "Selecione o checklist:"
    }
    async getChecklist() {
        return await this.recordObject.get("&web=&id_user=" + localStorage.getItem("id"), 'CLPP/Checklist.php')
    }
    async getShop() {
        let response = await this.recordObject.get("&company_id=1", 'CCPP/Shop.php')
        return response.data
    }
    shopJson(response) {
        response.forEach(shop => {
            this.jsonShop[shop.id] = shop
        })
    }
    async getQuestion(cont) {
        //let cont = this.walksArray('#titleChecklistOption input[type=checkbox]')
        if (cont.length != 0) {
            //console.log(this.jsonCheck[cont[0].attributes[2].value].getQuestion()[0])
            let response = await this.recordObject.get("&id=" + cont[0].attributes[2].value + "&user_id=" + localStorage.getItem("id"), 'CLPP/Question.php')
            return response.data
        }
    }
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
    settingBtnAlertSave() {
        getB_id('cancelFile').addEventListener('click', () => {
            closeModal()
        })
        getB_id('saveFile').addEventListener('click', () => {
            this.setDateObj()
            this.recordObject.saveReport()
            closeModal()
        })
    }
    setDateObj() {
        this.recordObject.setId_user(localStorage.getItem("id"))
        this.recordObject.setDescritpion($('#inputTitle input[type=text]').value)
        this.recordObject.setPoint(0)
        this.recordObject.setType(this.typeGraph)
        this.recordObject.setDate(this.userFulComponents.currentDate())
    }
    lockInfo() {
        return {
            checklist: {
                titles: this.selectInfo('#titleChecklistOption input[type=checkbox]', "todos"),
                question: this.selectInfo("#titleQuestion input[type=checkbox]"),
                date_checklist: this.selectInfo("#validCheckBlock input[type=checkbox]")
            },
            id_shops: [this.selectInfo("#selShop input[type=checkbox]")],
            date_response: {
                date_init_response: getB_id("initDate").value,
                date_final_response: getB_id("finalDate").value
            }
        }
    }
    selectInfo(local, exception) {
        let checklistJson = []
        $_all(local).forEach((ele) => {
            if (ele.checked && ele.getAttribute('data-id') != exception) checklistJson.push(ele.getAttribute('data-id'))
        })
        return checklistJson;
    }
    controllerBtns(btns, parans) {
        btns.forEach(btn => {
            $(btn).disabled = parans;
            $(btn).setAttribute('style', parans ? "opacity: .3" : "opacity: 1")
        })
    }
    loadSavedReports(local, loading, twoLocal){
        $(twoLocal).setAttribute('style', "display:block")
        $_all(local).forEach(check => {loading.includes(check.getAttribute('data-id')) ? check.checked = true : check.checked = false})
    }
}  
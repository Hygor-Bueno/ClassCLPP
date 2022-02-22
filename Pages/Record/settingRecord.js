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
    recordObject2 = new RecordObject;
    recordObject3 = new RecordObject;

    async setting(objectChecklist) {
        this.clickPage();
        this.jsonChecklists(objectChecklist);
        this.templateDate(objectChecklist);
        await this.populaShop();
        this.shopJson(await this.getShop());
        this.blockQuestion();
        this.pegandoValidade();
        setTimeout(async () => { }, 1000);
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
                this.closeGraphic()

                break;
            case "buttonRecordGraphic":
                this.buttonGraphic(element)
                break;
            case "titleChecklist":
                this.openClose(element.getAttribute("data-linked"))
                break;
            case "validade":
                this.openClose(element.getAttribute("data-linked"))
                break;
            case "unidade":
                this.openClose(element.getAttribute("data-linked"))
                break;
            case "titleQuestion":
                this.openClose(element.getAttribute("data-linked"))
                break;
            case "buttonRecordPrint":
                openModal(this.alertSave())
                this.settingBtnAlertSave()
                break;
            case "filterBtn":
                this.validaPressBtnFilter() == true ? this.pressBtnFilter() : alert('Selecione um dado');
                break;
            case "graphicButton":
                let req = await this.recordObject.get("&id_user=148&notification", "CLPP/Response.php", true);
                // alert("Você abrirá um gráfico")
                // this.recordObject.clppGraphich.clppGraphics(this.recordObject.generalGraphic(this.recordObject.separateChecklist(req)), "#mainGraphic", this.typeGraph);
                // this.recordObject.clppGraphich.clppGraphics(this.recordObject.getDataForGraphic(this.recordObject.separateChecklist(req), this.jsonCheck, this.jsonShop), "#mainGraphic", this.typeGraph);
                // this.recordObject.clppGraphich.clppGraphics(this.recordObject.specificGraphic(this.recordObject.separateChecklist(req), this.jsonCheck, this.jsonShop,1), "#mainGraphic", this.typeGraph);
                break;
            case "teste":
                this.loadSavedReports(this.recordObject.getJsonRecord())
                getB_id("filterBtn").click();
                break;
            default:
                console.error("data-function")
        }
    }

    validaPressBtnFilter() {
        let checklist = document.querySelectorAll(".option")
        checklist.forEach(element => {
            console.log(element.checked.true)
            /* if (element.checked == true) return true
            else if (element.checked == false) return false */
        })

    }

    async pressBtnFilter() {

        this.controllerBtns(["#buttonRecordPrint"], false)
        this.recordObject.setFilters(this.lockInfo())
        this.validationDate()
        let returnReq = await this.recordObject.returnGet(this.recordObject.getParamsForFilters())
        this.populaShopGraphic(returnReq)
        this.populaCheckGraphic(returnReq, this.recordObject.separateChecklist(returnReq))
    }

    populaCheckGraphic(returnReq, reqFiltred) {
        getB_id('popupaCheckpGra').innerHTML = ""
        getB_id('popupaCheckpGra').insertAdjacentHTML('beforeend', `<option class="popupaCheckpGra">Checklist</option>`)
        let result = this.filterMiniGraphic(returnReq, "id_checklist")
        result.forEach(element => {
            let response = ""
            getB_id('popupaCheckpGra').insertAdjacentHTML('beforeend', response += `<option class="popupaCheckpGra">${(this.jsonCheck[element].getTitle()).slice(0, 15) + "..."}</option>`)
        })
        this.closeGraphic()
        this.recordObject.clppGraphich.clppGraphics(this.recordObject.generalGraphic(reqFiltred), "#mainGraphic", this.typeGraph)
        console.log()
        this.recordObject.clppGraphich.clppGraphics(this.recordObject.specificGraphic(reqFiltred, this.jsonCheck, this.jsonShop, 1), "#graphicUnity", this.typeGraph)
        this.recordObject.clppGraphich.clppGraphics(this.recordObject.specificGraphic(reqFiltred, this.jsonCheck, this.jsonShop, 1), "#graphicChecklist", this.typeGraph)
    }

    populaShopGraphic(returnReq) {
        getB_id('popupaShopGra').innerHTML = ""
        getB_id('popupaShopGra').insertAdjacentHTML('beforeend', `<option class="popupaShopGra">Unidade</option>`)
        let result = this.filterMiniGraphic(returnReq, "id_shop")
        result.forEach(element => {
            let response = ""
            getB_id('popupaShopGra').insertAdjacentHTML('beforeend', response += `<option class="popupaShopGra">${this.jsonShop[element].description}</option>`)
        })
    }

    filterMiniGraphic(returnReq, key) {
        let assiistent = []
        returnReq.data.forEach(resultFilters => {
            if (this.validation(assiistent, resultFilters[key])) assiistent.push(resultFilters[key])
        })
        return assiistent
    }

    validation(keys, value) {
        let response = true
        keys.forEach(key => {
            if (key == value) response = false
        })
        return response;
    }

    loadSavedReports(stop_json) {
        let jsonFilters = stop_json.filters
        getB_id("inputNameTitles").value = stop_json.name
        Object.keys(jsonFilters.checklist).forEach(element => {
            if (jsonFilters.checklist[element] != "") {
                jsonFilters.checklist[element].forEach(ele => getB_id(`${ele}`).checked = true)
                element == "titles" && this.openClose("titleChecklistOption")
                element == "question" && this.openClose("titleQuestionOption")
                element == "date_checklist" && this.openClose("validCheckBlock")
            }
        })
        if (jsonFilters.id_shops != "") {
            jsonFilters.id_shops.forEach(elem => getB_id(`${elem}`).checked = true)
            this.openClose("selShop")
        }
        this.loadDate(jsonFilters)
    }

    loadDate(dateJson) {
        let date = dateJson.date_response
        getB_id("initDate").value = date.date_init_response
        getB_id("finalDate").value = date.date_final_response
    }

    openClose(element) {
        getB_id(element).style.display == 'none'
            ? getB_id(element).setAttribute("style", "display:block")
            : getB_id(element).setAttribute("style", "display:none")
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
        this.controllerSelect('selectButtonQuestion', "Selecione a checklist:", false)
        this.controllerSelect('selectButtonValidade', "Selecione a validade:", true)
        this.controllerSelect('titleChecklist', "Selecione a validade:", true)
    }

    clearDate() {
        const data = document.querySelectorAll("input[type='date']")
        data.forEach(date => { date.value = "" })
        document.getElementById("selectTitulo").innerHTML = "Selecione o checklist:"
    }

    validationDate() {
        let dateInit = getB_id("initDate").value
        let dateFinal = getB_id("finalDate").value
        if (dateInit != 0 && dateFinal == 0) {
            alert('selecione data final')
            return
        } else if (dateInit == 0 && dateFinal != 0) {
            alert('Selecione data inicial')
        }
    }

    templateOption(objectChecklist, key, array) {
        let response = ""
        let auxArray = array || objectChecklist.data
        auxArray.map(element => {
            element[key] ? response +=
                `<div class="optionSelect">
                <input type="checkbox" class="option" data-id="${element.id}" id="${element.id}" value="${element[key]}">
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
            } else e.setAttribute("style", "opacity: 0.3")
        })
    }

    changeChartType(value) {
        this.closeGraphic();
        if (value == 'buttonRecordBar') this.typeGraph = 2
        else if (value == 'buttonRecordPizza') this.typeGraph = 1
        else this.typeGraph = 3
    }

    closeGraphic() {
        getB_id('mainGraphic').getContext('2d').clearRect(0, 0, getB_id('mainGraphic').width, getB_id('mainGraphic').height)
        this.recordObject.clppGraphich.graphicRecord && this.recordObject.clppGraphich.graphicRecord.destroy();
        getB_id('graphicUnity').getContext('2d').clearRect(0, 0, getB_id('graphicUnity').width, getB_id('graphicUnity').height)
        this.recordObject2.clppGraphich.graphicRecord && this.recordObject2.clppGraphich.graphicRecord.destroy();
        getB_id('graphicUnity').getContext('2d').clearRect(0, 0, getB_id('graphicUnity').width, getB_id('graphicUnity').height)
        this.recordObject3.clppGraphich.graphicRecord && this.recordObject3.clppGraphich.graphicRecord.destroy();
    }

    controllerSelect(local, message, check) {
        if (check) {
            getB_id(local).setAttribute("style", "opacity:1")
            $(`#${local} button`).disabled = false
        } else {
            getB_id(local).setAttribute("style", "opacity:0.3")
            $(`#${local} button`).disabled = true
        } $(`#${local} p`).innerText = message
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
                    getB_id('titleChecklistOption').setAttribute("style", "display:none")
                    this.controllerSelect("titleChecklist", "Validade selecionada", false)
                    this.controllerSelect("selectButtonQuestion", "Validade selecionada", false)
                })
            } else {
                let element = this.walksArray2('#titleChecklistOption input[type=checkbox]', validade.target.getAttribute("data-id"))
                element.checked = false;
                if (arrayValidade.length < 1) {
                    this.controllerSelect("titleChecklist", "Selecione a checklist", true)
                    this.controllerSelect("selectButtonQuestion", "Selecione a checklist", false)
                }
            }
        }
    }

    blockQuestion() {
        getB_id('titleChecklistOption').onchange = async () => {
            getB_id('titleQuestionOption').innerHTML = ""
            let arrayChecked = this.walksArray('#titleChecklistOption input[type=checkbox]')
            this.validateParameter(arrayChecked.length, arrayChecked[0])
            if (!getB_id('todos').checked) {
                let reqQuestion = this.getQuestion(arrayChecked)
                if (arrayChecked.length == 1) {
                    getB_id('titleQuestionOption').insertAdjacentHTML('beforeend', this.templateOption(null, 'description', reqQuestion))
                    this.controllerSelect("selectButtonValidade", "Checklist selecionada", false)
                    getB_id('validCheckBlock').setAttribute("style", "display:none")
                    this.controllerSelect('selectButtonQuestion', "Selecione a pergunta:", true)
                } else if (arrayChecked.length > 1) this.controllerSelect("selectButtonQuestion", "Multiplos checklist", false)
                else if (arrayChecked.length < 1) {
                    this.controllerSelect('selectButtonValidade', "Selecione a validade:", true)
                    this.controllerSelect('selectButtonQuestion', "Selecione a checklist:", false)
                }
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
            if (element.checked) array.push(element)
        })
        return array
    }

    walksArray2(local, id) {
        let response
        document.querySelectorAll(local).forEach(element => {
            if (element.getAttribute("data-id") == id) response = element
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


    getQuestion(cont) {
        if (cont.length != 0) {
            let question = this.jsonCheck[cont[0].attributes[2].value].getQuestion()
            return question
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
        getB_id('cancelFile').addEventListener('click', () => { closeModal() })
        getB_id('saveFile').addEventListener('click', () => {
            this.setDateObj()
            this.recordObject.saveReport()
            closeModal()
        })
    }

    setDateObj(newPoint) {
        this.recordObject.setId_user(localStorage.getItem("id"))
        this.recordObject.setDescritpion($('#inputTitle input[type=text]').value)
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
            id_shops: this.selectInfo("#selShop input[type=checkbox]"),
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
}  
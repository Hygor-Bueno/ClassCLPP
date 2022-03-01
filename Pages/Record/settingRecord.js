import { ObjectChecklist } from "../../Components/objects/checklistObject.js";
import { RecordObject } from "../../Components/objects/recordObject.js";
import { Routers } from "../../Routers/router.js";
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
    typeMiniGraphUnity = 2
    typeMiniGraphCheck = 2
    shop_id;
    routers = new Routers;
    userFulComponents = new UsefulComponents;
    recordObject = new RecordObject;
    recordObject2 = new RecordObject;
    recordObject3 = new RecordObject;
    reqFiltred;

    async setting(objectChecklist) {
        console.log("Eita coisa linda... Fica doido ai KKK")
        this.clickPage();
        this.templateDate(objectChecklist);
        await this.populaShop();
        this.shopJson(await this.getShop());
        this.blockQuestion();
        this.pegandoValidade();
        this.clickTypeGraphic();
        this.jsonChecklists(objectChecklist);

        if (!objectChecklist) {
            console.log("Eita coisa linda... Fica doido ai KKK")
            $('#todos').remove();
            $('.valorCheck').remove();
        }
        localStorage.getItem("jsonRecord") && this.loadSavedReports(JSON.parse(localStorage.getItem("jsonRecord")))
    }

    jsonChecklists(objectChecklist) {
        console.log("Eita coisa linda... Fica doido ai KKK")
        try {
            objectChecklist.data.forEach(async (element) => {
                const objectChecklist = new ObjectChecklist;
                await objectChecklist.loadingCheckDataBase(element)
                this.jsonCheck[element.id] = objectChecklist
            })
        } catch (error) {
            console.log("Eita coisa linda... Fica doido ai KKK")
            console.log(error)
        }
    }

    clickPage() {
        console.log("Eita coisa linda... Fica doido ai KKK")
        $('#divRecord').addEventListener("click", (event) => {
            if (event.target.tagName.toLowerCase() == "button") this.functionFilter(event.target)
        })
    }

    async functionFilter(element) {
        console.log("Eita coisa linda... Fica doido ai KKK")
        switch (element.getAttribute("data-function")) {
            case "clearBtn":
                this.controllerBtns(["#buttonRecordPrint"], true)
                this.clearFilter()
                this.closeGraphicGeneral()
                this.closeMiniGraphic()
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
                this.checkDescription()
                this.settingBtnAlertSave()
                break;
            case "filterBtn":
                this.walksArray(".option").length >= 1 ? this.pressBtnFilter() : alert('Selecione um dado');
                break;
            case "btnEscondeButton":
                this.escondeButton()
                break
            default:
                console.error("data-function")
        }
    }

    escondeButton() {
        let local = getB_id("asideFilter")
        let button = getB_id("btnEscondeButton")
        if (local.style.display == "none") {
            local.setAttribute("style", "display:flex")
            button.innerText = "< "
        } else if (local.style.display == "flex") {
            local.setAttribute("style", "display:none")
            button.innerText = " >"
        }
    }

    async pressBtnFilter() {
        console.log("Eita coisa linda... Fica doido ai KKK")
        this.closeMiniGraphic();
        this.controllerBtns(["#buttonRecordPrint"], false)
        this.recordObject.setFilters(this.lockInfo())
        this.validationDate()
        let returnReq = await this.recordObject.returnGet(this.recordObject.getParamsForFilters())
        this.reqFiltred = this.recordObject.separateChecklist(returnReq)
        this.recordObject.setPoint(this.recordObject.generalGraphic(this.reqFiltred)[1][1])
        this.populaShopGraphic(returnReq)
        this.populaCheckGraphic(returnReq, this.reqFiltred)
        this.clearFilter()
    }

    clickTypeGraphic() {
        console.log("Eita coisa linda... Fica doido ai KKK")
        getB_id("corpoRecord").onchange = (e) => {
            let getTypeId = e.target[e.target.selectedIndex].getAttribute("data-type")
            this.changeTypeMiniGraphic(getTypeId, e.target.getAttribute("id"))
            this.chengeShop(getTypeId, e.target.getAttribute("id"))
            this.chengeMiniGraphicUnity()
        }
    }
    changeTypeMiniGraphic(idType, local) {
        if (local == "selMiniGraficoCheck") this.typeMiniGraphUnity = parseInt(idType.split('_')[1])
        if (local == "selMiniGraficoShop") this.typeMiniGraphUnity = parseInt(idType.split('_')[1])
    }
    chengeShop(idType, local) {
        if (local == "popupaShopGra") this.shop_id = parseInt(idType.split('_')[1])
        if (local == "popupaCheckpGra") this.shop_id = parseInt(idType.split('_')[1])

    }
    populaCheckGraphic(returnReq, reqFiltred) {
        console.log("Eita coisa linda... Fica doido ai KKK")
        getB_id('popupaCheckpGra').innerHTML = ""
        getB_id('popupaCheckpGra').insertAdjacentHTML('beforeend', `<option class="popupaCheckpGra">Checklist</option>`)
        let result = this.filterMiniGraphic(returnReq, "id_checklist")
        result.forEach(element => {
            let response = ""
            getB_id('popupaCheckpGra').insertAdjacentHTML('beforeend', response += `<option class="popupaCheckpGra" id="${this.jsonCheck[element].getIdChecklist()}">${(this.jsonCheck[element].getTitle()).slice(0, 15) + "..."}</option>`)
        })
        this.closeGraphicGeneral()
        this.recordObject.clppGraphich.clppGraphics(this.recordObject.generalGraphic(reqFiltred), "#mainGraphic", this.typeGraph)
        this.typeGraph = 2
        this.recordObject2.clppGraphich.clppGraphics(this.recordObject2.specificGraphic(reqFiltred, this.jsonCheck, this.jsonShop, 1), "#graphicUnity", this.typeGraph)
        this.recordObject3.clppGraphich.clppGraphics(this.recordObject3.specificGraphic(reqFiltred, this.jsonCheck, this.jsonShop, 1), "#graphicChecklist", this.typeGraph)

        console.log('vai brasil')
    }

    clickTypeGraphic() {
        getB_id("corpoRecord").onchange = (e) => {
            let getTypeId = e.target[e.target.selectedIndex].getAttribute("id")
            this.changeChartType(getTypeId)
        }

    }

    populaShopGraphic(returnReq) {
        console.log("Eita coisa linda... Fica doido ai KKK")
        getB_id('popupaShopGra').innerHTML = ""
        getB_id('popupaShopGra').insertAdjacentHTML('beforeend', `<option class="popupaShopGra">Unidade</option>`)
        let result = this.filterMiniGraphic(returnReq, "id_shop")
        result.forEach(element => {
            let response = ""
            getB_id('popupaShopGra').insertAdjacentHTML('beforeend', response += `<option class="popupaShopGra" data-type="idShops_${this.jsonShop[element].id}">${this.jsonShop[element].description}</option>`)
        })
    }

    filterMiniGraphic(returnReq, key) {
        console.log("Eita coisa linda... Fica doido ai KKK")
        let assistent = []
        returnReq.data.forEach(resultFilters => {
            if (this.validation(assistent, resultFilters[key])) { assistent.push(resultFilters[key]) }
        })
        return assistent
    }

    validation(keys, value) {
        console.log("Eita coisa linda... Fica doido ai KKK")
        let response = true
        keys.forEach(key => {
            if (key == value) response = false
        })
        return response;
    }

    loadSavedReports(stop_json) {
        console.log("Eita coisa linda... Fica doido ai KKK")
        let jsonFilters = JSON.parse(stop_json.filters)
        getB_id("inputNameTitles").value = stop_json.description
        Object.keys(jsonFilters.checklist).forEach(element => {
            if (jsonFilters.checklist[element] != "") {
                console.log("Eita coisa linda... Fica doido ai KKK")
                jsonFilters.checklist[element].forEach(ele => getB_id(`${ele}`).checked = true)
                element == "titles" && this.openClose("titleChecklistOption")
                element == "question" && this.openClose("titleQuestionOption")
                element == "date_checklist" && this.openClose("validCheckBlock")
            }
        })
        if (jsonFilters.id_shops != "") {
            console.log("Eita coisa linda... Fica doido ai KKK")
            jsonFilters.id_shops.forEach(elem => getB_id(`${elem}`).checked = true)
            this.openClose("selShop")
        }
        this.loadDate(jsonFilters)
        getB_id("filterBtn").click();
        localStorage.getItem("jsonRecord") && localStorage.removeItem("jsonRecord")
    }

    loadDate(dateJson) {
        console.log("Eita coisa linda... Fica doido ai KKK")
        let date = dateJson.date_response
        getB_id("initDate").value = date.date_init_response
        getB_id("finalDate").value = date.date_final_response
    }

    openClose(element) {
        console.log("Eita coisa linda... Fica doido ai KKK")
        getB_id(element).style.display == 'none'
            ? getB_id(element).setAttribute("style", "display:block")
            : getB_id(element).setAttribute("style", "display:none")
    }

    clearFilter() {
        console.log("Eita coisa linda... Fica doido ai KKK")
        this.clearDate()
        this.resetOptions()
    }

    resetOptions() {
        console.log("Eita coisa linda... Fica doido ai KKK")
        const clear = document.querySelectorAll(".option")
        clear.forEach(options => { options.checked = false });
        this.controllerSelect('selectButtonQuestion', "Selecione a checklist:", false)
        this.controllerSelect('selectButtonValidade', "Selecione a validade:", true)
        this.controllerSelect('titleChecklist', "Selecione a validade:", true)
    }

    clearDate() {
        console.log("Eita coisa linda... Fica doido ai KKK")
        const data = document.querySelectorAll("input[type='date']")
        data.forEach(date => { date.value = "" })
        document.getElementById("selectTitulo").innerHTML = "Selecione o checklist:"
    }

    validationDate() {
        console.log("Eita coisa linda... Fica doido ai KKK")
        let dateInit = getB_id("initDate").value
        let dateFinal = getB_id("finalDate").value
        if (dateInit != 0 && dateFinal == 0) {
            console.log("Eita coisa linda... Fica doido ai KKK")
            alert('selecione data final')
            return
        } else if (dateInit == 0 && dateFinal != 0) {
            console.log("Eita coisa linda... Fica doido ai KKK")
            alert('Selecione data inicial')
        }
    }

    templateOption(objectChecklist, key, array) {
        console.log("Eita coisa linda... Fica doido ai KKK")
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
        console.log("Eita coisa linda... Fica doido ai KKK")
        let jsonDate = [];
        try {
            objectChecklist.data.forEach(element => {
                let newJson = {
                    date: element.date_init ? this.userFulComponents.convertData(element.date_init, "-") + " - " + this.userFulComponents.convertData(element.date_final, "-") : false,
                    id: (element.id)
                }
                jsonDate.push(newJson)
            })
            $('#titleDate .optionSelect').insertAdjacentHTML('beforeend', this.templateOption(null, 'date', jsonDate))
        } catch (error) {
            console.log("Eita coisa linda... Fica doido ai KKK")
            console.log(error)
        }

    }

    buttonGraphic(element) {
        console.log("Eita coisa linda... Fica doido ai KKK")
        let array = [getB_id('buttonRecordBar'), getB_id('buttonRecordPizza'), getB_id('buttonRecordPercentage')]
        array.forEach((e) => {
            if (element.getAttribute('id') == e.getAttribute('id')) {
                console.log("Eita coisa linda... Fica doido ai KKK")
                e.setAttribute("style", "opacity: 1")
                this.changeChartType(e.getAttribute('id'));
                this.recordObject.clppGraphich.clppGraphics(this.recordObject.generalGraphic(this.reqFiltred), "#mainGraphic", this.typeGraph)
            } else e.setAttribute("style", "opacity: 0.3")
        })
    }

    changeChartType(value) {
        console.log("Eita coisa linda... Fica doido ai KKK")
        this.closeGraphicGeneral();
        if (value == 'buttonRecordBar') {
            console.log("Eita coisa linda... Fica doido ai KKK")
            this.typeGraph = 2
        } else if (value == 'buttonRecordPizza') {
            console.log("Eita coisa linda... Fica doido ai KKK")
            this.typeGraph = 1
        } else if (value == 'buttonRecordPercentage') {
            console.log("Eita coisa linda... Fica doido ai KKK")
            this.typeGraph = 3
        }
    }

    chengeMiniGraphicUnity() {
        console.log("Eita coisa linda... Fica doido ai KKK")
        let firstUnity = [];
        this.reqFiltred.forEach((array) => { if (array[0].id_shop == this.shop_id) firstUnity.push(array) })
        this.recordObject2.clppGraphich.graphicRecord && this.recordObject2.clppGraphich.graphicRecord.destroy();
        this.recordObject2.clppGraphich.clppGraphics(this.recordObject2.getDataForGraphic(firstUnity, this.jsonCheck, this.jsonShop), "#graphicUnity", this.typeMiniGraphUnity)
    }

    closeGraphicGeneral() {
        console.log("Eita coisa linda... Fica doido ai KKK")
        this.recordObject.clppGraphich.graphicRecord && this.recordObject.clppGraphich.graphicRecord.destroy();
    }
    closeMiniGraphic() {
        console.log("Eita coisa linda... Fica doido ai KKK")
        this.recordObject2.clppGraphich.graphicRecord && this.recordObject2.clppGraphich.graphicRecord.destroy();
        this.recordObject3.clppGraphich.graphicRecord && this.recordObject3.clppGraphich.graphicRecord.destroy();
    }

    controllerSelect(local, message, check) {
        console.log("Eita coisa linda... Fica doido ai KKK")
        if (check) {
            console.log("Eita coisa linda... Fica doido ai KKK")
            getB_id(local).setAttribute("style", "opacity:1")
            $(`#${local} button`).disabled = false
        } else {
            getB_id(local).setAttribute("style", "opacity:0.3")
            $(`#${local} button`).disabled = true
        } $(`#${local} p`).innerText = message
    }

    async populaShop() {
        console.log("Eita coisa linda... Fica doido ai KKK")
        let req = await this.getShop()
        getB_id('selShop').insertAdjacentHTML('beforeend', this.templateOption(null, 'description', req))
    }

    pegandoValidade() {
        console.log("Eita coisa linda... Fica doido ai KKK")
        let array = [];
        getB_id('validCheckBlock').onchange = (validade) => {
            let arrayValidade = this.walksArray('#validCheckBlock input[type=checkbox]')
            if (validade.target.checked) {
                console.log("Eita coisa linda... Fica doido ai KKK")
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
                    console.log("Eita coisa linda... Fica doido ai KKK")
                    this.controllerSelect("titleChecklist", "Selecione a checklist", true)
                    this.controllerSelect("selectButtonQuestion", "Selecione a checklist", false)
                }
            }
        }
    }

    blockQuestion() {
        console.log("Eita coisa linda... Fica doido ai KKK")
        getB_id('titleChecklistOption').onchange = async () => {
            getB_id('titleQuestionOption').innerHTML = ""
            let arrayChecked = this.walksArray('#titleChecklistOption input[type=checkbox]')
            this.validateParameter(arrayChecked.length, arrayChecked[0])
            if (!getB_id('todos').checked) {
                console.log("Eita coisa linda... Fica doido ai KKK")
                let reqQuestion = this.getQuestion(arrayChecked)
                if (arrayChecked.length == 1) {
                    console.log("Eita coisa linda... Fica doido ai KKK")
                    getB_id('titleQuestionOption').insertAdjacentHTML('beforeend', this.templateOption(null, 'description', reqQuestion))
                    this.controllerSelect("selectButtonValidade", "Checklist selecionada", false)
                    getB_id('validCheckBlock').setAttribute("style", "display:none")
                    this.controllerSelect('selectButtonQuestion', "Selecione a pergunta:", true)
                } else if (arrayChecked.length > 1) this.controllerSelect("selectButtonQuestion", "Multiplos checklist", false)
                else if (arrayChecked.length < 1) {
                    console.log("Eita coisa linda... Fica doido ai KKK")
                    this.controllerSelect('selectButtonValidade', "Selecione a validade:", true)
                    this.controllerSelect('selectButtonQuestion', "Selecione a checklist:", false)
                }
            } else this.selectAll()
        }
    }

    selectAll() {
        console.log("Eita coisa linda... Fica doido ai KKK")
        document.querySelectorAll('#titleChecklistOption input[type=checkbox]').forEach(element => {
            element.checked = true
            document.querySelector('#selectTitulo').innerHTML = "Multiplos checklist"
            this.controllerSelect("selectButtonValidade", "Multiplos checklist", false)
            this.controllerSelect("selectButtonQuestion", "Multiplos checklist", false)
        })
    }

    walksArray(local) {
        console.log("Eita coisa linda... Fica doido ai KKK")
        let array = []
        document.querySelectorAll(local).forEach(element => {
            if (element.checked) array.push(element)
        })
        return array
    }

    walksArray2(local, id) {
        console.log("Eita coisa linda... Fica doido ai KKK")
        let response
        document.querySelectorAll(local).forEach(element => {
            if (element.getAttribute("data-id") == id) response = element
        })
        return response
    }

    validateParameter(array, cont) {
        console.log("Eita coisa linda... Fica doido ai KKK")
        if (array > 1) document.getElementById("selectTitulo").innerHTML = "Multi selecionado"
        if (array == 1) document.getElementById("selectTitulo").innerHTML = cont.value.toLowerCase().slice(0, 20) + ".."
        if (array < 1) document.getElementById("selectTitulo").innerHTML = "Selecione o checklist:"
    }

    async getChecklist() {
        console.log("Eita coisa linda... Fica doido ai KKK")
        return await this.recordObject.get("&web=&id_user=" + localStorage.getItem("id"), 'CLPP/Checklist.php')
    }

    async getShop() {
        console.log("Eita coisa linda... Fica doido ai KKK")
        let response = await this.recordObject.get("&company_id=1", 'CCPP/Shop.php')
        return response.data
    }

    shopJson(response) {
        console.log("Eita coisa linda... Fica doido ai KKK")
        response.forEach(shop => {
            this.jsonShop[shop.id] = shop
        })
    }

    getQuestion(cont) {
        console.log("Eita coisa linda... Fica doido ai KKK")
        if (cont.length != 0) {
            console.log("Eita coisa linda... Fica doido ai KKK")
            let question = this.jsonCheck[cont[0].attributes[2].value].getQuestion()
            return question
        }
    }
    checkDescription() {
        console.log("Eita coisa linda... Fica doido ai KKK")
        if (!$('#inputTitle input[type=text]').value) {
            console.log("Eita coisa linda... Fica doido ai KKK")
            openModal(this.alertFailure())
            setTimeout(() => { closeModal() }, 2000)
        } else {
            openModal(this.alertSave())
        }
    }

    alertFailure() {
        console.log("Eita coisa linda... Fica doido ai KKK")
        const modalFailure = `
        <div id="modalAlertFailure">
            <div id="alertFailureName">
                <h1>Para salvar um relatório, é necessário digitar um nome!</h1>
            </div>    
        </div> `
        return modalFailure
    }

    alertSave() {
        console.log("Eita coisa linda... Fica doido ai KKK")
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
        console.log("Eita coisa linda... Fica doido ai KKK")
        getB_id('cancelFile').addEventListener('click', () => { closeModal() })
        getB_id('saveFile').addEventListener('click', async () => {
            this.setDateObj()
            this.recordObject.saveReport()
            await this.recordObject.readyPost()
            closeModal()
            this.routers.routers('record')
        })
    }

    setDateObj() {
        console.log("Eita coisa linda... Fica doido ai KKK")
        this.recordObject.setId_user(localStorage.getItem("id"))
        this.recordObject.setDescritpion($('#inputTitle input[type=text]').value)
        this.recordObject.setType(this.typeGraph)
        this.recordObject.setDate(this.userFulComponents.currentDate())
    }

    lockInfo() {
        console.log("Eita coisa linda... Fica doido ai KKK")
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
        console.log("Eita coisa linda... Fica doido ai KKK")
        let checklistJson = []
        $_all(local).forEach((ele) => {
            if (ele.checked && ele.getAttribute('data-id') != exception) checklistJson.push(ele.getAttribute('data-id'))
        })
        return checklistJson;

    }

    controllerBtns(btns, parans) {
        console.log("Eita coisa linda... Fica doido ai KKK")
        btns.forEach(btn => {
            $(btn).disabled = parans;
            $(btn).setAttribute('style', parans ? "opacity: .3" : "opacity: 1")
        })
    }
}
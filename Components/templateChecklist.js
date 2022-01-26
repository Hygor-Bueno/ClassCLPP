import { Routers } from '../Routers/router.js';
import { getB_id, $, $_all } from '../Util/compressSyntaxe.js'
import { ErrorHandling } from '../Util/errorHandling.js';
import { UsefulComponents } from '../Util/usefulComponents.js';
import { Validation } from '../Util/validation.js';
import { ObjectChecklist } from './objects/checklistObject.js';

export class TemplateChecklist {
    controllerCheck = true;
    checklist = new ObjectChecklist(localStorage.getItem('id'));
    usefulComponents = new UsefulComponents;
    routers = new Routers;
    validation = new Validation;
    errorHandling = new ErrorHandling;
    notification = true;
    idQuestion = 1;
    // this.routes.routers(router[index])
    pathImgEdit = "./assets/images/pencil.svg";
    pathImgSave = "./assets/images/save.svg";
    pathImgDelete = "./assets/images/delete.svg";
    pathImgNotify = "./assets/images/alertNotify.svg";
    pathImgNotifyOn = "./assets/images/alertNotifyOn.svg";
    pathImgSignature = "./assets/images/signature.svg";

    main() {
        let response =
            `<div id="formCheclist">		
                    <div id="groupForm">
                        <input type="text" placeholder="Digite o Título do Checklist" id="nameChecklist" class="inputRiquered" disabled=false>
                        <button type="button" title="Edita nome do checklist" class="editBtnCss" id="btnNameChecklist"></button>
                        <div id="groupFormDate">
                            <p>Data Inicial: </p> <input type="date" id="dateInicial" min="${this.usefulComponents.currentDate()}"/>
                            <p>Data Final: </p> <input type="date" id="dateFinal" min="${this.usefulComponents.currentDate()}"/>
                        </div>		
                    </div>
                    <div id="groupButtons">
                        <button type="button" class="notificationBtnCss" id="notifyChecklist"></button>                          
                        <button type="button" class="deleteBtnCss" id="deleteChecklist"></button>
                    </div>
                </div>
                <div id="bodyCheckEditable">
                    <section id="questionCreated" class="style_scroll">
                    </section>
                    <aside>
                        <div id="editableQuestion">
                        <header>
                            <h1>Escolha o tipo da questão: </h1>
                            <select id="typeQuestion">
                                <option value= "2"> Multiplas Escolhas </option>
                                <option value= "1"> Checkbox </option>
                                <option value= "4"> Assiatura Manual </option>
                                <option value= "3"> Assinatura por Nome e CPF </option>
                            </select>
                        </header>
                        ${this.headerQuestion() + this.bodyQuestion()}
                        </div>
                        <div id="settingFooterButton">
                            <button type="button" title="cria um novo checklist" id="btnSaveChecklist">Finalizar</button>
                        </div>
                    </aside>
                </body> 
            `
        return response;
    }
    headerQuestion() {
        return `
                    <div id="headerQuestion">
                        <div id="divForm">
                            <input type="text" class="inputRiquered" placeholder="Digite o Título da questão" disabled/>
                            <button type="button" class="editBtnCss" id="btnEnabledInput"></button>
                        </div>  
                        <asind id="btnQuestion">
                            <button type="button" class="addBtnCss" id="addNewOption"></button>
                            <button type="button" class="saveBtnCss" id="saveQuestion"></button>
                        </asind>
                    </div>
                `
    }
    bodyQuestion() {
        return `
                <div id="containerBodyQuestion">
                    <div id="bodyQuestion">
                        ${this.filterType(2, 1)}
                    </div>
                </div>
                `
    }
    options(id, btnDelete, inputGeneral, typeMult) {
        return `
                <div id="option_${id}" class="optionEditable" value="${id}">
                    <section class="sectionOption">    
                        <div>                    
                            ${inputGeneral}
                            <input type="text" placeholder="Editável" class="inputEditable inputRiquered" id="inputOption${id}"
                                title="Editável" disabled />
                            <button type="button" class="btnsQuestion editBtnCss" id="btnEditabled_${id}"></button>
                                ${btnDelete? `<button type="button" class="btnsQuestion btnDelete deleteBtnCss" id="btnDelete_${id}" value="${id}"></button>` : ""}  
                        </div>  
                    ${typeMult == 2 ?
                `<select class="selectValue" title="Valor das Respostas" id="selectOption_${id}" default=1>
                            <option value="1" >Correta: 1 Ponto</option>
                            <option value="0.5" >Parcial: 0.5 Ponto</option>
                            <option value="0">Errada: 0 Pontos</option>
                        </select>`: ""}
                    </section>
                    <footer class="footerOption">
                    ${`
                        <label class="mandatoryOptions">Obrigatórios:</label>
                        <input type="checkbox" class="checkPhoto"  id="checkPhoto_${id}"/> <p>Foto</p>
                        <input type="checkbox" class="checkObservation"  id="checkObservation_${id}"/><p>Observação</p>
                    `}
                    </footer>
                </div>
                `
    }

    proceedChecklist(object) {
        this.checklist.loadingChecklist(object);
        getB_id('nameChecklist').value = object.nameChecklist
        if (object.notify != "0") {
            $('#notifyChecklist ').setAttribute('style', "background-image: url('./assets/images/alertNotifyOn.svg')")
            this.notification = false;
        }
        if (object.dataInit) getB_id('dateInicial').value = object.dataInit;
        if (object.dataFinal) getB_id('dateFinal').value = object.dataFinal;
        let questions = "";
        object.questions.forEach((element) => { questions += this.questionsCreated([element], element.id);this.idQuestion =element.id+1;});
        getB_id('questionCreated').insertAdjacentHTML('beforeend', questions)
        object.questions.forEach((element) =>{this.btnQuestionCreated(element.id)})
    }

    editOption(objectQuestion, btnDelete, objQuestion, indexOption) {
        let id = localStorage.getItem('router') == "checklistCreated"? objectQuestion.id : indexOption
        return `
                <div id="option_${id}" class="optionEditable" value="${id}">
                    <section class="sectionOption">    
                        <div>                    
                        ${objQuestion.type == 2 ? `<input type="radio" title="input"/>` : `<input type="checkbox" title="input"/>`}
                            <input type="text" placeholder="Editável" class="inputEditable inputRiquered" id="inputOption${id}"
                                title="Editável" disabled value="${objectQuestion.description}"/>
                            <button type="button" class="btnsQuestion editBtnCss" id="btnEditabled_${id}"></button>
                                ${btnDelete? `<button type="button" class="btnsQuestion btnDelete deleteBtnCss" id="btnDelete_${id}" value="${id}"></button>` : ""}  
                        </div>  
                        ${objQuestion.type == 2 ?                `
                        <select class="selectValue" title="Valor das Respostas" id="selectOption_${id}">
                            <option value="1" ${objectQuestion.value == "1" ? 'selected' : ''}>Correta: 1 Ponto</option>
                            <option value="0.5" ${objectQuestion.value == "0.5" ? 'selected' : ''}>Parcial: 0.5 Ponto</option>
                            <option value="0" ${objectQuestion.value == "0" ? 'selected' : ''}>Errada: 0 Pontos</option>
                        </select>`: ""}
                    </section>
                    <footer class="footerOption">
                    ${`
                        <label class="mandatoryOptions">Obrigatórios:</label>
                        <input type="checkbox" class="checkPhoto"  id="checkPhoto_${id}" ${objectQuestion.photo == 1 ? "checked='true'" : ''}/> <p>Foto</p>
                        <input type="checkbox" class="checkObservation"  id="checkObservation_${id}" ${objectQuestion.observe == 1 ? "checked='true'" : ''}"/><p>Observação</p>
                    `}
                    </footer>
                </div>
                `
    }
    questionsCreated(objectCheck, value) {
        return `
                    <div class="questionCreated" id="questionCreated_${value}" value="${value}">
                        ${this.containerQuestionCreate(objectCheck, value)}
                    </div>
                `
    }
    containerQuestionCreate(objectCheck, value) {

        return `
                <div class="containerQuestionCreated">
                        ${objectCheck.map((element) => {
            let groupOption = this.desmemberObjQuestion(element)
            return `
                                    <header>
                                        <h1>${element.title || element.description}</h1>
                                        <div class="divGroupButton">
                                            <button class="editBtnCss" id="editQuestionBtn_${value}" type="button" data-id="${value}" title="editar questão"></button>
                                            <button class="deleteBtnCss" id="deleteQuestionBtn_${value}" type="button" data-id="${value}" title="excluir questão"></button>
                                        </div>
                                    </header>                                        
                                ${groupOption.map((options) => (this.bodyCreated(options,element.type))).join("")}`
        }).join("")}
                    </div>
                `
    }
    bodyCreated(options,type) {
        let response;
        switch (parseInt(type)) {
            case 2:
                response = `<section><input type="radio" title="input"/><p>${options.description}</p></section>`
                break;
            case 1:
                response = `<section><input type="checkbox" title="input"/><p>${options.description}</p></section>`
                break;
            case 4:
                response = `<div class="handSignatureCreated"><input type="text" placeholder="Assine Aqui..." disabled/><img id="handSignatureImg" src="${this.pathImgSignature}" title="Assinatura manual" /></div>`
                break;
            case 3:
                response = `
                <div class="signatureCpfCreated"> 
                    <div class="nameResponsible">
                        <label>Nome: </label>
                        <input type="text" placeholder="Assine Aqui, o nome do responseável..." disabled/>
                    </div>
                    <div class="cpfResponsible">
                        <label>CPF: </label>
                        <input type="text" placeholder="XXX.XXX.XXX-XX" disabled/>
                    </div>
                </div>`
                break;
            default:
                console.error('indice não encontrado {bodyCreated(options)} ')
        }
        return response;
    }
    settingButton() {
        this.enableInputTitle();
        this.changeNotification();
        this.addNewOption();
        this.enabledButtonInit();
        this.changeTypeQuestion();
        this.changeNameChecklist();
        this.changeDatesChecklist();
        this.saveQuestion('saveQuestion');
        getB_id('deleteChecklist').addEventListener('click', () => {this.finalChecklist('excluir')})
        getB_id('btnEnabledInput').addEventListener('click', () => this.enabledInputQuestion('#divForm input'))
        getB_id('btnSaveChecklist').addEventListener('click', () => this.completedChecklist())
        localStorage.getItem('checklist') ? this.proceedChecklist(JSON.parse(localStorage.getItem('checklist'))) : "";
    }
    editQuestionCreated(objectQuestion) {
        getB_id('typeQuestion').value = objectQuestion.type        
        let updateBtn = this.tempButtonUpdate('updateQuestion')
        getB_id('saveQuestion').remove();
        getB_id('btnQuestion').insertAdjacentHTML('beforeend', updateBtn);
        this.btnUpdate(objectQuestion, 'updateQuestion');
        $('#divForm input').value = objectQuestion.title || objectQuestion.description
        $('#bodyQuestion').remove();
        getB_id('containerBodyQuestion').insertAdjacentHTML('beforeend', `<div id="bodyQuestion"></div>`)
        this.populateOptions(objectQuestion, 'bodyQuestion')
        this.configBtnQuestion();
        this.disableButtons(['#questionCreated', '#formCheclist', '#settingFooterButton'])
        getB_id('typeQuestion').disabled = true;
    }
    resetQuestionCreate() {
        $('#headerQuestion input').value = "";
        let updateBtn = this.tempButtonUpdate("saveQuestion")
        getB_id('updateQuestion').remove();
        getB_id('btnQuestion').insertAdjacentHTML('beforeend', updateBtn);
        this.saveQuestion('saveQuestion')
        this.alterTypeQuestion();
        this.enabledButtonInit();
    }
    btnUpdate(objectQuestion, local) {
        getB_id(local).addEventListener('click', () => {
            if (this.validationQuestion()) {
                this.checklist.updateQuestion(localStorage.getItem('router')=='checklistCreated' ? this.upQuestion(objectQuestion) : this.addQuestion(objectQuestion.id));
                let editedQuestion = this.containerQuestionCreate([this.checklist.queryQuestion(objectQuestion.id)], objectQuestion.id)
                getB_id(`questionCreated_${objectQuestion.id}`).innerHTML = "";
                getB_id(`questionCreated_${objectQuestion.id}`).insertAdjacentHTML('beforeend', editedQuestion)
                this.resetQuestionCreate();
                this.btnQuestionCreated(objectQuestion.id);
                this.enableButtons(['#questionCreated', '#formCheclist', '#settingFooterButton'])
                getB_id('typeQuestion').disabled = false;
                localStorage.setItem('checklist', JSON.stringify(this.checklist.checklistJSON()))
            }
        })
    }
    populateOptions(objectQuestion, local) {
        let aux = objectQuestion.type == 2 ? 2 : 1
        let index = 0;
        this.usefulComponents.convertObjForArray(objectQuestion).forEach((element) => {
            if (typeof element == 'object') {
                index++;
                getB_id(local).insertAdjacentHTML('beforeend', `${this.editOption(element, aux > 0 ? false : true, objectQuestion, index)}`)
                aux--;
            }
        })
    }
    tempButtonUpdate(id) {
        return `
            <button type="button" class="saveBtnCss" id='${id}'></button>
        `
    }
    //FUNCIONALIDADES DOS TEMPLATES: 
    disableButtons(places) {
        places.forEach((place) => {
            let buttons = $_all(`${place} button`);

            buttons.forEach((button) => { 
                button.disabled = true;
                button.style.opacity = 0.2
            })
        })
    }
    enableButtons(places) {
        places.forEach((place) => {
            let buttons = $_all(`${place} button`);
            buttons.forEach((button) => { button.disabled = false; button.style.opacity=1})
        })
    }
    saveQuestion(idButton) {
        getB_id(idButton).addEventListener('click', () => {
            if (this.validationQuestion()) {
                this.auxAddQuestion(this.idQuestion);
                this.alterTypeQuestion();
                this.enabledButtonInit();
                this.resetInput('#headerQuestion input')
                localStorage.setItem('checklist', JSON.stringify(this.checklist.checklistJSON()))
            }
        })
    }
    validationQuestion() {
        let response = true
        let method = [this.validation.requiredFields, this.validation.maxLength, this.validation.multipleInputMaxLength]
        let params = [["#editableQuestion .inputRiquered"], [$("#divForm input").value, 100], [".inputEditable", 45]]
        let message = [" Preencha todos os campos de texto. <br> ", " O título da questão não pode conter mais que 100 caracteres <br> ", " As opções de resposta não podem conter mais que 45 caracteres <br> "]
        let methods = this.validationMultiple_error(method, params, message)
        let result = this.validation.multipleValidation(methods)
        if (!result.error) {
            this.errorHandling.main(result.data)
            response = result.error;
        }
        return response;
    }
    finalChecklist(message) {        
        if (confirm(`Deseja realmente ${message} o checklist? `)) { localStorage.removeItem('checklist'); this.routers.routers(localStorage.getItem('router')) }
    }
    addNewOption() {
        getB_id('addNewOption').addEventListener('click', () => {
            this.addOptions('bodyQuestion');
            this.enabledOptionButton();
            this.deleteOptionButton()
        })
    }
    enableInputTitle() {
        getB_id('btnNameChecklist').addEventListener('click', () => {
            getB_id('nameChecklist').disabled = false;
            getB_id('nameChecklist').focus()
        })
    }
    // Funcçoes que alteram o objeto checklist.
    changeNotification() {
        getB_id('notifyChecklist').addEventListener("click", () => {
            // this.notification ? $('#notifyChecklist img').setAttribute('src', this.pathImgNotifyOn) : $('#notifyChecklist img').setAttribute('src', this.pathImgNotify)
            this.notification ? $('#notifyChecklist').setAttribute('style', "background-image: url('./assets/images/alertNotifyOn.svg')") : $('#notifyChecklist').setAttribute('style', "background-image: url('./assets/images/alertNotify.svg')")
            this.checklist.setNotification(this.notification ? 1 : 0)
            this.notification = !this.notification;
        })
    }
    changeTypeQuestion() {
        getB_id('typeQuestion').onchange = () => {
            this.alterTypeQuestion();
            this.enabledButtonInit();
            $('#headerQuestion input').value = "";
            $('#headerQuestion input').setAttribute('disabled', true)
        }
    }
    changeNameChecklist() {
        getB_id('nameChecklist').onchange = () => {
            this.checklist.setTitle(getB_id('nameChecklist').value);
            getB_id('nameChecklist').disabled = true;
        }
    }
    changeDatesChecklist() {
        getB_id('dateInicial').onchange = () => {
            this.checklist.setDate_init(getB_id('dateInicial').value)
        }
        getB_id('dateFinal').onchange = () => {
            this.checklist.setDate_final(getB_id('dateFinal').value)
        }
    }
    desmemberObjQuestion(question) {
        let response = [];
        Object.keys(question).forEach((element) => {
            if (typeof question[element] == "object") response.push(question[element])
        });
        return response;
    }
    filterType(value, id) {
        let input;
        let response = "";
        switch (value) {
            case 2:
                for (let index = 0; index < 2; index++) {
                    input = `<input type="radio" name="optionRadio" id="res_${index == 0 ? id : id + 1}" value='${index == 0 ? id : id + 1}' title="sim" />`;
                    response += this.options(index == 0 ? id : id + 1, false, input, 2);
                }
                break;
            case 1:
                input = `<input type="checkbox" id="res_${id}" value='1' title="sim" />`;
                response = this.options(id, false, input);
                break;
            case 4:
                response = `<div id="bodyQuestion" class="handSignature"><input type="text" placeholder="Assine Aqui..." disabled/><img src="${this.pathImgSignature}" title="Assinatura manual" /></div>`
                break;
            case 3:
                response = `
                <div class="signatureCpfCreated"> 
                    <div class="nameResponsible">
                        <label>Nome: </label>
                        <input type="text" placeholder="Digite o nome do responseável." disabled/>
                    </div>
                    <div class="cpfResponsible">
                        <label>CPF: </label>
                        <input type="text" placeholder="XXX.XXX.XXX-XX" disabled/>
                    </div>
                </div>`
                break;
            case 5:
                input = `<input type=${this.getValueSelect('#typeQuestion') == 2 ? "radio" : "checkbox"} name="optionRadio" id="res_${id}" value='${id}' title="sim" />`;
                response = this.options(id, true, input, this.getValueSelect('#typeQuestion'));
                break;
            default:
                console.error('Opção de entrada inválida: ' + value);
        }
        return response;
    }
    enabledInputQuestion(local) {
        $(local).disabled = false;
        $(local).focus();
    }
    disabledInputQuestion(local) {
        $(local).disabled = false;
    }
    addOptions(local) {
        getB_id(local).insertAdjacentHTML("beforeend", this.filterType(5, this.nextIdOption('optionEditable')));
    }
    getValueSelect(local) {
        let select = $(local)
        console.log($(local))
        let value = select.options[select.selectedIndex].value;
        return value
    }
    nextIdOption(local) {
        let array = $_all(`.${local}`)
        let aux = array[0].getAttribute('value');
        for (let index = 1; index < array.length; index++) {
            if (aux < array[index].getAttribute('value')) {
                aux = array[index].getAttribute('value');
            }
        }
        return parseInt(aux) + 1
    }
    resetInput(local) {
        $(local).value = "";
        $(local).disabled = true;
    }
    enabledOptionButton() {
        let array = $_all('.optionEditable')[$_all('.optionEditable').length - 1]
        let button = getB_id(`btnEditabled_${array.getAttribute('value')}`)
        let input = getB_id(`inputOption${array.getAttribute('value')}`)
        button.addEventListener('click', () => { input.disabled = false; input.focus(); })
    }
    enabledButtonInit() {
        let array = $_all('.optionEditable')
        array.forEach(element => {
            let button = getB_id(`btnEditabled_${element.getAttribute('value')}`)
            let input = getB_id(`inputOption${element.getAttribute('value')}`)
            button.addEventListener('click', () => { input.disabled = false; input.focus(); })
        });
    }
    deleteOptionButton() {
        let array = $_all('.optionEditable')[$_all('.optionEditable').length - 1]
        let value = array.getAttribute('value')
        let button = getB_id(`btnDelete_${value}`)
        button.addEventListener('click', () => {localStorage.getItem('router') == "checklistCreated"? this.checklist.deleteOptionDataBase(value) :  getB_id(`option_${value}`).remove(); })
    }
    configBtnQuestion() {
        this.enabledButtonInit();
        let array = $_all('.btnDelete');
        array.forEach(element => {
            element.addEventListener('click', () => { getB_id(`option_${element.value}`).remove(); })
        });
    }
    alterTypeQuestion() {
        getB_id('bodyQuestion').innerHTML = "";
        getB_id('bodyQuestion').insertAdjacentHTML('beforeend', this.filterType(parseInt(this.getValueSelect('#typeQuestion')), 1));
    }
    addQuestion(value) {                
        localStorage.getItem('router') == 'checklistCreated'? this.idQuestion= value:this.idQuestion++;        
        let object = {};
        object.id = value;
        object.id_question = "";
        object.type = this.getValueSelect(`#typeQuestion`);
        object.title = $('#headerQuestion input').value;
        if (object.type < 3) {
            $_all('.optionEditable').forEach(element => {
                let values = element.getAttribute('value');
                let desc = element.querySelector('.inputEditable').value
                let selectOption
                object.type == 2 ? selectOption = this.getValueSelect(`#selectOption_${values}`) : selectOption = this.calculateCheckboxValue('inputEditable');
                let photo = element.querySelector(`#checkPhoto_${values}`);
                let note = element.querySelector(`#checkObservation_${values}`);
                object[`op_${values}`] = { type: this.getValueSelect("#typeQuestion"), description: desc, photo: photo.checked ? 1 : 0, observe: note.checked ? 1 : 0, value: selectOption }
            });
        } else {
            object[`op_${value}`] = { type: this.getValueSelect("#typeQuestion"), description: 'Assinatura manual', photo: 0, observe: 0, value: 0 }
        }
        return object;
    }
    upQuestion(value){
        this.idQuestion++;
        let object = {};
        object.id = value.id;
        object.id_question =  value.id;
        object.type = value.type;
        object.title = $('#headerQuestion input').value;
        object.checklist_id= value.checklist_id;
        if (object.type < 3) {
            $_all('.optionEditable').forEach(element => {
                let values = element.getAttribute('value');
                let desc = element.querySelector('.inputEditable').value
                let selectOption
                object.type == 2 ? selectOption = this.getValueSelect(`#selectOption_${values}`) : selectOption = this.calculateCheckboxValue('inputEditable');
                let photo = element.querySelector(`#checkPhoto_${values}`);
                let note = element.querySelector(`#checkObservation_${values}`);
                object[`op_${values}`] = {type: this.getValueSelect("#typeQuestion"),description: desc,id: values,observe: note.checked ? 1 : 0,photo:photo.checked ? 1 : 0,question_id: object.id_question,value: selectOption}
            });
        } else {
            object[`op_${value}`] = { type: this.getValueSelect("#typeQuestion"), description: 'Assinatura', photo: 0, observe: 0, value: 0 }
        }
        return object;
    }
    calculateCheckboxValue(optionClass) {
        return parseFloat((1 / $_all(`.${optionClass}`).length).toFixed(2))
    }
    auxAddQuestion(value) {
        let object = this.addQuestion(value);
        this.checklist.addQuestion(object);
        getB_id('questionCreated').insertAdjacentHTML('beforeend', this.questionsCreated([object], value))
        this.btnQuestionCreated(value);
    }
    btnQuestionCreated(values) {
        let array = $_all('.questionCreated')[$_all('.questionCreated').length - 1];
        let value = values || array.getAttribute('value');
        let btnEdit = getB_id(`editQuestionBtn_${value}`);
        let btnDelete = getB_id(`deleteQuestionBtn_${value}`);        
        btnDelete.addEventListener('click', () => {localStorage.getItem('router') == 'checklistCreated'? this.deleteQuestDataBase(value):this.deleteQuest(value);getB_id(`questionCreated_${value}`).remove();} );
        btnEdit.addEventListener('click', () => { this.editQuestion(this.checklist.queryQuestion(value));});
    }
    deleteOptionBD(value){
        this.checklist.deleteOptionDataBase(value)
    }
    deleteQuest(value){ 
        this.checklist.deleteQuestion(value);
    }
    deleteQuestDataBase(value){
        this.checklist.deleteQuestionDataBase(value)
    }
    editQuestion(objectQuestion) {
        this.
        Created(objectQuestion)
    }
    //Função resposavel por finalizar o checklist!
    async completedChecklist() {
        let method = [this.validation.minLength, this.validation.minLength, this.validation.maxLength, this.validation.validationDataInicialFinal]
        let params = [[$("#nameChecklist").value, 1], [$_all(".questionCreated"), 1], [$("#nameChecklist").value, 45], [$_all("input[type='date']")]]
        let message = [" O título do Checklist não pode estar vazio. <br>", "O checklist não pode salvo sem questões. <br>", " O título do Checklist não pode conter mais que 45 caracteres. <br>", " A data inicial não pode ser maior que a data final. <br> Caso um campo seja preenchido o outro se torna obrigatório.<br>"]
        let result = this.validation.multipleValidation(this.validationMultiple_error(method, params, message))
        if (result.error) {
            await this.checklist.saveChecklist();
            await this.checklist.saveQuestions();
            this.finalChecklist('finalizar')
        } else {
            this.errorHandling.main(result.data)
        }
    }
    validationMultiple_error(methods, params, message) {
        let response = [];
        for (let index = 0; index < methods.length; index++) {
            response.push([methods[index], params[index], message[index]])
        }
        return response;
    }
}
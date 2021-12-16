import { getB_id, $, $_all } from '../Util/compressSyntaxe.js'
import { UsefulComponents } from '../Util/usefulComponents.js';
import { ObjectChecklist } from './objects/checklistObject.js';

export class TemplateChecklist {
    controllerCheck = true;
    checklist = new ObjectChecklist;
    usefulComponents = new UsefulComponents;
    idQuestion = 1;
    pathImgEdit = "./assets/images/pencil.svg";
    pathImgAlert = "./assets/images/alertNotify.svg";
    pathImgSalve = "./assets/images/salve.svg";
    pathImgDelete = "./assets/images/delete.svg";
    main() {
        let response =
            `<div id="formCheclist">		
                    <div id="groupForm">
                        <input type="text" placeholder="Digite o Título do Checklist" id="nameChecklist" disabled=false>
                        <button type="button" title="Edita nome do checklist" id="btnNameChecklist"><img src=${this.pathImgEdit} title="Editar Nome do checklist" /></button>
                        <div id="groupFormDate">
                            <p>Data Inicial: </p> <input type="date" id="dateInicial"/>
                            <p>Data Final: </p> <input type="date" id="dateFinal"/>
                        </div>		
                    </div>
                    <div id="groupButtons">
                        <button type="button" id="notifyChecklist"><img src=${this.pathImgAlert} title="Noftificar quando checklist for respondido" /></button>
                        
                        <button type="button" id="deleteChecklist"><img src=${this.pathImgDelete} title="Excluir checklist" /></button>
                    </div>
                </div>
                <div id="bodyCheckEditable">
                    <section id="questionCreated">
                    </section>
                    <aside>
                        <div id="editableQuestion">
                        <header>
                            <h1>Escolha o tipo da questão: </h1>
                            <select id="typeQuestion">
                                <option value= "1"> Multiplas Escolhas </option>
                                <option value= "2"> Check In box </option>
                                <option value= "3"> Assiatura Manual </option>
                                <option value= "4"> Assinatura por Nome e CPF </option>
                            </select>
                        </header>
                        ${this.headerQuestion() + this.bodyQuestion()}
                        </div>
                        <div id="settingFooterButton">
                            <button type="button" title="cria um novo checklist" id="btnSalveChecklist">Finalizar</button>
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
                            <input type="text" placeholder="Digite o Título da questão" disabled/>
                            <button type="button" id="btnEnabledInput">
                                <img src="./assets/images/pencil.svg" title="Editar título da questão."/>
                            </button>
                        </div>  
                        <asind id="btnQuestion">
                            <button type="button" id="addNewOption">
                                <img src="./assets/images/add.svg" title="Adicionar Nova Opção de Resposta."/>
                            </button>
                            <button type="button" id="salveQuestion">
                                <img src="./assets/images/salve.svg" title="Salvar questão."/>
                            </button>
                        </asind>
                    </div>
                `
    }

    bodyQuestion() {
        return `
                <div id="containerBodyQuestion">
                    <div id="bodyQuestion">
                        ${this.filterType(1, 1)}
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
                            <input type="text" placeholder="Editável" class="inputEditable" id="inputOption${id}"
                                title="Editável" disabled />
                            <button type="button" class="btnsQuestion" id="btnEditabled_${id}">
                                <img src="./assets/images/pencil.svg" title="Editar" />
                            </button>
                                ${btnDelete
                ? `
                                    <button type="button" class="btnsQuestion btnDelete" id="btnDelete_${id}" value="${id}">
                                        <img src="./assets/images/delete.svg" title="Editar" />
                                    </button>` : ""
            }  
                        </div>  
                    ${typeMult == 1 ?
                `<select class="selectValue" title="Valor das Respostas" id="selectOption_${id}" default=1>
                            <option value="1" >Correta: 1 Ponto</option>
                            <option value="0.5" >Parcial: 0.5 Ponto</option>
                            <option value="0">Errada: 0 Pontos</option>
                        </select>`: ""
            }
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
    editOption(objectQuestion, btnDelete, objQuestion, indexOption) {
        return `
                <div id="option_${indexOption}" class="optionEditable" value="${indexOption}">
                    <section class="sectionOption">    
                        <div>                    
                        ${objQuestion.type == 1 ? `<input type="radio" title="input"/>` : `<input type="checkbox" title="input"/>`}
                            <input type="text" placeholder="Editável" class="inputEditable" id="inputOption${indexOption}"
                                title="Editável" disabled value="${objectQuestion.description}"/>
                            <button type="button" class="btnsQuestion" id="btnEditabled_${indexOption}">
                                <img src="./assets/images/pencil.svg" title="Editar" />
                            </button>
                                ${btnDelete
                        ? `

                                    <button type="button" class="btnsQuestion btnDelete" id="btnDelete_${indexOption}" value="${indexOption}">
                                        <img src="./assets/images/delete.svg" title="Editar" />
                                    </button>` : ""
                    }  
                        </div>  
                        ${objQuestion.type == 1 ?
                `
                        <select class="selectValue" title="Valor das Respostas" id="selectOption_${indexOption}">
                            <option value="1" ${objectQuestion.value == "1" ? 'selected' : ''}>Correta: 1 Ponto</option>
                            <option value="0.5" ${objectQuestion.value == "0.5" ? 'selected' : ''}>Parcial: 0.5 Ponto</option>
                            <option value="0" ${objectQuestion.value == "0" ? 'selected' : ''}>Errada: 0 Pontos</option>
                        </select>
                        `: ""
            }
                    </section>
                    <footer class="footerOption">
                    ${`
                        <label class="mandatoryOptions">Obrigatórios:</label>
                        <input type="checkbox" class="checkPhoto"  id="checkPhoto_${indexOption}" ${objectQuestion.photo == 1 ? "checked='true'" : ''}/> <p>Foto</p>
                        <input type="checkbox" class="checkObservation"  id="checkObservation_${indexOption}" ${objectQuestion.observe == 1 ? "checked='true'" : ''}"/><p>Observação</p>
                    `}
                    </footer>
                </div>
                `
    }
    questionsCreated(objectCheck, value) {
        this.checklist.setTitle("Testando metodo questionCreated")
        return `
                    <div class="questionCreated" id="questionCreated_${value}" value="${value}">
                        ${this.containerQuestionCreate(objectCheck, value)}
                    </div>
                `
    }
    containerQuestionCreate(objectCheck, value){
        return `
                <div class="containerQuestionCreated">
                        ${objectCheck.map((element) => {
                        let groupOption = this.desmemberObjQuestion(element)
                            return `
                                    <header>
                                        <h1>${element.title}</h1>
                                        <div class="divGroupButton">
                                            <button  id="editQuestionBtn_${value}" type="button" title="editar questão"><img src=${this.pathImgEdit} title="Editar Image"/></button>
                                            <button  id="deleteQuestionBtn_${value}" type="button" title="excluir questão"><img src=${this.pathImgDelete} title="Editar Image"/></button>
                                        </div>
                                    </header>                                        
                                ${groupOption.map((options) => (
                                options.type == 1 ?
                                    `<section><input type="radio" title="input"/><p>${options.description}</p></section>`
                                    :
                                    `<section><input type="checkbox" title="input"/><p>${options.description}</p></section>`)
                            ).join("")}`
                        }).join("")}
                    </div>
                `
    }
    editQuestionCreated(objectQuestion) {       
        let updateBtn = this.tempButtonUpdate('updateQuestion')
        getB_id('salveQuestion').remove();
        getB_id('btnQuestion').insertAdjacentHTML('beforeend',updateBtn);
        this.btnUpdate(objectQuestion,'updateQuestion');        
        $('#divForm input').value = objectQuestion.title
        $('#bodyQuestion').remove();
        getB_id('containerBodyQuestion').insertAdjacentHTML('beforeend', `<div id="bodyQuestion"></div>`)
        this.populateOptions(objectQuestion,'bodyQuestion')        
        this.configBtnQuestion();     
        this.disableButtons(['#questionCreated','#formCheclist','#settingFooterButton']) 
    }
    resetQuestionCreate(){
        $('#headerQuestion input').value ="";
        let updateBtn = this.tempButtonUpdate("salveQuestion")
        getB_id('updateQuestion').remove();
        getB_id('btnQuestion').insertAdjacentHTML('beforeend',updateBtn);
        this.salveQuestion('salveQuestion')
        this.alterTypeQuestion();    
        //getB_id('btnSalveChecklist').addEventListener('click', () => this.completedChecklist())
        this.enabledButtonInit();        
    }
    btnUpdate(objectQuestion,local){
        getB_id(local).addEventListener('click',()=>{
            this.checklist.updateQuestoin(this.addQuestion(objectQuestion.id));
            let editedQuestion = this.containerQuestionCreate([this.checklist.queryQuestion(objectQuestion.id)],objectQuestion.id)
            getB_id(`questionCreated_${objectQuestion.id}`).innerHTML = "";
            getB_id(`questionCreated_${objectQuestion.id}`).insertAdjacentHTML('beforeend',editedQuestion)
            this.resetQuestionCreate();
            this.btnQuestionCreated(objectQuestion.id);
            this.enableButtons(['#questionCreated','#formCheclist','#settingFooterButton'])
        })
    }
    populateOptions(objectQuestion,local){
        let aux = objectQuestion.type == 1 ? 2 : 1
        let index = 0;
        this.usefulComponents.convertObjForArray(objectQuestion).forEach((element) => {
            if (typeof element == 'object') {
                index++;
                getB_id(local).insertAdjacentHTML('beforeend', `${this.editOption(element, aux > 0 ? false : true, objectQuestion,index)}`)
                aux--;
            }
        })
    }
    tempButtonUpdate(id){
        return `
            <button type="button" id='${id}'>
                <img src="./assets/images/salve.svg" title="alterar Questão."/>
            </button>
        `
    }
    //FUNCIONALIDADES DOS TEMPLATES: 
    disableButtons(places) {
        places.forEach((place) => {
            let buttons = $_all(`${place} button`);
            buttons.forEach((button) => { button.disabled =true; button.setAttribute('style', 'opacity:0.2')})
        })
    }
    enableButtons(places){
        places.forEach((place) => {
            let buttons = $_all(`${place} button`);
            buttons.forEach((button) => { button.disabled =false; button.setAttribute('style', 'opacity:1')})
        })
    }
    settingButton() {
        // Botões do cabeçalho:
        getB_id('btnNameChecklist').addEventListener('click', () => {getB_id('nameChecklist').disabled=false; getB_id('nameChecklist').focus()})
        //Botões da caixa de perguntas editáveis;
        getB_id('addNewOption').addEventListener('click', () => { this.addOptions('bodyQuestion'); this.enabledOptionButton(); this.deleteOptionButton() })
        getB_id('btnEnabledInput').addEventListener('click', () => { this.enabledInputQuestion('#divForm input') })
        this.enabledButtonInit();
        getB_id('typeQuestion').onchange = () => { this.alterTypeQuestion(); this.enabledButtonInit(); $('#headerQuestion input').value="";$('#headerQuestion input').setAttribute('disabled',true) }
        this.changeNameChecklist();
        this.changeDatesChecklist();
        getB_id('btnSalveChecklist').addEventListener('click', () => this.completedChecklist())
        this.salveQuestion('salveQuestion')
    }
    salveQuestion(idButton){
        getB_id(idButton).addEventListener('click', () => { 
            this.auxAddQuestion(this.idQuestion); 
            this.alterTypeQuestion(); 
            this.enabledButtonInit(); 
            this.resetInput('#headerQuestion input') 
        })
    }
    // buttonSalveHeaderCheck() {
    //     getB_id('salveChecklist').addEventListener('click', () => {          
    //         this.changeNameChecklist();
    //     })
    // <button type="button" id="salveChecklist"><img src=${this.pathImgSalve} title="Salvar checklist" /></button> // -CASO FOR UTILIZAR O BOTÃO DEVOLVER NO TAMPLATE;
    // }
    changeNameChecklist(){
        getB_id('nameChecklist').onchange= () =>{
            this.checklist.setTitle(getB_id('nameChecklist').value);
            getB_id('nameChecklist').disabled = true;
            console.log(this.checklist)
        }
    }
    changeDatesChecklist(){
        getB_id('dateInicial').onchange= () =>{
            this.checklist.setDate_init(getB_id('dateInicial').value)
        }
        getB_id('dateFinal').onchange= () =>{
            this.checklist.setDate_final(getB_id('dateFinal').value)
        } 
    }
    changeNotificationChecklist(){
        console.log(getB_id('dateFinal').valueAsDate = new Date())
         
    }
    desmemberObjQuestion(question) {
        let response = [];
        Object.keys(question).forEach((element) => {
            if (element != 'title' && element != 'id' && element != 'id_qustion' && element != 'type') response.push(question[element])
        });
        return response;
    }
    filterType(value, id) {
        let input;
        let response = "";
        switch (value) {
            case 1:
                for (let index = 0; index < 2; index++) {
                    input = `<input type="radio" name="optionRadio" id="res_${index == 0 ? id : id + 1}" value='${index == 0 ? id : id + 1}' title="sim" />`;
                    response += this.options(index == 0 ? id : id + 1, false, input, 1);
                }
                break;
            case 2:
                input = `<input type="checkbox" id="res_${id}" value='1' title="sim" />`;
                response = this.options(id, false, input);
                break;
            case 3:

                break;
            case 4:
                break;
            case 5:
                input = `<input type=${this.getValueSelect('#typeQuestion') == 1 ? "radio" : "checkbox"} name="optionRadio" id="res_${id}" value='${id}' title="sim" />`;
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
        button.addEventListener('click', () => { getB_id(`option_${value}`).remove(); })
    }
    configBtnQuestion(){
        this.enabledButtonInit();
        let array = $_all('.btnDelete');
        array.forEach(element => {
            console.log(element.value,element);
            element.addEventListener('click', ()=>{getB_id(`option_${element.value}`).remove();})
        });
    }
    alterTypeQuestion() {
        getB_id('bodyQuestion').innerHTML = "";
        getB_id('bodyQuestion').insertAdjacentHTML('beforeend', this.filterType(parseInt(this.getValueSelect('#typeQuestion')), 1));
    }
    addQuestion(value) {
        this.idQuestion++;
        let object = {};
        object.id = value;
        object.id_qustion = "";
        object.type = this.getValueSelect(`#typeQuestion`);
        object.title = $('#headerQuestion input').value;
        $_all('.optionEditable').forEach(element => {
            let values = element.getAttribute('value');
            let desc = element.querySelector('.inputEditable').value
            let selectOption = this.getValueSelect(`#selectOption_${values}`);
            let photo = element.querySelector(`#checkPhoto_${values}`);
            let note = element.querySelector(`#checkObservation_${values}`);
            object[`op_${values}`] = { type: this.getValueSelect("#typeQuestion"), description: desc, photo: photo.checked ? 1 : 0, observe: note.checked ? 1 : 0, value: selectOption }
        });
        return object;
    }
    auxAddQuestion(value){
        let object = this.addQuestion(value);
        this.checklist.addQuestion(object);
        getB_id('questionCreated').insertAdjacentHTML('beforeend', this.questionsCreated([object], value))
        this.btnQuestionCreated();
    }
    //Função resposavel por finalizar o checklist!
    completedChecklist() {
        console.log(this.checklist)
    }
    btnQuestionCreated(values) {
        let array = $_all('.questionCreated')[$_all('.questionCreated').length - 1];
        let value = values || array.getAttribute('value');
        let btnEdit = getB_id(`editQuestionBtn_${value}`);
        let btnDelete = getB_id(`deleteQuestionBtn_${value}`);
        btnDelete.addEventListener('click', () => { getB_id(`questionCreated_${value}`).remove(); this.checklist.deleteQuestion(value) });
        btnEdit.addEventListener('click', () => {this.editQuestion(this.checklist.queryQuestion(value))});
    }

    editQuestion(objectQuestion) {
        this.editQuestionCreated(objectQuestion)
        // console.log(objectQuestion)
    }
}
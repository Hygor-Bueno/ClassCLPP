import { getB_id, $, $_all } from '../Util/compressSyntaxe.js'
import { ObjectChecklist } from './objects/checklistObject.js';

export class TemplateChecklist {
    controllerCheck = true;
    checklist = new ObjectChecklist;
    main() {
        let response =
            `<form id="formCheclist">		
                    <div id="groupForm">
                        <input type="text" placeholder="Digite o Título do Checklist" id="nameChecklist" disabled=false>
                        <button type="button"><img src="./assets/images/pencil.svg" title="Editar Nome do checklist" /></button>
                        <div id="groupFormDate">
                            <p>Data Inicial: </p> <input type="date" id="dateInicial"/>
                            <p>Data Final: </p> <input type="date" id="dateFinal"/>
                        </div>		
                    </div>
                    <div id="groupButtons">
                        <button type="button" id="notifyChecklist"><img src="./assets/images/alertNotify.svg" title="Noftificar quando checklist for respondido" /></button>
                        <button type="button" id="salveChecklist"><img src="./assets/images/salve.svg" title="Salvar checklist" /></button>
                        <button type="button" id="deleteChecklist"><img src="./assets/images/delete.svg" title="Excluir checklist" /></button>
                    </div>
                </form>
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
                        <form>
                            <input type="text" placeholder="Digite o Título da questão" disabled/>
                            <button type="button" id="btnEnabledInput">
                                <img src="./assets/images/pencil.svg" title="Editar título da questão."/>
                            </button>
                        </form>  
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
    options(id, btnDelete, inputGeneral) {
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
                        <select class="selectValue" title="Valor das Respostas" id="selectOption_${id}">
                            <option value="1" >Correta: 1 Ponto</option>
                            <option value="0.5">Parcial: 0.5 Ponto</option>
                            <option value="0">Errada: 0 Pontos</option>
                        </select>
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

    questionsCreated(objectCheck) {
        this.checklist.titulo = "Testando metodo questionCreated"
        console.log(objectCheck)
        return  `
                    <div class="questionCreated">
                        <div class="containerQuestionCreated">
                            ${objectCheck.questions.map((element) => {
                                let groupOption = this.desmemberObjQuestion(element)
                                return `
                                        <header>
                                            <h1>${element.title}</h1>
                                            <div class="divGroupButton">
                                                <button type="button" title="editar questão">Editar</button>
                                                <button type="button" title="excluir questão">Excluir</button>
                                            </div>
                                        </header>
                                        ${groupOption.map((options)=>(
                                            `<p>${options.description}</p>`)
                                        ).join("")}
                                    `
                            }).join("")}
                        </div>
                    </div>
                `
    }

    desmemberObjQuestion(question) {
        let response=[];
        console.log(question)
        Object.keys(question).forEach((element) => {
            if (element != 'title') response.push(question[element])
            console.log(response)
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
                    response += this.options(index == 0 ? id : id + 1, false, input);
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
                response = this.options(id, true, input);
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
    settingButton() {
        // Botões do cabeçalho:
        getB_id('salveChecklist').addEventListener('click', () => {
            if (this.controllerCheck) {
                this.controllerCheck = false;
                this.checklist.setTitle(getB_id('nameChecklist').getAttribute('value')
                );
            }
        })
        //Botões da caixa de perguntas editáveis;
        getB_id('addNewOption').addEventListener('click', () => { this.addOptions('bodyQuestion'); this.enabledOptionButton(); this.deleteOptionButton() })
        getB_id('btnEnabledInput').addEventListener('click', () => { this.enabledInputQuestion('#headerQuestion form input') })
        this.enabledButtonInit();
        getB_id('typeQuestion').onchange = () => { this.alterTypeQuestion(); this.enabledButtonInit(); }
        getB_id('btnSalveChecklist').addEventListener('click', () => this.completedChecklist())
        getB_id('salveQuestion').addEventListener('click', () => this.salveQuestion())
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
    alterTypeQuestion() {
        getB_id('bodyQuestion').innerHTML = "";
        getB_id('bodyQuestion').insertAdjacentHTML('beforeend', this.filterType(parseInt(this.getValueSelect('#typeQuestion')), 1));
    }
    completedChecklist() {
        
        // console.log(this.questionsCreated(this.checklist))
    }
    salveQuestion() {
        let object = {};
        object.title = $('#headerQuestion input').value;
        $_all('.optionEditable').forEach(element => {
            let values = element.getAttribute('value');
            let desc = element.querySelector('.inputEditable').value
            let selectOption = this.getValueSelect(`#selectOption_${values}`);
            let photo = element.querySelector(`#checkPhoto_${values}`);
            let note = element.querySelector(`#checkObservation_${values}`);
            object[`op_${values}`] = { type: this.getValueSelect("#typeQuestion"), description: desc, photo: photo.checked ? 1 : 0, observe: note.checked ? 1 : 0, value: selectOption }
        });
        this.checklist.addQuestion(object);
        getB_id('questionCreated').insertAdjacentHTML('beforeend', this.questionsCreated(this.checklist))
    }
}
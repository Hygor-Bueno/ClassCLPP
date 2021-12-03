import {getB_id, $, $_all} from '../Util/compressSyntaxe.js'

export class TemplateChecklist {
    main() {
        let response =
            `
        <form id="formCheclist">		
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
				<button type="button" id="notifyChecklist"><img src="./assets/images/salve.svg" title="Salvar checklist" /></button>
				<button type="button" id="notifyChecklist"><img src="./assets/images/delete.svg" title="Excluir checklist" /></button>
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
            </aside>
		</body> 
        `
        return response;
    }

    headerQuestion() {

        return  `
                    <div id="headerQuestion">
                        <form>
                            <input type="text" placeholder="Digite o Título da questão" disabled=false/>
                            <button type="button">
                                <img src="./assets/images/pencil.svg" title="Editar título da questão."/>
                            </button>
                        </form>  
                        <asind id="btnQuestion">

                            <button type="button" id="addNewOption">
                                <img src="./assets/images/add.svg" title="Editar título da questão."/>
                            </button>

                            <button type="button">
                                <img src="./assets/images/salve.svg" title="Editar título da questão."/>
                            </button>

                        </asind>
                    </div>
                `
    }

    bodyQuestion(){  
        return `
                <div id="bodyQuestion">
                    ${this.optionRadio(1) + this.optionRadio(2)}
                </div>
                `
    }

    optionRadio(id,btnDelete){
        return  `
                <div id="option_${id}" class="optionEditable" value="${id}">
                    <section class="sectionOption">    
                        <div>                    
                            <input type="radio" name="optionRadio" id="res_${id}" value='1' title="sim" />
                            <input type="text" placeholder="Editável" class="inputEditable" value="Editável"
                                title="Editável" disabled />
                            <button type="button" class="btnsQuestion" id="btnEditabled_${id}">
                                <img src="./assets/images/pencil.svg" title="Editar" />
                            </button>
                                ${
                                    btnDelete 
                                    ? `
                                    <button type="button" class="btnsQuestion" id="btnDelete_${id}">
                                        <img src="./assets/images/delete.svg" title="Editar" />
                                    </button>` : ""
                                }  
                        </div>  
                        <select class="selectValue" title="Valor das Respostas">
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
    addOptions(local){
        getB_id(local).insertAdjacentHTML("beforeend",this.optionRadio(this.nextIdOption('optionEditable'),true));
    }
    nextIdOption(local){
        let array = $_all(`.${local}`)    
        let aux= array[0].getAttribute('value');    
        for (let index = 1; index < array.length; index++) {
            if(aux < array[index].getAttribute('value')){
                aux = array[index].getAttribute('value');
            }
        }
        return parseInt(aux)+1
    }
    settingButton(){
        getB_id('addNewOption').addEventListener('click',()=>this.addOptions('bodyQuestion'))
    }

}
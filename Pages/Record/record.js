import { Record } from "../../Connection/Record.js";
import { SettingRecord } from "./settingRecord.js";


export class RecordPage extends SettingRecord {
    getRecord = new Record
    async main(objectChecklist) {
        document.getElementById("message").setAttribute("style", "display:none");
        let response =
            `<div id="divRecord">
                <aside id="asideFilter">
                <div id="titleMain">
                    <h1>Filtra Checklist</h1>
                </div> 
                <section  id="bodyAside" class=" style_scroll">
                    <div class="titleBlock">                
                        <div class="titleFilter">     
                            <h1>Checklist</h1>            
                        </div>                   
                        <div class="bodyChecklist" style="display:block" id="checklistBlock">
                            <div class="questionChecklist">
                                <label class="titleOptionBlock">Titulo das checkList</label>
                                <div class="sel" id="titleChecklist">
                                    <div class="selectButton">
                                        <p id="selectTitulo">Selecione o checklist: </p> 
                                        <button type="button" data-linked="titleChecklistOption" data-function="titleChecklist"></button>
                                    </div>
                                    <div class="testandoTest" id="titleChecklistOption" style="display:none"> 
                                        <div class="testandoTest">
                                        
                                            <input type="checkbox" class="option" data-id="todos" id="todos">
                                                <p class="valorCheck">Todos</p>
                                            </input>
                                        </div>
                                        ${this.templateOption(objectChecklist, 'description')}    
                                    </div>
                                </div>
                            </div>
                            <div class="questionChecklist">
                                <label class="titleOptionBlock">Titulo das Perguntas</label>
                                <div class="sel" id="titleQuestion">
                                    <div id="selectButtonQuestion" style="display:flex">
                                        <p id="selectTituloQuestion">Selecione a pergunta:</p> 
                                        <button data-linked="titleQuestionOption" data-function="titleQuestion" id="selectQuestionCheck"></button>
                                    </div>
                                    <div class="testandoTest" id="titleQuestionOption" style="display:none"> 
                                    </div>
                                                                    
                                </div>    
                            </div>                            
                            <div class="questionChecklist">
                                <label class="titleOptionBlock">Validade</label>
                                <div class="sel" id="titleDate">
                                    <div id="selectButtonValidade">
                                        <p id="selectTitulo">Selecione a validade:</p> 
                                        <button type="button" data-linked="validCheckBlock" data-function="validade" id="selectValidadCheck"></button>
                                    </div>
                                    <div class="testandoTest" id="validCheckBlock" style="display:none">
                                    </div> 
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="titleBlock">
                        <div class="titleFilter">
                            <h1>Unidades</h1>
                        </div>
                        <div class="sel" id="shop">
                            <div class="selectButtonUnid">
                                <p id="selectTitulo">Selecione a unidade:</p> 
                                <button type="button" data-linked="selShop" data-function="unidade"></button>
                            </div>
                            <div id="selShop" style="display:none">
                            </div>                   
                        </div> 
                    </div>
                    <div class="titleBlock">                
                        <div class="titleFilter">     
                            <h1>Datas das respostas</h1>    
                        </div>
                        <div id="dateBlock" class="bodyChecklist" style="display:block">
                            <div class="questionChecklist">
                                <label class="titleOptionBlock">Data inicial</label>
                                <input class="sel" type="date"></input>
                            </div>
                            <div class="questionChecklist">
                                <label class="titleOptionBlock">Data final</label>
                                <input class="sel" type="date"></input>
                            </div>
                        </div>
                    </div>
                </section>
                <div class="buttonMain">
                    <button type="button" id="filterBtn" data-function="filterBtn">FILTRAR</button> 
                    <button type="button" id="clearBtn" data-function="clearBtn"> LIMPAR </button> 
                </div>
            </aside>
            <section id="corpoRecord">
                <header id="header">
                    <section id="inputTitle">
                        <input type="text" placeholder="Nome do relatório"/>
                    </section>
                    <aside id="buttonPrint">
                        <button type="button" class="buttonRecordPrint" data-function="buttonRecordPrint" id="buttonRecordPrint"></button>
                    </aside>
                </header>
                <div id="headerGraphic">
                        <div id="dashbord">
                            <h1>Dashboard</h1>
                        </div>
                        <div id="buttonGraphic">
                            <button type="button" class="buttonRecordGraphic" id="buttonRecordBar" data-function="buttonRecordGraphic"></button>
                            <button type="button" class="buttonRecordGraphic" id="buttonRecordPizza" data-function="buttonRecordGraphic"></button> 
                            <button type="button" class="buttonRecordGraphic" id="buttonRecordPercentage" data-function="buttonRecordGraphic" style="opacity: 1"></button>
                        </div>
                </div>
                <body id="graphicRecord">
                    <section id="graphicMain">
                        <h1>Principal</h1>
                    </section>
                    <aside id="unityGraphic">
                        <h1>Unidade</h1>
                    </aside>
                    <aside id="checklistGraphic">
                        <h1>Checklist</h1>
                    </aside>
                </body>
            </section>
           </div> 
        `
        return response;
    }
}
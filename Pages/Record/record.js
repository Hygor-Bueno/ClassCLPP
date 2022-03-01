import { SettingRecord } from "./settingRecord.js";

export class RecordPage extends SettingRecord {
    async main(objectChecklist) {
        document.getElementById("message").setAttribute("style", "display:none");
        let response =
            `<div id="divRecord">
                <aside id="asideFilter" style="display:flex">
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
                                    <div class="optionSelect" id="titleChecklistOption" style="display:none"> 
                                        <div class="optionSelect">
                                            <input type="checkbox" class="option" data-id="todos" id="todos"/><p class="valorCheck">Todos</p>
                                        </div>
                                        ${this.templateOption(objectChecklist, 'description', null)}    
                                    </div>
                                </div>
                            </div>
                            <div class="questionChecklist">
                                <label class="titleOptionBlock">Titulo das Perguntas</label>
                                <div class="sel" id="titleQuestion" >
                                    <div id="selectButtonQuestion" style="display:flex; opacity:0.3" >
                                        <p id="selectTituloQuestion">Selecione a checklist:</p> 
                                        <button data-linked="titleQuestionOption" data-function="titleQuestion" id="selectQuestionCheck" disabled></button>
                                    </div>
                                    <div class="optionSelect" id="titleQuestionOption" style="display:none"> 
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
                                    <div class="optionSelect" id="validCheckBlock" style="display:none">
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
                                <input class="sel" id="initDate" type="date"></input>
                            </div>
                            <div class="questionChecklist">
                                <label class="titleOptionBlock">Data final</label>
                                <input class="sel" id="finalDate" type="date"></input>
                            </div>
                        </div>
                    </div>
                </section>
                <div class="buttonMain">
                    <button type="button" id="filterBtn" data-function="filterBtn">FILTRAR</button> 
                    <button type="button" id="clearBtn" data-function="clearBtn"> LIMPAR </button> 
                </div>
            </aside>





            <div id="btnEsconde">
                <button type="button" id="btnEscondeButton" data-function="btnEscondeButton" style="display:flex"> < </button>
            </div>





            <section id="corpoRecord">
                <header id="header">
                    <section id="inputTitle">
                        <input type="text" id="inputNameTitles" placeholder="Nome do relatório"/>
                    </section>
                    <aside id="buttonPrint">
                        <button type="button" class="buttonRecordPrint" data-function="buttonRecordPrint" id="buttonRecordPrint" disabled style="opacity: 0.3"></button>
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
                       
                        <div id="containerGraphicMain">
                            <canvas id="mainGraphic"></canvas>
                        </div>
                    </section>

                        <aside id="unityGraphic">
                            <div class="btnMiniGrafico">
                                <select class="selMiniGrafico" id="popupaShopGra" style="display:">
                                    <option type="option">Unidade</option>
    
                                </select>
                                <select class="selMiniGrafico"  id="selMiniGraficoShop"style="display:">
                                    <option type="option">Tipo de gráfico</option>
                                    <option type="option" id="graphicMiniPizzaShop" data-type="type_1">Pizza</option> 
                                    <option type="option" id="graphicMiniPorcShop" data-type="type_3">Porcentagem</option>
                                    <option type="option" id="graphicMiniBarShop" data-type="type_2">Barra</option>
                                </select>
                                </div>
                                <div id="containerGraphicUnity">
                                    <canvas id="graphicUnity"></canvas>
                                </div>
                        </aside>
                   
                   
                        <aside id="checklistGraphic" >
                        <div class="btnMiniGrafico">
                            <select class="selMiniGrafico" id="popupaCheckpGra"  style="display:">
                                <option type="option">Checklist</option>
                            </select>
                            <select class="selMiniGrafico" id="selMiniGraficoCheck"style="display:">
                                <option type="option" >Tipo de gráfico</option>
                                <option type="option" id="graphicMiniBarCheck"data-type="type_2">Barra</option>
                                <option type="option" id="graphicMiniPizzaCheck"data-type="type_1">Pizza</option> 
                                <option type="option" id="graphicMiniPorcCheck" data-type="type_3">Porcentagem</option>
                            </select>
                            </div>    
                            <div id="containerGraphicChecklist">
                                <canvas id="graphicChecklist"></canvas>
                            </div>
                        </aside>
                   
                </body>
            </section>
           </div> 
        `
        return response;
    }
}
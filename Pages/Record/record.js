import { Record } from "../../Connection/Record.js";
import { SettingRecord } from "./settingRecord.js";

export class RecordPage extends SettingRecord {
    getRecord = new Record
    async main(objectChecklist) {
        document.getElementById("message").setAttribute("style", "display:none");

        let response =
            `
            <aside>
                <div id="titleMain">
                    <h1>Filtra Checklist</h1>
                </div> 
                <section class="style_scroll" id="bodyAside">
                    <div class="titleBlock">                
                        <div class="titleFilter">     
                            <h1>Checklist</h1>  
                            <button class="imgButton openCloseBlock openCloseBtnCss" data-function="openCloseFilter"  data-block="checklistBlock" type="button"></button>               
                        </div>                   
                        <div class="bodyChecklist" style="display:none" id="checklistBlock">
                            <div class="questionChecklist">
                                <label>Titulo das checkList</label>
                                <select class="sel" id="titleChecklist">
                                <option class="option" value="none" selected="" disabled="" hidden="">Selecione o checklist:</option>
                                    ${this.templateOption(objectChecklist, 'description')}
                                </select>
                            </div>
                            <div class="questionChecklist">
                                <label>Titulo das Perguntas</label>
                                <select class="sel" id="titleQuestion">                                
                                <option class="option" value="none" selected="" disabled="" hidden="">Selecione a pergunta:</option>
                                </select>
                            </div>
                            <div class="questionChecklist">
                                <label>Validade</label>
                                <input type="date" class="date"></input>
                            </div>
                            <div class="questionChecklist">
                                <label>Validade</label>
                                <input type="date" class="date"></input>
                            </div>
                        </div>
                    </div>
                    <div class="titleBlock">                
                        <div class="titleFilter">     
                            <h1>Grupos Criados</h1>  
                            <button class="imgButton openCloseBlock openCloseBtnCss" data-function="openCloseFilter"  data-block="grupsCreatedBlock" type="button"></button>               
                        </div>
                        <div id="grupsCreatedBlock" class="bodyChecklist" style="display:none">
                            <div class="questionChecklist">
                                <select class="sel">
                                <option class="option" value="none" selected="" disabled="" hidden="">Opções</option>
                                </select>
                            </div>
                        </div>    
                    </div>
                    <div class="titleBlock">                
                        <div class="titleFilter">     
                            <h1>Tipo de relatório</h1>  
                            <button class="imgButton openCloseBlock openCloseBtnCss" data-function="openCloseFilter"  data-block="recordBlock" type="button"></button>               
                        </div>
                        <div id="recordBlock" class="bodyChecklist" style="display:none">
                            <div class="questionChecklist" >
                                <select class="sel">
                                <option class="option" value="none" selected="" disabled="" hidden="">Opções</option>
                                </select>
                            </div>
                        </div>  
                    </div>
                    <div class="titleBlock">                
                        <div class="titleFilter">     
                            <h1>Unidades</h1>  
                            <button class="imgButton openCloseBlock openCloseBtnCss" data-function="openCloseFilter"  data-block="unidGroupBlock" type="button"></button>               
                        </div>
                        <div id="unidGroupBlock" class="bodyChecklist" style="display:none">
                            <div class="questionChecklist">
                                <select class="sel">
                                <option class="option" value="none" selected="" disabled="" hidden="">Opções</option>
                                </select>
                            </div>
                        </div>      
                    </div>
                    <div class="titleBlock">                
                        <div class="titleFilter">     
                            <h1>Por data</h1>  
                            <button class="imgButton openCloseBlock openCloseBtnCss"  data-function="openCloseFilter" data-block="dateBlock" type="button"></button>               
                        </div>
                        <div id="dateBlock" class="bodyChecklist" style="display:none">
                            <div class="questionChecklist">
                                <label>Data inicial</label>
                                <input type="date" class="date"></input>
                            </div>
                            <div class="questionChecklist">
                            <label>Data final</label>
                            <input type="date" class="date"/>
                        </div>
                        </div>
                    </div>
                </section>
                <div class="buttonMain">
                    <button type="button" id="filterBtn" data-function="filterBtn">FILTRAR</button> 
                    <button type="button" id="clearBtn" data-function="clearBtn"> LIMPAR </button> 
                </div>
            </aside>

            <section id="sectionRecord">
                <div><h1>checklist</h1></div>
            </section>
        `
        return response;
    }
}
import { Record } from "../../Connection/Record.js";
import { SettingRecord } from "./settingRecord.js";

export class RecordPage extends SettingRecord {
    getRecord = new Record
    async main() {
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
                            <button class="imgButton openCloseBlock" data-block="checklistBlock" type="button"><img src="./assets/images/setaCima.svg"/></button>               
                        </div>                   
                        <div class="bodyChecklist" style="display:none" id="checklistBlock">
                            <div class="questionChecklist">
                                <label>Titulo das checkList</label>
                                <select>
                                    <option placeholder="Selecione a Checklist">Opções</option>
                                    <option>Uva</option>
                                    <option>Arroz</option>
                                </select>
                            </div>
                            <div class="questionChecklist">
                                <label>Titulo das Perguntas</label>
                                <select>
                                    <option>Opções</option>
                                    <option>Uva</option>
                                    <option>Arroz</option>
                                </select>
                            </div>
                            <div class="questionChecklist">
                                <label>Validade</label>
                                <select>
                                    <option>Opções</option>
                                    <option>Uva</option>
                                    <option>Arroz</option>
                                </select>
                            </div>
                            <div class="questionChecklist">
                                <label>Validade</label>
                                <select>
                                    <option>Opções</option>
                                    <option>Uva</option>
                                    <option>Arroz</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="titleBlock">                
                        <div class="titleFilter">     
                            <h1>Grupos Criados</h1>  
                            <button class="imgButton openCloseBlock" data-block="grupsCreatedBlock" type="button"><img src="./assets/images/setaCima.svg"/></button>               
                        </div>
                        <div id="grupsCreatedBlock" class="bodyChecklist" style="display:none">
                            <div class="questionChecklist">
                                <select>
                                    <option>Opções</option>
                                    <option>Uva</option>
                                    <option>Arroz</option>
                                </select>
                            </div>
                        </div>    
                    </div>
                    <div class="titleBlock">                
                        <div class="titleFilter">     
                            <h1>Tipo de relatório</h1>  
                            <button class="imgButton openCloseBlock" data-block="recordBlock" type="button"><img src="./assets/images/setaCima.svg"/></button>               
                        </div>
                        <div id="recordBlock" class="bodyChecklist" style="display:none">
                            <div class="questionChecklist" >
                                <select>
                                    <option>Opções</option>
                                    <option>Uva</option>
                                    <option>Arroz</option>
                                </select>
                            </div>
                        </div>  
                    </div>
                    <div class="titleBlock">                
                        <div class="titleFilter">     
                            <h1>Unidades Grupos Criados</h1>  
                            <button class="imgButton openCloseBlock" data-block="unidGroupBlock" type="button"><img src="./assets/images/setaCima.svg"/></button>               
                        </div>
                        <div id="unidGroupBlock" class="bodyChecklist" style="display:none">
                            <div class="questionChecklist">
                                <select>
                                    <option>Opções</option>
                                    <option>Uva</option>
                                    <option>Arroz</option>
                                </select>
                            </div>
                        </div>      
                    </div>
                    <div class="titleBlock">                
                        <div class="titleFilter">     
                            <h1>Por data</h1>  
                            <button class="imgButton openCloseBlock" data-block="dateBlock" type="button"><img src="./assets/images/setaCima.svg"/></button>               
                        </div>
                        <div id="dateBlock" class="bodyChecklist" style="display:none">
                            <div class="questionChecklist">
                                <label>Data inicial</label>
                                <input type="date"></input>
                            </div>
                            <div class="questionChecklist">
                            <label>Data final</label>
                            <input type="date"></input>
                        </div>
                        </div>
                    </div>
                </section>
                <div class="buttonMain">
                    <button type="button">FILTRAR</button> 
                    <button type="button">LIMPAR</button> 
                </div>
            </aside>

            <section id="sectionRecord">
                <div><h1>checklist</h1></div>
            </section>
        `
        return response;
    }


}
import { Record } from "../../Connection/Record.js";
import { SettingRecord } from "./settingRecord.js";

export class RecordPage extends SettingRecord {
    getRecord = new Record
    async main() {
        document.getElementById("message").setAttribute("style", "display:none");
        let response =
            `
            <aside>
                <div id="tituloPrincipal">
                    <h1>Filtra Checklist</h1>
                </div> 
                <section class="style_scroll" id="corpoAside">
                    <div class="tituloBloco">                
                        <div class="tituloFiltro">     
                            <h1>Checklist</h1>  
                            <button class="imgButton" type="button"><img src="./assets/images/setaCima.svg"/></button>               
                        </div>                   
                        <div id="bodyChecklist">
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
                    <div class="tituloBloco">                
                        <div class="tituloFiltro">     
                            <h1>Grupos Criados</h1>  
                            <button class="imgButton" type="button"><img src="./assets/images/setaCima.svg"/></button>               
                        </div>
                        <div id="bodyChecklist">
                            <div class="questionChecklist">
                                <select>
                                    <option>Opções</option>
                                    <option>Uva</option>
                                    <option>Arroz</option>
                                </select>
                            </div>
                        </div>    
                    </div>
                    <div class="tituloBloco">                
                        <div class="tituloFiltro">     
                            <h1>Tipo de relatório</h1>  
                            <button class="imgButton" type="button"><img src="./assets/images/setaCima.svg"/></button>               
                        </div>
                        <div id="bodyChecklist">
                            <div class="questionChecklist">
                                <select>
                                    <option>Opções</option>
                                    <option>Uva</option>
                                    <option>Arroz</option>
                                </select>
                            </div>
                        </div>  
                    </div>
                    <div class="tituloBloco">                
                        <div class="tituloFiltro">     
                            <h1>UnidadesGrupos Criados</h1>  
                            <button class="imgButton" type="button"><img src="./assets/images/setaCima.svg"/></button>               
                        </div>
                        <div id="bodyChecklist">
                            <div class="questionChecklist">
                                <select>
                                    <option>Opções</option>
                                    <option>Uva</option>
                                    <option>Arroz</option>
                                </select>
                            </div>
                        </div>      
                    </div>
                    <div class="tituloBloco">                
                        <div class="tituloFiltro">     
                            <h1>Por data</h1>  
                            <button class="imgButton" type="button"><img src="./assets/images/setaCima.svg"/></button>               
                        </div>
                        <div id="bodyChecklist">
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
                <div class="botaoPrincipal">
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
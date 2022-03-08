import { UsefulComponents } from "../Util/usefulComponents.js"
import { RecordObject } from "./objects/recordObject.js";

export class PrintRecord {
    async main(objectChecklist, arrayResponse, objectShop, objectUsers) {
        console.log("Objeto Checklist ->",objectChecklist,"Array Response ->", arrayResponse,"Objeto Shop ->", objectShop,"Objeto Users ->", objectUsers)
        console.log(`${arrayResponse[0][0].id}`)
        var win = window.open();
        
        localStorage.setItem('reponseJson', JSON.stringify(arrayResponse[0]))
        
        let useFulComponents = new UsefulComponents;
        let recordObject = new RecordObject;
        let response= "";
        arrayResponse.forEach(arrayResp=>{
        console.log(objectChecklist[arrayResp[0].id_checklist])
            
        response +=
            `<div id="record_${arrayResp[0].id}" class="divRecordPrint">
                <header>
                    <h1>${objectChecklist[arrayResp[0].id_checklist].getTitle().toUpperCase()}</h1>
                    <img src="./assets/images/fundoCLPPoficial.ico" title="logo CLPP"/>
                </header>
                <div id="subHeader">
                    <p>
                        <b>Usuário:</b> ${useFulComponents.splitStringName(objectUsers[arrayResp[0].id_user]["user"], " ")}
                    </p>
                    <p><b>Unidade:</b> ${objectShop[arrayResp[0].id_shop].description}</p>
                    <p><b>Data da Resposta:</b> ${useFulComponents.convertData(arrayResp[0].date, "-")}</p>
                    <p><b>Pontuação: </b>${recordObject.generalGraphic(recordObject.separateChecklist({ data: arrayResp }))[1][1]}%</p>                                          
                </div>
                ${this.printReport(objectChecklist[arrayResp[0].id_checklist].getQuestion(), arrayResp)}
            </div>
            <br/>
            `
        })
        let fileRecord = `
        <html>
            <head>
                <style type="text/css"></style> 
                <title>Deu certo</title>
                ${this.printStyle()}
            </head>  
                ${response}
                ${this.printScript(arrayResponse[0])}
        </html>
        `
        win.document.write(fileRecord);
        // this.printFile(response, arrayResponse);
        return response;
    }
    // printFile(response, arrayResponse) {
    //     let fileRecord = `
    //                     <html>
    //                         <head>
    //                             <style type="text/css"></style> 
    //                             <title>Deu certo</title>
    //                             ${this.printStyle()}
    //                         </head>  
    //                         ${response}
    //                         ${this.printScript(arrayResponse)}
    //                     </html>
    //                     `

    //     // var win = window.open("","","width=900,height=900");
    //     var win = window.open();
    //     win.document.write(fileRecord);
    //     win.document.close();
    //     // win.print();
    // }
    printScript() {
        return `
        <script>
            function selectOption(){
                let arrayResponse;
                localStorage.getItem('reponseJson') ? arrayResponse = JSON.parse(localStorage.getItem('reponseJson')) : "";
                arrayResponse.forEach(e=>{
                    if(document.querySelector('#option_'+e.id_option_question)){
                        document.querySelector('#option_'+e.id_option_question).setAttribute('style', e.type <= 2 ? 'color: black;font-weight: bold; background-color: #90EE9050;' : 'color: black;') 
                    }
                })
            }

            selectOption();
            document.querySelector(".photoResponse").style.transform = 'rotate(90deg)';
        </script>
        `
    }

    printReport(objectQuestions, arrayResponse) {
        let response = `
        <div id="dados">
            ${this.populateQuestion(objectQuestions, arrayResponse)}
        </div>
        `
        return response;
    }

    populateQuestion(objectQuestions, arrayResponse) {
        let cont = 0;
        return objectQuestions.map((question) => {
            let response = ""
            if (this.validationQuetions(question.id, arrayResponse)) {
                cont++;
                response += `
                <div id="question_${question.id}" class="questionRecord">
                    <header>
                        <h2>${cont} - ${question.description.toUpperCase()}</h2>
                    </header>
                    <section>
                        <div class="contentOption">
                            ${this.populateOptions(question)}
                        </div>
                        <aside class="photoObservation">
                            ${this.populateItensMandatory(question, arrayResponse)}
                            
                        </aside>
                    </section>
                </div>
                `}
            return response
        }).join("")
    }

    validationQuetions(idQuestion, arrayResponse) {
        let response = false;
        arrayResponse.forEach(responseID => {
            if (responseID.id_question == idQuestion) response = true;
        })
        return response;
    }

    populateOptions(question) {
        let response = "";
        Object.keys(question).forEach(key => {
            if (typeof question[key] == 'object') {
                response += `
                    <div id="option_${question[key].id}" >
                        ${this.selectInput(question.type, question[key])} 
                    </div>
                `;
            };
        });
        return response;
    }
    populateItensMandatory(question, arrayResponse) {
        let response = "";
        let stopInsert = 0;
        arrayResponse.forEach(resp => {
            if (question.id == resp.id_question) {
                if (resp.photo != null && resp.description == null) {
                    response += `
                                <div id="photoRecord">
                                    <img id="photoRecordImg" class="photoResponse" src = "http://192.168.0.99:71/GLOBAL/Controller/CLPP/uploads/${resp.photo}.png" title = "Foto" />
                                </div>
                                <div id="ObservationRecord">
                                    <img id="ObservationRecordImg" src = "./assets/images/observationRecord.png" title = "Observação"/>
                                </div>
                            `
                } else if (resp.description != null && resp.photo == null) {
                    response += `
                                <div id="photoRecord">
                                    <img id="photoRecordImg" src = "./assets/images/recordPhoto.png" title = "Foto"/>
                                </div>
                                <div id="ObservationRecord">
                                    <p>${resp.description}</p>
                                </div>
                            `
                } else if (resp.description != null && resp.photo != null) {
                    response += `
                                <div id="photoRecord">
                                    <img id="photoRecordImg" class="photoResponse" src = "http://192.168.0.99:71/GLOBAL/Controller/CLPP/uploads/${resp.photo}.png" title = "Foto" />
                                </div>
                                <div id="ObservationRecord">
                                    <p>${resp.description}</p>
                                </div>
                            `
                }
                else {
                    if (stopInsert == 0) {
                        response += `
                                <div id="photoRecord">
                                    <img id="photoRecordImg" src = "./assets/images/recordPhoto.png" title = "Foto"/>
                                </div>
                                <div id="ObservationRecord">
                                    <img id="ObservationRecordImg" src = "./assets/images/observationRecord.png" title = "Observação"/>
                                </div>
                            `
                    }
                    resp.type == '1' ? stopInsert++ : stopInsert = 0;
                }
            }
        })
        return response;
    }
    selectInput(typeOption, options) {
        let response;
        switch (typeOption) {
            case 1:
                response = `<label>${options.description.toUpperCase()}</label> `
                break;
            case 2:
                response = `<label>${options.description.toUpperCase()}</label>`
                break;
            case 3:
                response = `
                <div class="sectionQuestion">
                    <label>NOME: </label>
                    <input type="text" placeholder="Digite o Nome" disabled />
                    <label>CPF: </label>
                    <input type="text" placeholder="Digite o CPF" disabled />
                </div>
                `
                break;
            case 4:
                response = `
                <div class="sectionOption">
                    <input type = "text" placeholder = "Assine Aqui..." disabled /> <img src = "./assets/images/signature.svg" title = "Assinatura"/>
                </div>
                `
                break;
        }
        return response;
    }
    printStyle() {
        return `
            <style type="text/css">
                
                h1,h2{
                    margin:0px;
                }
                html{
                    height: 100vh;
                    width: 99vw;
                }
                body{
                    display: flex;
                    flex-direction: column;
                    align-items: center;  
                    background:#aaa;   
                    margin:0px;   
                    height:auto;   
                }
                .divRecordPrint{
                    display: flex;
                    flex-direction: column;
                    align-items: center;   
                    background:white;
                    width:790px;
                    height:auto;
                    min-height:100%;
                }
                .divRecordPrint header  {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    width: 100%;
                    border-bottom: 1px solid rgb(178,178,178);
                    min-height: 50px;
                }
                .divRecordPrint header img{
                    width:50px;
                }
                #subHeader{
                    display: flex;
                    align-items: center;
                    justify-content: space-around;
                    width: 100%;
                    height: 40%;
                    font-size: 17px;
                }
                #dados{
                    width:760px;
                    height:auto;
                }
                .questionRecord{
                    margin:5px;
                    padding:5px;
                    border-bottom: 1px solid rgb(178,178,178);
                }
                .divRecordPrint .questionRecord header{  
                    border-bottom:none;
                    background:none;
                    height: 50px;
                }
                .divRecordPrint .questionRecord section{
                    display: flex;
                    min-height: 60px;
                    font-size: 20px;
                }
                .divRecordPrint .questionRecord section input{ 
                    font-size: 18px;
                }
                .divRecordPrint header h1, .questionRecord h2{
                    margin-left:5px;
                }
            
                .sectionQuestion{
                    display: flex;
                    min-height: 80px;
                    flex-direction: column;
                    justify-content: center;
                }
                .contentOption{
                    width: 40%;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    color:#ccc;
                }
                .divRecordPrint .contentOption img{
                    bottom:0;
                    width:30px;
                    margin-left:5px;
                }
                .photoObservation{
                    display: flex;
                    min-height: 20px;
                    min-width: 20px;
                    width: 60%;
                }
                    
                .sectionOption{
                    display:flex;
                    align-items: center;
                }
                #photoRecord{
                    display: flex;
                    width: 50%;
                    align-items: center;
                    justify-content: center;
                    height: 100px;
                }
                #photoRecordImg, #observationRecordImg{
                    opacity: .1;
                }
                #observationRecord{
                    width:50%;
                    height:100px;
                }
                #photoRecord .photoResponse{
                    opacity: 1;             
                    height: 220px;
                    border: solid 1px rgb(178,178,178);
                    width: 100px;
                }
            </style>
        `
    }

}
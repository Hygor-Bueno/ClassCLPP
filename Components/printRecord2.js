export class PrintRecord2 {
    main(objectChecklist) {
        let response =
            `<html>
            <head>
                <style type="text/css"></style> 
                <title>Impressão simplificada</title>
                ${this.printStyle()}
            </head>  
            <div id="divRecordPrint">
                <header >
                    <h1>${objectChecklist.getTitle().toUpperCase()}</h1>
                    <img src="./assets/images/fundoCLPPoficial.ico" title="logo CLPP"/>
                </header>
                <div id="subHeader">
                </div>
                ${this.printReport(objectChecklist.getQuestion())}
            </div>
        </html> `

        console.log(objectChecklist)
        var win = window.open();
        win.document.write(response);
        win.document.close();
        win.print();
    }

    printStyle() {
        return `
            <style type="text/css">
                h1,h2{
                    margin:0px;
                }
                html{
                    height: 100vh;
                    width: 100vw;
                }
                body{
                    display: flex;
                    flex-direction: column;
                    align-items: center;  
                    background:#aaa;   
                    margin:0px;      
                }
                #divRecordPrint{
                    display: flex;
                    flex-direction: column;
                    align-items: center;   
                    background:white;
                    width:790px;
                    height:auto;
                    min-height:100%;
                }
                #divRecordPrint header  {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    width: 100%;
                    border-bottom: 1px solid rgb(178,178,178);
                    min-height: 45px;
                }
                #divRecordPrint img{
                    width:50px;
                }
                #dados{
                    width:760px;
                    height:auto;
                }
                .questionRecord{
                    margin:5px;
                    padding:5px;
                    border-bottom: 1px solid rgb(178,178,178)
                }
                #divRecordPrint .questionRecord header{  
                    border-bottom:none;
                    background:none;
                    height: 50px;
                }
                #divRecordPrint .questionRecord section{
                    display: flex;
                    min-height: 60px;
                    font-size: 20px;
                }
                #divRecordPrint .questionRecord section input{ 
                    font-size: 18px;
                }
                #divRecordPrint header h1, .questionRecord h2{
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
                    width:40%;
                }
                #divRecordPrint .contentOption img{
                    bottom:0;
                    width:30px;
                    margin-left:5px;
                }
                .photoObservation{
                   
                    min-height:20px;
                    min-width:20px;
                    width:60%;
                }
                .sectionOption{
                    display:flex;
                    align-items: center;
                }
            </style>
        `
    }

    printReport(objectQuestions) {
        console.log(objectQuestions)
        let response = `
        <div id="dados">
            ${this.populateQuestion(objectQuestions)}
        </div>
        `
        return response;
    }

    populateQuestion(objectQuestions) {
        console.log(objectQuestions)
        return objectQuestions.map((question) => (
            `
            <div id="question_${question.id}" class="questionRecord">
                <header>
                    <h2>${question.description.toUpperCase()}</h2>
                </header>
                <section>
                    ${this.populateShop(question)}    
                    <aside class="photoObservation">
                    </aside>
                </section >
            </div >
            `)).join("")
    }

    populateShop(question) {
        let response = "";
        return response +=
            `<div class="contentOption">

               <main><h3>Interlagos</h3>${this.populateOptions(question)}</main> 
               <main><h3>Taboão</h3>${this.populateOptions(question)}</main> 
            </div>`

    }

    populateOptions(question) {
        console.log(question)
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

    selectInput(typeOption, options) {
        let response;
        switch (typeOption) {
            case 1:
                response = `<input type = "checkbox" disabled /><label>${options.description.toUpperCase()}</label> `
                break;
            case 2:
                response = `<input type = "radio" disabled /> <label>${options.description.toUpperCase()}</label>`
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
}
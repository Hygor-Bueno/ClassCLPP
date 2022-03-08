export class PrintRecord2 {
    main(objectChecklist, resposta, shops) {
        console.log(resposta)
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
                ${this.printReport(objectChecklist.getQuestion(), resposta, shops)}
            </div>
        </html> `

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



    printReport(objectQuestions, resposta, shops) {
        let response = `
    <div id="dados">
        ${this.populateQuestion(objectQuestions, resposta, shops)}
    </div>
    `
        return response;
    }

    populateQuestion(objectQuestions, resposta, shops) {
        console.log(objectQuestions)
        return objectQuestions.map((question) => (
            `
        <div id="question_${question.id}" class="questionRecord">
            <header>
                <h2>${question.description}</h2>
            </header>
            <section>
                ${this.populateShop(objectQuestions, resposta, shops)}
                <aside class="photoObservation">
                </aside>
            </section >
        </div >
        `)).join("")
    }
    populateShop(objectQuestions, resposta, shops) {
        let response = "";
        let a = ""
        let unidade = ":´("
        resposta.forEach(question => {
            //console.log(question)
            question.forEach(loja => {

                console.log(loja)
                unidade = shops[loja.id_shop].description
            })

        })

        objectQuestions.forEach(question => {
            a = (question.op_1.description)
            response +=
                `<div class="contentOption">
                     <main>
                        <h3>${unidade}</h3>
                        ${a}
                    </main>
                    <main>
                        <h3>Interlagos</h3>
                        ${a}
                    </main>
                </div>`

        })




        console.log(a)
        return response;

    }
}
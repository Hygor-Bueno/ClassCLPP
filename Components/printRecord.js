export class PrintRecord {
    main(objectChecklist) {
        let response = `
        <html>
            <head>
                <style type="text/css"></style> 
                <title>Deu certo</title>
                ${this.printStyle()}
            </head>  
            <div id="divRecordPrint">
                <header >
                    <h1>${objectChecklist.getTitle()}</h1>
                </header>
                ${this.printReport(objectChecklist.getQuestion())}
            </div>
        </html>
        `
        var win = window.open();
        win.document.write(response);
        win.document.close();
        // win.print();
    }

    printStyle() {
        return `
        <style type="text/css">
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
            #divRecordPrint header {
                display: flex;
                justify-content: center;   
                width:100%;
                border-bottom: 1px solid rgb(178,178,178)
            }
            #dados{
                width:760px;
                height:auto;
                min-height:100%;
            }
            .questionRecord{
                border: 1px solid rgb(178,178,178)
            }

        </style>
        `
    }
    printReport(objectQuestions) {
        console.log()
        let response = `
        <div id="dados">
            ${this.populateQuestion(objectQuestions)}
        </div>
        `
        return response;
    }

    populateQuestion(objectQuestions) {
        return objectQuestions.map((question) => (
            `
            <div id="question_${question.id}" class="questionRecord">
                <header>
                    <h2>${question.description}</h2>
                </header>
                <section>
                    ${this.populateOptions(question)}
                </section >
            </div >
            `)).join("")
    }

    populateOptions(question) {
        let response = "";
        Object.keys(question).forEach(key => {
            if (typeof question[key] == 'object') {
                response += `
                    <div id="option_${question[key].id}">
                        ${this.selectInput(question.type, question[key])}
                    </div>
                `;
            };
        });
        return response;
    }
    selectInput(typeOption, options) {
        console.log(options)
        let response;
        console.log(typeOption)
        switch (typeOption) {
            case 1:
                response = `<input type = "checkbox" disabled /><label>${options.description}</label> `
                break;
            case 2:
                response = `<input type = "radio" disabled /> <label>${options.description}</label>`
                break;
            case 3:
                response = `<input type = "text" placeholder = "Assine Aqui..." disabled /> `
                break;
            case 4:
                response = `
                <label > nome:</label >
                <input type="text" placeholder="Digite o nome" disabled />
                <label>CPF:</label>
                <input type="text" placeholder="Digite o CPF" disabled />

                `
                break;
        }
        return response;
    }
}
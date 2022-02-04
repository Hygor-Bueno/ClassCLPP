export class modalReceivedMessage{
    main(object){
        return `
            <div id="notifyReceivedMessage">             
                <h1>Você recebeu uma mensagem de: </h1><br />
                <p><b>${object.name}</b></p>  
            </div>
        `
    }
}
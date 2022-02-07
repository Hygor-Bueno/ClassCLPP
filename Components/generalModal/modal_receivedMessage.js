import { ConnectionCLPP } from "../../Connection/ConnectionCLPP.js";
import { Routers } from "../../Routers/router.js";
import { UsefulComponents } from "../../Util/usefulComponents.js";

export class modalReceivedMessage{
    connectionCLPP = new ConnectionCLPP
    usefulComponents = new UsefulComponents;
    main(object){
        return `
            <div id="notifyReceivedMessage">             
                <h1>Você recebeu uma mensagem de: </h1><br />
                <p><b>${this.usefulComponents.splitStringName(object.name," ")}</b></p>  
            </div>
        `
    }
    async getDataUser(id){
        let response = await this.connectionCLPP.get(`&id=${id}`,"CCPP/Employee.php");
        return response.data[0]
    }
    settings(){
        document.getElementById("notifyReceivedMessage").addEventListener("click",() =>{
            let router = new Routers;
            router.routers("message")
        })
    }
}
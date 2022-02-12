import { ConnectionCLPP } from "../../Connection/ConnectionCLPP.js";
import { ClppGraphichObject } from "./clppGraphichObject.js";

export class RecordObject extends ConnectionCLPP {
    #id_user;
    #point;
    #date;
    #type;
    #description;
    #filters;
    clppGraphich = new ClppGraphichObject

   

    getId_user() {return this.#id_user}
    getPoint() {return this.#point}
    getDate() {return this.#date}
    getType() {return this.#type}
    getDescription() {return this.#description}
    getFilters() {return this.#filters}

    setId_user(id_user) {this.#id_user = id_user}
    setPoint(point) {this.#point = point}
    setDate(date) {this.#date = date}
    setType(type) {this.#type = type}
    setDescritpion(description) {this.#description = description}
    setFilters(filters) {this.#filters = filters}


    saveReport(){
        let json ={
            id_user: this.#id_user, 
            point: this.#point,
            date: this.#date,
            type: this.#type, 
            nome: this.#description,
            filters: this.#filters
        }
        console.log(json)
    } 
    separateChecklist(response) {
        let orderByChecklist = [];
        let assistent = this.getKeys(response);
        assistent.forEach(elemKey => {
            orderByChecklist.push(response.data.filter(element => { return elemKey[0] == element.id_user && elemKey[1] == element.date && elemKey[2] == element.id_checklist && elemKey[3] == element.id_shop }));
        })
        this.computePercent(orderByChecklist)
        return orderByChecklist;
    }
    getKeys(response) {
        let assistent = "";
        let check = ""
        let date = "";
        let filterKeys = [];
        response.data.forEach(element => {
            if ((element.id_user != assistent || element.id_checklist != check) || date != element.id_shop) {
                assistent = element.id_user;
                check = element.id_checklist;
                date = element.id_shop;
                filterKeys.push([element.id_user, element.date, element.id_checklist, element.id_shop])
            }
        })
        return filterKeys;
    }

    computePercent(responseChecklist) {       
        let question = 0
        let sum=0;
        let ignore=0;
        for (const allQuestion of responseChecklist) {   
            question += parseFloat(allQuestion[0].qtd_questions) 
            for (const options of allQuestion) {
                if(options.type <=2){
                    sum += parseFloat(options.value)
                }else{
                    ignore++;
                }
            }
        }
        
      return 100/(question-ignore) * sum
    }
}
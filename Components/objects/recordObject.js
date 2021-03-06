import { ConnectionCLPP } from "../../Connection/ConnectionCLPP.js";
import { UsefulComponents } from "../../Util/usefulComponents.js";
import { ClppGraphichObject } from "./clppGraphichObject.js";
const id = localStorage.getItem("id")

export class RecordObject extends ConnectionCLPP {
    #id_user;
    #point;
    #date;
    #type;
    #description;
    #filters;
    #jsonRecord;

    clppGraphich = new ClppGraphichObject;

    getId_user() { return this.#id_user }
    getPoint() { return this.#point }
    getDate() { return this.#date }
    getType() { return this.#type }
    getDescription() { return this.#description }
    getFilters() { return this.#filters }
    getJsonRecord() { return this.#jsonRecord }

    setId_user(id_user) { this.#id_user = id_user }
    setPoint(point) { this.#point = point }
    setDate(date) { this.#date = date }
    setType(type) { this.#type = type }
    setDescritpion(description) { this.#description = description }
    setFilters(filters) { this.#filters = filters }
    setJsonRecord(jsonRecord) { this.#jsonRecord = jsonRecord }

    saveReport() {
        this.#jsonRecord = {
            id_user: this.#id_user,
            point: this.#point,
            date: this.#date,
            type: this.#type,
            description: this.#description,
            filter: this.#filters
        }
    }

    async readyPost() {
        await this.post(this.#jsonRecord, "CLPP/Record.php", true)
    }

    getParamsForFilters() {
        let params = "";
        let getArray = [];
        let markShop = this.#filters['id_shops'].length || 1;
        let markTitle = this.#filters['checklist']['titles'].length || 1;
        let markQuestion = this.#filters.checklist.question.length || 1;

        for (let cnt = 0; cnt < markShop; cnt++) {
            for (let x = 0; x < markTitle; x++) {
                for (let y = 0; y < markQuestion; y++) {
                    Object.keys(this.#filters).forEach((keys, index) => {
                        if (index != 1) {
                            params += this.getInformation(keys, x, y)
                        } else {
                            if (this.#filters['id_shops'][cnt]) params += '&id_shop=' + this.#filters['id_shops'][cnt]
                        }
                    })
                    getArray.push(`&id_user=${id}` + params)
                    params = "";
                }
            }
        }
        return getArray
    }

    getInformation(keys, x, y) {
        let params = "";
        Object.keys(this.#filters[keys]).forEach(subKey => {
            if (this.#filters[keys][subKey] != "") {
                switch (subKey) {
                    case 'question':
                        params += '&id_question=' + this.#filters[keys][subKey][y]
                        break;
                    case 'date_init_response':
                        params += `&date_init_response="${this.#filters[keys][subKey]}"`
                        break;
                    case 'date_final_response':
                        params += `&date_final_response="${this.#filters[keys][subKey]}"`
                        break;
                    case 'titles':
                        params += '&id_checklist=' + this.#filters['checklist']['titles'][x]
                        break;
                }
            }
        })
        return params;
    }

    async returnGet(getArray) {
        let arrayResp = [];
        for await (let resp of getArray) {
            let array = await this.get(resp, "CLPP/Response.php")
            if (array) arrayResp = arrayResp.concat(array.data)
        }
        return { data: arrayResp };
    }
    organize(array,keys){
        let idEntity =[]
        let response = []
        let org = []
        org = array.sort((a,b) => a[keys] - b[keys])
        org.filter(a => {if(idEntity.indexOf(a[keys])<0) idEntity.push(a[keys])})
        idEntity.forEach(id => {
            let res = []
            org.forEach(element => {if(element[keys] == id) res.push(element)})
            response.push(res)
        })
        return response
    }
    separateChecklist(response) {
        let orderByChecklist = [];
        let assistent = this.getKeys(response);
        assistent.forEach(elemKey => {
            orderByChecklist.push(response.data.filter(element => {return elemKey[0] == element.id_user && elemKey[1] == element.date && elemKey[2] == element.id_checklist && elemKey[3] == element.id_shop }));
        })
        return orderByChecklist;
    }

    getKeys(response) {
        let assistent = [["", "", "",""]];
        let filterKeys = [];
        response.data.forEach(element => {
            if ((this.validateKeys([element.id_user, element.id_checklist, element.id_shop,element.date], assistent))) {
                assistent.push([element.id_user, element.id_checklist, element.id_shop,element.date]);
                filterKeys.push([element.id_user, element.date, element.id_checklist, element.id_shop])
            }
        })
        return filterKeys;
    }
    validateKeys(value, keys) {
        let controller = true;
        keys.forEach(key => {
            if (key[0] == value[0] && key[1] == value[1] && key[2] == value[2]  && key[3] == value[3]) {controller = false }
        })
        return controller;
    }
    generalGraphic(orderByChecklist) {
        let point = this.computePercent(orderByChecklist, 1)
        let dataSpecific = [["N??o Satisfat??rio", 100 - point], ["Satisfat??rio", point]]
        return dataSpecific
    }
    specificGraphic(orderByChecklist, objectChecklist, objectShops, specific) {
        let dataSpecific = this.getDataForGraphic(orderByChecklist, objectChecklist, objectShops, specific)
        dataSpecific.shift()
        return dataSpecific
    }
    getDataForGraphic(orderByChecklist, objectChecklist, objectShops, specific) {
        let response = []
        let aux = 0;
        orderByChecklist.forEach(checklist => {
            let description, percent;
            description = objectChecklist[checklist[0].id_checklist].getTitle().slice(0, 15) + " - " + objectShops[checklist[0].id_shop].description + this.formateDateGraph(checklist[0].date);
            percent = this.computePercent([checklist], specific || orderByChecklist.length)
            aux += percent
            response.push([description, percent])
        })
        response.unshift(["N??o Satisfat??rio", 100 - aux])
        return response;
    }
    formateDateGraph(date) {
        let usefulComponents = new UsefulComponents;
        let result = usefulComponents.splitString(date, "-")
        return " " + result[2] + "/" + result[1]
    }
    computePercent(responseChecklist, max) {
        let question = 0;
        let sum = 0;
        let ignore = 0;
        for (const allQuestion of responseChecklist) {
            question += parseFloat(allQuestion[0].qtd_questions);
            for (const options of allQuestion) {
                if (options.type <= 2) {
                    sum += parseFloat(options.value);
                } else {
                    ignore++;
                }
            }
        }
        console.log(question, ignore,sum)
        console.log((100 / (question + ignore) * sum).toFixed(2) / max)
        return (100 / (question - ignore) * sum).toFixed(2) / max
    }
}
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
            name: this.#description,
            filters: this.#filters
        }
    }


    getParamsForFilters() {
        let params = "";
        let getArray = [];
        let markShop = this.#filters['id_shops'].length || 1;
        let markTitle = this.#filters['checklist']['titles'].length || 1;
        let markQuestion = this.#filters.checklist.question.length || 1;

        for (let cnt = 0; cnt < markShop; cnt++) {
            for (let xxx = 0; xxx < markTitle; xxx++) {
                for (let y = 0; y < markQuestion; y++) {
                    Object.keys(this.#filters).forEach((keys, index) => {
                        if (index != 1) {
                            params += this.getInformation(keys, xxx, y)
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

    getInformation(keys, xxx, y) {
        let params = "";
        Object.keys(this.#filters[keys]).forEach(subKey => {
            if (this.#filters[keys][subKey] != "") {
                switch (subKey) {
                    case 'question':
                        params += '&id_question=' + this.#filters[keys][subKey][y]
                        break;
                    case 'date_init_response':
                        params += '&date_init_response=' + this.#filters[keys][subKey]
                        break;
                    case 'date_final_response':
                        params += '&date_final_response=' + this.#filters[keys][subKey]
                        break;
                    case 'titles':
                        params += '&id_checklist=' + this.#filters['checklist']['titles'][xxx]
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
        return {data: arrayResp};
    }

    separateChecklist(response) {
        let orderByChecklist = [];
        let assistent = this.getKeys(response);
        assistent.forEach(elemKey => {
            orderByChecklist.push(response.data.filter(element => { return elemKey[0] == element.id_user && elemKey[1] == element.date && elemKey[2] == element.id_checklist && elemKey[3] == element.id_shop }));
        })
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

    generalGraphic(orderByChecklist) {
        let point = this.computePercent(orderByChecklist, 1)
        let dataSpecific = [["Não Satisfatório", 100 - point], ["Satisfatório", point]]
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
            description = objectChecklist[checklist[0].id_checklist].getTitle().slice(0, 10) + " - " + objectShops[checklist[0].id_shop].description + this.formateDateGraph(checklist[0].date);

            percent = this.computePercent([checklist], specific || orderByChecklist.length)
            console.log(specific || orderByChecklist.length)

            aux += percent
            response.push([description, percent])
        })
        response.unshift(["Não Satisfatório", 100 - aux])
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
                    sum += parseFloat(options.value)
                } else {
                    ignore++;
                }
            }
        }
        return (100 / (question - ignore) * sum).toFixed(2) / max
    }
}
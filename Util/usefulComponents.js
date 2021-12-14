import { Validation } from "./validation.js";
var validation = new Validation();
export class UsefulComponents {
    
    splitString(stringToSplit, separator) {        
        try{
            if (validation.mandatoryMethods(stringToSplit, separator)) throw new Error('Atenção. Falha ao realizar a ação! São obrigatórios dois parâmentros para execução dos métodos "splitString" e "splitStringName". (Util/UsefulComponents)')
            return stringToSplit.split(separator);
        }catch(e) {
            console.error(e)
        }
    }

    splitStringName(stringToSplit, separator) {
        var arrayOfStrings = this.splitString(stringToSplit, separator)
        if (arrayOfStrings.length - 1 == 0) {
            arrayOfStrings.push(separator)
        }
        return arrayOfStrings[0] + " " + arrayOfStrings[arrayOfStrings.length - 1]
    }
    createObject(values) {
        let response = {}
        for (let index = 0; index < values.length; index++) {
            response[values[index][0]] = values[index][1]
        }
        return response
    }

    convertObjForArray(obj){
        let response=[],key;
        key = Object.keys(obj)
        key.forEach(valor => {response.push(obj[valor])})
        return response
    }
}
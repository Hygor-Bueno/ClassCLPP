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

    checkField(local){
        let valid = true;

        for(let field of this.formular.querySelectorAll(local)){
            const label = field.previousElementSibling.innerText;
            if(!field.value){
                this.createError(field, `Campo ${label} não pode estar em branco.`)
                valid = false;
            }
        }
    }
    createError(field,msg){
        const div = document.createElement('div')
        div.innerHTML = msg;
        div.classList.add('error-text')
        field.insertAdjacentElement('afterend', div)
    }
}


    convertObjForArray(obj){
        let response=[],key;
        key = Object.keys(obj)
        key.forEach(valor => {response.push(obj[valor])})
        return response
    }
}


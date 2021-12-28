export class Validation{
    maxLength(value,size){
        let response=true
        if(!value || value.length > size){response=false;}
        return response;
    }
    minLength(value,size){
        return !this.maxLength(value,size)
    }
    equalsString(firstValue,secondValue){
        let response=true;
        if(firstValue !== secondValue){response=false;}
        return response;
    }
    mandatoryMethods(...mothods){
        let response = false;
        for (const iterator of mothods) {
            if(iterator == undefined) response = true
        }
        return response;
    }
    requiredFields(local){
        let response, array;
        response = true;
        array = document.querySelectorAll(`${local}`)
        array.forEach(element => {
            if(element.value == ""){
                response = false;
            }
        });
        return response;
    }

    multipleInputMaxLength(local,maxLength) {
        let array = document.querySelectorAll(local);
        let response = true;
        array.forEach(element => {
            if(element.value){
                if(element.value.length < maxLength) {response =false}
            }
        });
        return response;
    }

    multipleValidation(methods){ 
        let response = true;
        let message="Atenção ";
        methods.forEach((element,index) => {
            if(!element[0](...element[1])){
                message += (index+1) + " - "+element[2];
                console.log(message)
                response = false
            } 
        });
        return {error:response,data:message};
    }
}
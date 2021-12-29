export class Validation{
    maxLength(value,size){
        let response=true
        if(value){
            if(value.length > size){response=false;}
        }
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
    validationDataInicialFinal(dates){
        console.log(dates)
        let response = true;
        if(dates[0].value > dates[1].value) response=false; 
        if(dates[0].value != "" || dates[1].value != ""){
            dates.forEach(element => {
                if(element.value == ""){
                    response = false;
                }
            });
        }
        return response;
    }
    multipleInputMaxLength(local,maxLength) {
        let array = document.querySelectorAll(local);
        let response = true;
        array.forEach(element => {
            if(element.value){
                console.log(element.value.length + " <------",maxLength)
                if(element.value.length > maxLength) {response =false}
            }
        });
        return response;
    }

    multipleValidation(methods){ 
        let response = true;
        let message="";
        let cont=0
        methods.forEach((element) => {
            if(!element[0](...element[1])){
                message += (cont+=1) + " - "+element[2];
                console.log(message)
                response = false
            } 
        });
        return {error:response,data:message};
    }
}
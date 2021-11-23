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
}
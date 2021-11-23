import { ErrorHandling } from "../Util/errorHandling.js";
export class UserAccess{
    errorHandling = new ErrorHandling();
    async get(params,err){
        typeof params === "string" || typeof params === "object" ? params : err = params;
        let URL = localStorage.getItem('server') + '/Controller/CCPP/UserAccess.php?app_id=7&AUTH=' + localStorage.getItem('token')
        let req
        await fetch(URL+params)
            .then(response => response.json())
            .then(body =>{
                if (body.error) throw new Error(body.message);
                req = body
            })
            .catch(erro =>{
                if(err) this.errorHandling.main(erro)
            })
        return req;
    } 
}
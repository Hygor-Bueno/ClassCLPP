import { ErrorHandling } from "../Util/errorHandling.js";
var errorHandling = new ErrorHandling();
export class UserAccess{
    async get(param){
        let URL = localStorage.getItem('server') + '/Controller/CCPP/UserAccess.php?app_id=7&AUTH=' + localStorage.getItem('token')
        let req
        await fetch(URL+param)
            .then(response => response.json())
            .then(body =>{
                if (body.error) throw new Error(body.message);
                req = body
            })
            .catch(erro =>{
                errorHandling.main(erro)
            })
        return req;
    } 
}
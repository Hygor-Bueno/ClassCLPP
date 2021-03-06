import { ErrorHandling } from "../Util/errorHandling.js";
import { EmployeePhoto } from "./EmployeePhoto.js"

export class Employee extends EmployeePhoto{
    async get(params, err){       
        typeof params === "string" || typeof params === "object" ? params : err = params;
        let URL = localStorage.getItem("server") + "/Controller/CCPP/Employee.php?app_id=7&AUTH=" + localStorage.getItem("token")+ params;
        let req 
        await fetch(URL, {
            method: "GET"
        }).then(response => response.json()).then(async (body) => {
            if (body.error) throw new Error(body.message)
            req= body.data[0]
            req.photo = await this.getPhoto(params)
        }).catch(erro => {
            let errorHandling = new ErrorHandling()
            if(err) errorHandling.main(erro.message)
        })
        return req
    }
}
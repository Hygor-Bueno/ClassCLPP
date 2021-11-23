import { ErrorHandling } from "../Util/errorHandling.js";
import { EmployeePhoto } from "./EmployeePhoto.js"

export class Employee extends EmployeePhoto{
    async get(params=""){     
        let URL = localStorage.getItem("server") + "/Controller/CCPP/Employee.php?app_id=7&AUTH=" + localStorage.getItem("token")+ "&id=" + localStorage.getItem("id");
        let req 
        await fetch(URL+params, {
            method: "GET"
        }).then(response => response.json()).then(async (body) => {
            if (body.error) throw new Error(body.message)
            req= body.data[0]
            req.photo = await this.getPhoto("&id=" + localStorage.getItem("id"))
        }).catch(erro => {
            let filter = new ErrorHandling()
            filter.main(erro.message)
        })
        return req
    }
}
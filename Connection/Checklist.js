import { ErrorHandling } from "../Util/errorHandling.js";

export class Checklist {
    errorHandling = new ErrorHandling()
    async get(params) {
        let URL = localStorage.getItem('server') + '/Controller/CLPP/Checklist.php?app_id=7&AUTH=' + localStorage.getItem('token')
        let response
        await fetch(URL + params)
            .then(response => response.json())
            .then(body => {
                if (body.error) throw new Error(body.message)
                response = body.data
            }).catch(erro => {
                this.errorHandling.main(erro)
            })
        return response
    }
}

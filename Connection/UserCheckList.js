import { ErrorHandling } from "../Util/errorHandling.js";

export class UserCheckList {
    errorHandling = new ErrorHandling()
    URL
    async get(params,err) {
        typeof params === "string" || typeof params === "object" ? params : err = params;
        this.settingUrl('/Controller/CLPP/UserCheckList.php?app_id=7&AUTH=',params)
        let response
        console.log(this.URL)
        await fetch(this.URL + params)
            .then(response => response.json())
            .then(body => {
                if (body.error) throw new Error(body.message)
                response = body.data
            }).catch(erro => {
                if(err) this.errorHandling.main(erro)
            })
        return response
    }
    settingUrl(middlewer, params) {
        let server = localStorage.getItem('server');
        let token = localStorage.getItem('token');
        this.URL = server + middlewer + token + params
    }
}
import { ErrorHandling } from "../Util/errorHandling.js";
export class Question{
    errorHandling = new ErrorHandling
    URL
    async get(params,err) {
        typeof params === "string" || typeof params === "object" ? params : err = params;
        this.settingUrl('/Controller/CLPP/Question.php?app_id=7&AUTH=',params)
        let response
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
    async post(params,err) {
        typeof params === "string" || typeof params === "object" ? params : err = params;
        this.settingUrl('/Controller/CLPP/Question.php?app_id=7&AUTH=')
        let req
        await fetch(this.URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(params)
        })
            .then(response => response.json())
            .then(body => {
                if (body.error) throw Error(body.message)
                req = body.last_id
            }).catch(error => { console.log(error); if (err) this.errorHandling.main(error) })
        return req;
    }
    settingUrl(middlewer, params) {
        let server = localStorage.getItem('server');
        let token = localStorage.getItem('token');
        this.URL = server + middlewer + token + (params ? params : "")
    }
}
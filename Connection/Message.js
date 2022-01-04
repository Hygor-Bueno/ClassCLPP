import { ErrorHandling } from "../Util/errorHandling.js";
var errorHandling = new ErrorHandling();

export class Message {
    URL;
    async get(params, err) {
        typeof params === "string" || typeof params === "object" ? params : err = params;
        this.settingUrl('/Controller/CLPP/Message.php?app_id=7&AUTH=', params)
        let req;
        console.log(this.URL)
        await fetch(this.URL)
                .then(response => response.json())
                .then(body => {
                    if (body.error) throw new Error(body.message)
                    req = body.data
                })
                .catch(erro => {
                    console.log(erro)
                    if (err) errorHandling.main(erro)
                })     
        return req;
    }
    async post(params, err) {
        typeof params === "string" || typeof params === "object" ? params=params : err = params;
        let req
        this.settingUrl('/Controller/CLPP/Message.php?app_id=7&AUTH=');
        await fetch(this.URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(params)
        })
            .then(response => response.json())
            .then(body => {
                if (body.error) throw Error(body.message)
                req = body;
            }).catch(error => { console.log(error); if (err) errorHandling.main(error) })
        return req;
    }
    settingUrl(middlewer, params) {
        if(!params) params = ""
        let server = localStorage.getItem('server');
        let token = localStorage.getItem('token');
        this.URL = server + middlewer + token + params
    }
}
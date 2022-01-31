import { ErrorHandling } from "../Util/errorHandling.js";

export class ConnectionCLPP {
    errorHandling = new ErrorHandling;
    URL;
    params;
    pathFile;
    err;
    async get(params, pathFile, err) {
        this.validationParams(params, pathFile, err);
        this.settingUrl(`/Controller/${this.pathFile}?app_id=7&AUTH=`, params)
        let req;
        await fetch(this.URL)
            .then(response => response.json())
            .then(body => {
                if (body.error) throw new Error(body.message)
                req = body;
            }).catch(erro => {
                console.error(erro, this.err)
                if (this.err) this.errorHandling.main(erro)
            })
        this.cleanParams();
        return req;
    }
    async post(params, pathFile, err) {
        this.validationParams(params, pathFile, err);
        this.settingUrl(`/Controller/${this.pathFile}?app_id=7&AUTH=`)
        let req
        console.log(this.URL)
        await fetch(this.URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(this.params)
        })
            .then(response => response.json())
            .then(body => {
                if (body.error) throw Error(body.message)
                req = body;
            }).catch(error => { console.log(error); if (this.err) this.errorHandling.main(error) })
        this.cleanParams();
        return req;
    }
    async put(params, pathFile, err) {
        this.validationParams(params, pathFile, err);
        this.settingUrl(`/Controller/${this.pathFile}?app_id=7&AUTH=`)
        let req
        await fetch(this.URL, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(this.params)
        })
            .then(response => response.json())
            .then(body => {
                if (body.error) throw Error(body.message)
                req = body;
                console.log(req)
            }).catch(error => { console.log(error); if (this.err) this.errorHandling.main(error) })
        this.cleanParams();
        return req;
    }
    async delete(params, pathFile, err) {
        this.validationParams(params, pathFile, err);
        this.settingUrl(`/Controller/${this.pathFile}?app_id=7&AUTH=`);
        let req;
        await fetch(this.URL, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(this.params)
        })
            .then((response) => response.json())
            .then((body) => {
                if (body.error) throw Error(body.message);
                console.log(body)
                req = body;
            })
            .catch((error) => {
                console.log(error, this.params);
                if (this.err) this.errorHandling.main(error);
            });
        this.cleanParams();
        return req;
    }
    validationParams(params, pathFile, err) {
        if (params) this.params = params;
        if (pathFile) this.pathFile = pathFile;
        if (err) this.err = err;
    }
    cleanParams() {
        this.params = "";
        this.pathFile = "";
        this.err = "";
    }
    settingUrl(middlewer, params) {
        let server = localStorage.getItem('server');
        let token = localStorage.getItem('token');
        this.URL = server + middlewer + token + (params ? params : "")
    }
}

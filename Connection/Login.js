import { ErrorHandling } from "../Util/errorHandling.js";

export class Login{
    errorHandling = new ErrorHandling()
    async post(params,err) {
        typeof params === "string" || typeof params === "object" ? params : err = params;
        let response
        await fetch("http://192.168.0.99:71/GLOBAL/Controller/CCPP/Login.php?login=&app_id=7", {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(params)
        }).then(response => response.json()).then( (body) => {
            if (body.error) throw new Error(body.message);
            this.localStorageConfig(body.data);
            response = body
        }).catch(erro => {
            if(err) this.errorHandling.main(erro.message)
        })
        return response
    }

    put(params,err){
        typeof params === "string" || typeof params === "object" ? params : err = params;
        let response
        fetch("http://192.168.0.99:71/GLOBAL/Controller/CCPP/Login.php?login=&app_id=7", {
            method: 'PUT',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(params)
        }).then(response => response.json()).then((body) => {
            if (body.error) throw new Error(body.message);
            response = body
        }).catch(erro => {
            if(err) this.errorHandling.main(erro.message)
        })
        return response
    }
    
    localStorageConfig(data) { 
            localStorage.clear();
            localStorage.setItem('token', data.session);
            localStorage.setItem('id', data.id);
            localStorage.setItem('server', "http://192.168.0.99:71/GLOBAL")
    }
}
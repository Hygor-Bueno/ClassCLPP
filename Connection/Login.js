import { ErrorHandling } from "../Util/errorHandling.js";

export class Login{
    filter = new ErrorHandling()
    async post(objectUser) {
        let response
        await fetch("http://192.168.0.99:71/GLOBAL/Controller/CCPP/Login.php?login=&app_id=7", {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(objectUser)
        }).then(response => response.json()).then( (body) => {
            if (body.error) throw new Error(body.message);
            this.localStorageConfig(body.data);
            response = body
        }).catch(erro => {
            this.filter.main(erro.message)
        })
        return response
    }

    put(objectUser){
        let response
        fetch("http://192.168.0.99:71/GLOBAL/Controller/CCPP/Login.php?login=&app_id=7", {
            method: 'PUT',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(objectUser)
        }).then(response => response.json()).then((body) => {
            if (body.error) throw new Error(body.message);
            response = body
        }).catch(erro => {
            this.filter.main(erro.message)
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
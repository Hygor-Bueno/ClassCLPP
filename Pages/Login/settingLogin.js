import { Template } from "../../Components/template.js";
import { Login } from "../../Connection/Login.js";

export class SettingLogin {
    async buttonLogin() {
        document.querySelector(".login__submit").addEventListener('click', async () => {
            let loginUser = {}

            loginUser.user = document.getElementById('userLogin').value            
            loginUser.password = document.getElementById('userPassword').value

            let login = new Login();
            let req = await login.post(loginUser,true)
            
            if (req && !req.error){
                localStorage.setItem('router','home')
                let principal = new Template()
                await principal.main()
            } 
        })
    }
}
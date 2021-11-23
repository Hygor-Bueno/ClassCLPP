import { SettingLogin } from "./settingLogin.js";

export class LoginPage extends SettingLogin{
    main() {
        document.getElementById('StylePages').setAttribute('href','./Pages/Login/login.css')
        const response =
        `<main class="login">
            <div class="login__container">
                <h1 class="login__title2">CheckList PegPese</h1>
                <h1 class="login__title">Login</h1>
                <div class="login__form">

                    <input class="login__input" id="userLogin" type="text" placeholder="Usuário">
                    <span class="login__input-border"></span>

                    <input class="login__input" id="userPassword" type="password" placeholder="Senha">
                    <span class="login__input-border"></span>

                    <button class="login__submit">Entrar</button>

                </div>
                <img class='logoPPG' src='assets/images/logoPPG.png' title="Logo Peg Pese" />
            </div>

            <div class="divisor"></div>
            <div class="logo_lef">
                <img class='logoE' src='assets/images/logoE.png' title="Logo CheckList Peg Pese" />
            </div>
        </main>
       `
        return response;
    }
}
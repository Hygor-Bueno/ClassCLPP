export class PassDefault {
    template() {
        document.getElementById("StyleModal").setAttribute('href', "./Components/passwordDefault/modal_PassDefault.css")
        let response = `
     
            <div class="modal_newPass">
                <header>
                    <img title="Senha" src="assets/images/password.svg"/>
                    <h2>Redefinir Senha</h2>
                </header>
                <div class="new">
                    <label>Digite a nova senha: </label>
                    <input placeholder="New Password" type="password" id="newPass" minlength="8" />
                </div>
                <div class="confirm">
                    <label>Confirme a senha:</label>
                    <input placeholder="Confirm Password" type="password" id="passConfirm" minlength="8" />
                </div>
                <button id="salve">Salvar</button>
            </div>
        
        `
        return response
    }
    validatorPassword() {
        let controller = true;
        let password = document.getElementById('newPass').value;
        let confirm = document.getElementById('passConfirm').value;

        if ((password != confirm) || (password.length < 8) || (password == "") || (confirm == "")) {
            alert(' Atenção! \n 1 - A senha possui um limite mínimo de 8 caracteres. \n 2 - Os dois campos devem ser Preenchidos \n 3 - Os dois campos devem ser iguais.')
            controller = false
        }

        return controller
    }
}
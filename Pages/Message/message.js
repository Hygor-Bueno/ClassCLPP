import { SettingMessage } from "./settingMessage.js";

export class MessagePage extends SettingMessage{
    
    main(){
        document.getElementById('message').setAttribute('style', 'display:none'); 
        let response = 
        `
        <div class="containerMsg">
            <div class="part1">
                <header class="searchHead"></header>
                <div class="user_in"></div>
            </div>
            <div class="part2">
                <header class="colabHead">
                </header>
                <div class="msg_in">
                    <div class="msg_out">
                    </div>
                    <footer class="footSend">
                        <textarea name="mensagem" id="msg_write" placeholder="Digite sua mensagem" cols="100" rows="1"></textarea>
                    </footer>
                </div>
            </div>
        </div>       
        `
        return response;
    }
}
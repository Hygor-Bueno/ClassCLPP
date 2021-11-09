import { EmployeePhoto } from "../Connection/EmployeePhoto.js";
import { Routers } from "../Routers/router.js";
import { BodyCLPP } from "./body.js";
import { HeaderCLPP } from "./header.js";

export class Template {
    pagesRouter = new Routers();
    header = new HeaderCLPP();
    body = new BodyCLPP();
    photo = new EmployeePhoto;

    async main() {
        document.querySelector('body').innerHTML = "";
        const photoUser = await this.photo.getPhoto("&id=" + localStorage.getItem("id"));
        if(photoUser){
            document.querySelector('body').insertAdjacentHTML("beforeend", this.header.template(photoUser.src))
            this.header.setting()            
            document.querySelector('body').insertAdjacentHTML("beforeend", this.body.template())
            this.pagesRouter.routers(localStorage.getItem('router'))
        }
    }
}
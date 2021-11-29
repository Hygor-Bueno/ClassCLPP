import { convertBase64 } from "../Util/convertBase64.js";
export class EmployeePhoto {
    toConvert = new convertBase64()
    async getPhoto(params) {
        // typeof params === "string" || typeof params === "object" ? params : err = params;
        let photoURL = localStorage.getItem("server") + "/Controller/CCPP/EmployeePhoto.php?app_id=7&AUTH=" + localStorage.getItem("token") + params
        let response
        await fetch(photoURL)
            .then(response => response.json())
            .then(body => {
                if (body.error) throw new Error(body.error);
                response = body.photo;
            })
            .catch(erro => {
                console.log(erro)
            })
        return this.toConvert.convert(response);
    }
}
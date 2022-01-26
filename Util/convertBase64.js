export class convertBase64{
    photo;
    constructor(photo){
        this.photo = photo
    }
    convert(photoLogin) {
        let response;
        let src = "data:image/jpeg;base64,"
        src += photoLogin;
        if (photoLogin) {
            let image = document.createElement('img');
            image.src = src;
            response = image;
        } else {
            let imgVazia = document.createElement('img');
            imgVazia.src = "./assets/images/user.png";
            response = imgVazia;
        }
        return response;
    }
}
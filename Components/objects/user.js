import { Employee } from "../../Connection/Employee.js";
import { UsefulComponents } from "../../Util/usefulComponents.js";


export class Users {
    #id;
    #name;
    #photo;
    #notification;
    #group;
    
    async populate(id){
        this.#id = id;
        let employee = new Employee();  
        let usefulComponents = new UsefulComponents();      
        let object = await employee.get("&id=" + this.#id,true);
        this.#id = object.id;
        this.#name = usefulComponents.splitStringName(object.name, " ");
        this.#photo = object.photo;
    }

    userInner(objUser){
        this.setName(objUser.description);
        this.setPhoto(objUser.photo);
        this.#notification = parseInt(objUser.notification)
        if(objUser.id_user){
            this.#id = objUser.id_user
            this.#group =false;
        }else{
            this.#id = objUser.id_group
            this.#group =true;
        }
    }
    classObj(){
        return {
            notification:this.#notification,
            [this.#group? 'id_group':'id_user']:this.#id,
            photo:this.#photo,
            description:this.#name
        }
    }
    setObj(object){
        this.#id = object.id_user || object.id_group;
        this.#name = object.description;
        this.#photo = object.photo;
        this.#notification = object.notification;
        this.#group = object.id_group ? true:false;
    }
    getId_user() {return this.#id;}
    getName() {return this.#name;}
    getPhoto() {return this.#photo;}
    getNotification() {return this.#notification;}
    getgroup() {return this.group}

    setId_user(id) {this.#id = id}
    setName(name) {this.#name = name}
    setPhoto(photo) {this.#photo = photo}
    setNotification(notification) {this.#notification = notification}
}
import { Employee } from "../../Connection/Employee.js";
import { UsefulComponents } from "../../Util/usefulComponents.js";


export class Users {
    #id_user;
    #name;
    #photo;
    #notification;
    
    constructor(id){
        this.id_user = id;  
        this.populate()     
    }

    async populate(){
        let employee = new Employee();  
        let usefulComponents = new UsefulComponents();      
        let object = await employee.get("&id=" + this.id_user,true);
        this.id_user = object.id;
        this.name = usefulComponents.splitStringName(object.name, " ");
        this.photo = object.photo;
    }
    getId_user() { return this.id_user; }
    getName() { return this.name; }
    getPhoto() { return this.photo; }
    getNotification() { return this.notification; }

    setId_user(id) { this.id_user = id}
    setName(name) { this.name = name}
    setPhoto(photo) { this.photo = photo}
    setNotification(notification) { this.notification = notification}
}
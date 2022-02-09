import { ConnectionCLPP } from "../../Connection/ConnectionCLPP.js";

export class GroupMessage extends ConnectionCLPP {
    #id_user;
    #id_checklist;
    #id_group;
    #description;
    #id_creator;

    constructor (id_creator){ 
        super()
        this.#id_creator = id_creator;
    }
    async main(nameGroup){
        let req = await this.get('&id_group=','CLPP/Group.php',true);
        this.#id_group = req.data[0].last_id;
        this.#description = nameGroup;
    }
    addUsers(array){
        this.#id_user = array;
    }
    saveGroup(idUser){        
        let response = {
            id_user: idUser,
            id_group: this.#id_group,
            description: this.#description,
            id_creator: this.#id_creator
        }
        this.post(response,'CLPP/Group.php')
    }
    saveGroupAll(){
        this.saveGroup(this.#id_creator)
        this.#id_user.forEach(value =>this.saveGroup(value))
        this.#id_user = [];
    }
}
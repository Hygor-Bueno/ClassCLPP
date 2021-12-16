import { Checklist } from "../../../Connection/Checklist.js";
import { SettingChecklist } from "../ChecklistCriated/settingChecklist.js";

export class ChecklistCreatedPage extends SettingChecklist{
  getChecklist = new Checklist();
  checklists;
   async main() {
    document.getElementById("message").setAttribute("style", "display:none");
    this.checklists =  await this.getChecklist.get('&web&id_user=' + localStorage.getItem('id'))
    
    let response = `

      <form id="form">
          <div  id="inputCheck">
              <input type="text" placeholder="Digite aqui o nome da sua checklist" id="inputCheckList"/>
          </div>
          <div id="date">
              <p>Data Inicial:</p>
              <input type="date" id="dateInit"/>
              <p>Data Final:</p>
              <input type="date" id="dateFinal"/>
          </div>
          <div id="search">
              <img id="searchName" src="./assets/images/Search.svg">
          </div>
      </form> 
       
      <section id="getCheckList">
          ${await this.getCheckListCreted(this.checklists)}
      </section>
        `;
    return response;
  }
}

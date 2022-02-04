import { Checklist } from "../../../Connection/Checklist.js";
import { SettingChecklist } from "../ChecklistCriated/settingChecklist.js";

export class ChecklistCreatedPage extends SettingChecklist {
  getChecklist = new Checklist();
  async main(checklists) {
    document.getElementById("message").setAttribute("style", "display:none");
    let response = `
    <nav id="nav">
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
          <button type="button" id="testandoModalMenssage">T</button>
          <div id="search">
              <img id="searchName" src="./assets/images/Search.svg">
          </div>
      </form> 
    </nav>         
      <section id="getCheckList">
          ${await this.getCheckListCreted(checklists)}
      </section>
        `;
    return response;
  }
  async arrayCheckList() {
    return await this.getChecklist.get('&web&id_user=' + localStorage.getItem('id'))
  }
  
}

import { Checklist } from "../../../Connection/Checklist.js";
import { UsefulComponents } from "../../../Util/usefulComponents.js";

export class ChecklistCreatedPage {
  getChecklist = new Checklist();

   async main() {
    document.getElementById("message").setAttribute("style", "display:none");
    let response = `


      <form id="form">
          <div  id="inputCheck">
              <input type="text" placeholder="Digite aqui o nome da sua checklist" id="inputCheckkList"/>
          </div>
          <div id="date">
              <p>Data Inicial:</p>
              <input type="date" />
          
              <p>Data Final:</p>
              <input type="date" />
          </div>
          <div id="search">
              <img class="searchName" src="./assets/images/Search.svg">
          </div>
      </form> 
       
      <section id="getCheckList">
          ${await this.getCheckListCreted()}
      </section>
        `;
    return response;
  }
  async getCheckListCreted(){  
    let userful = new UsefulComponents;
    let checklists =   await this.getChecklist.get('&web&id_user=' + localStorage.getItem('id'))
    console.log(checklists)
    let response = checklists.map((checklist) => (
      `
    <div id="checklist">

    <div>
      <h1>${checklist.description}</h1> 
    </div>

    <div>
      <img src="${checklist.notification == 0? `assets/images/alertNotify.svg` : `assets/images/alertNotifyOn.svg`}"/>
    </div>

    <div id="date">
      <p>Data Inicial: ${checklist.date_init != null ? userful.convertData(checklist.date_init, "-") :"Não possuí validade"}</p>
      <p>Data Final: 14/12/2021</p>
    </div>

    <div>
      <img src="./assets/images/person_black_24dp.svg"/>
      <img src="./assets/images/olho.svg"/>
      <img src="./assets/images/delete.svg"/>
    </div>

</div>
`)).join("")
    
    

    return response
  }
}

import { Checklist } from "../../../Connection/Checklist.js";

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
    let checklists =   await this.getChecklist.get('&web&id_user=' + localStorage.getItem('id'))
    let response = `
          <div id="checklist">

          <div>
            <h1>${checklists[0].description}</h1> 
          </div>

          <div>
            <img src=${checklists[0].notification == 0? "./assets/images/alertNotify.svg" : "./assets/images/alertNotifyOn.svg"}/>
          </div>

          <div id="date">
            <p>Data Inicial: 10/11/2021</p>
            <p>Data Final: 14/12/2021</p>
          </div>

          <div>
            <img src="./assets/images/person_black_24dp.svg"/>
            <img src="./assets/images/olho.svg"/>
            <img src="./assets/images/delete.svg"/>
          </div>

      </div>
    `

    return response
  }
}

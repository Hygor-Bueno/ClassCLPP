import { ChecklistCreatedPage } from "./checklist.js";
import { getB_id, $ } from "../../../Util/compressSyntaxe.js";
import { Checklist } from "../../../Connection/Checklist.js";
import { UsefulComponents } from "../../../Util/usefulComponents.js";

export class SettingChecklist {
  searchCheck;
  searchDateInit;
  searchDateFinal;
  checklist = new Checklist();

  setting() {
    this.queryButton();
  }

  queryButton() {
    let searchCheck;
    getB_id("searchName").addEventListener("click", async () => {
        this.searchCheck = $("#inputCheckList").value;
        this.searchDateInit = $("#dateInit").value || "";
        this.searchDateFinal = $("#dateFinal").value || "";
        searchCheck = await this.checklist.get(  "&web&check_name=" +    this.searchCheck +    "&date_ini=" +    this.searchDateInit +    "&date_final=" +    this.searchDateFinal +    "&id_user=" + localStorage.getItem("id"), true)
        this.clean();
        this.popIclude(searchCheck);
    });
    }
  clean(){
    getB_id('getCheckList').innerHTML = "";
  }

  popIclude(objectCheck){
    getB_id('getCheckList').insertAdjacentHTML('beforeend',this.getCheckListCreted(objectCheck))
  }

  getCheckListCreted(checklists) {
    let userful = new UsefulComponents();
    console.log(checklists);
    let response = checklists
      .map(
        (checklist) =>
          `
        <div class="checklistCreated" id="checklis_${checklist.id}">
            <div id="description">
                <h1>${checklist.description}</h1> 
            </div>
            <div>
                <img src="${
                  checklist.notification == 0
                    ? `assets/images/alertNotify.svg`
                    : `assets/images/alertNotifyOn.svg`
                }"/>
            </div>
            <div id="date1">
                <p>Data Inicial: ${
                  checklist.date_init != null
                    ? userful.convertData(checklist.date_init, "-")
                    : "Sem data"
                }</p>
            </div>
            <div id="date2">
                <p>Data Final: ${
                  checklist.date_final != null
                    ? userful.convertData(checklist.date_final, "-")
                    : "Sem data"
                }</p>
            </div>
            <div id="function">
            <button type="button"><img src="./assets/images/groups_black_24dp.svg"/></button>
            <button type="button"><img src="./assets/images/olho.svg"/></button>
            <button type="button"><img src="./assets/images/delete.svg"/></button>
            </div>

        </div>
`
      )
      .join("");

    return response;
  }
}

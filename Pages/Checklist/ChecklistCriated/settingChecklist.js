import { ChecklistCreatedPage } from "./checklist.js";
import { getB_id, $ } from "../../../Util/compressSyntaxe.js";
import { Checklist } from "../../../Connection/Checklist.js";
import { UsefulComponents } from "../../../Util/usefulComponents.js";
import { UserAccess } from "../../../Connection/UserAccess.js";
import { ListUser } from "../../../Components/listUser.js";

export class SettingChecklist {
  searchCheck;
  searchDateInit;
  searchDateFinal;
  checklist = new Checklist();
  listUser = new ListUser();
  accessClpp;
  setting() {
    this.queryButton();
  }

  queryButton() {
    let searchCheck;
    getB_id("searchName").addEventListener("click", async () => {
      this.searchCheck = $("#inputCheckList").value;
      this.searchDateInit = $("#dateInit").value || "";
      this.searchDateFinal = $("#dateFinal").value || "";
      searchCheck = await this.checklist.get(
        "&web&check_name=" +
          this.searchCheck +
          "&date_ini=" +
          this.searchDateInit +
          "&date_final=" +
          this.searchDateFinal +
          "&id_user=" +
          localStorage.getItem("id"),
        true
      );
      this.clean();
      this.popIclude(searchCheck);
    });
  }
  clean() {
    getB_id("getCheckList").innerHTML = "";
  }

  popIclude(objectCheck) {
    getB_id("getCheckList").insertAdjacentHTML(
      "beforeend",
      this.getCheckListCreted(objectCheck)
    );
  }




  listUsers() {
    getB_id("groups").addEventListener("click", async () => {
        getB_id("groups").setAttribute("groups", "style", "display=flex")
      this.accessClpp = access.get("&application_id=7&web");
      let response = new ListUser(this.accessClpp).map(
        () =>
          `
          <div id="listUser">
            ${users}
          </div>
          `
      );
      return response;
    });
  }




  getCheckListCreted(checklists) {
    let userful = new UsefulComponents();
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
            <button type="button" id="groups"><img src="./assets/images/groups_black_24dp.svg"/></button>
            <button type="button"><img src="./assets/images/olho.svg"/></button>
            <button type="button" ><img src="./assets/images/delete.svg"/></button>
            </div>

        </div>
`
      )
      .join("");

    return response;
  }
}

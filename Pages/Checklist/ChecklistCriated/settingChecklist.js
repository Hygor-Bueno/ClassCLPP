import { getB_id, $, $_all, openModalCheck,closeModal } from "../../../Util/compressSyntaxe.js";
import { Checklist } from "../../../Connection/Checklist.js";
import { UsefulComponents } from "../../../Util/usefulComponents.js";
import { UserAccess } from "../../../Connection/UserAccess.js";
import { ListUser } from "../../../Components/listUser.js";
import { ObjectChecklist } from "../../../Components/objects/checklistObject.js";
import { ConnectionCLPP } from "../../../Connection/ConnectionCLPP.js";
import { TemplateChecklist } from "../../../Components/templateChecklist.js";

export class SettingChecklist {
  checklist = new Checklist();
  listUser = new ListUser();
  accessClpp = new UserAccess();
  connectionCLPP = new ConnectionCLPP();
  searchCheck;
  searchDateInit;
  searchDateFinal;
  idCheck;
  checklistsUser = {};
  listsUsersCheck = "";
  arrayCheck;

  async list() {
    let accessCLPP = await this.accessClpp.get("&application_id=7&web");
    for (const iterator of accessCLPP.data) {
      this.listsUsersCheck += await this.listUser.main(iterator.id);
    }
  }

  async constructorObject(array) {
    //Esssa parte popula o checklist
    await array.forEach(async (element) => {
      let response = new ObjectChecklist();
      await response.loadingCheckDataBase(element);
      this.checklistsUser[element.id] = response;
    });
    console.log(this.checklistsUser)
  }

  getQuestion(array) {}

  getOption(array) {}

  async setting(array) {
    await this.constructorObject(array);
    await this.list();
    await this.queryButton();
    this.listUsers();
    this.viewChecklist();
    this.deleteChecklist();
  }

  async queryButton() {
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
      this.listUsers();
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
    $_all(".groups").forEach((element) => {
      element.addEventListener("click", () => {
        this.queryUser(element.getAttribute("data-id_check"));
      });
    });
  }
  viewChecklist(){
    $_all(".view").forEach((element) => {
      element.addEventListener("click", () => {
        let templateCheck = new TemplateChecklist;
        let objJSON =this.checklistsUser[element.getAttribute("data-id_check")].JsonProceedChecklist()
        localStorage.setItem('checklist',JSON.stringify(objJSON))
        openModalCheck(`<div id="checkCreateDiv">${templateCheck.main()}</div>`)
        templateCheck.proceedChecklist(JSON.parse(localStorage.getItem('checklist')));
        console.log(this.checklistsUser)
      });
    });
  }
  deleteChecklist(){
    $_all(".delete").forEach((element) => {
      element.addEventListener("click", () => {
        this.checklistsUser[element.getAttribute("data-id_check")].deleteChecklistDataBase();
        $(`#checklist_${element.getAttribute('data-id_check')}`).remove();
      });
    });
  }
  async queryUser(idChecklist) {
    await this.listUser.checkBoxUser(this.listsUsersCheck, idChecklist);
  }

  getCheckListCreted(checklists) {
    try {
      let userful = new UsefulComponents();
      let response = checklists
        .map(
          (checklist) =>
            `
            <div class="checklistCreated" id="checklist_${checklist.id}">
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
                  <button type="button"  class="groups" data-id_check="${checklist.id}"><img src="./assets/images/groups_black_24dp.svg"/></button>
                  <button type="button" class="view" data-id_check="${checklist.id}"><img src="./assets/images/olho.svg"/></button>
                  <button type="button" class="delete" data-id_check="${checklist.id}"><img src="./assets/images/delete.svg"/></button>
              </div>
          </div>
        `
        )
        .join("");

      return response;
    } catch (e) {
      console.error(e + " : Falha ao realizar a requisição...");
      return `<div class="ErrorPageDefault"><p>Desculpe, você não possui checklist...</p></div>`;
    }
  }
}

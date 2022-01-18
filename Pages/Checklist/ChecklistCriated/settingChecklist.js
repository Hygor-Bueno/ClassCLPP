import { getB_id, $, $_all, openModalCheck, closeModal } from "../../../Util/compressSyntaxe.js";
import { Checklist } from "../../../Connection/Checklist.js";
import { UsefulComponents } from "../../../Util/usefulComponents.js";
import { UserAccess } from "../../../Connection/UserAccess.js";
import { ListUser } from "../../../Components/listUser.js";
import { ObjectChecklist } from "../../../Components/objects/checklistObject.js";
import { ConnectionCLPP } from "../../../Connection/ConnectionCLPP.js";
import { TemplateChecklist } from "../../../Components/templateChecklist.js";
let idQuestion;
export class SettingChecklist {
  checklist = new Checklist();
  listUser = new ListUser();
  accessClpp = new UserAccess();
  connectionCLPP = new ConnectionCLPP();
  templateCheck = new TemplateChecklist;
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
    await array.forEach(async element => {
      let response = new ObjectChecklist();
      await response.loadingCheckDataBase(element);
      this.checklistsUser[element.id] = response;
    });
  }

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
      searchCheck = await this.checklist.get("&web&check_name=" +this.searchCheck +"&date_ini=" +this.searchDateInit +"&date_final=" + this.searchDateFinal + "&id_user=" + localStorage.getItem("id"), true);
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
    $_all(".groups").forEach(element => {
      element.addEventListener("click", () => {
        this.queryUser(element.getAttribute("data-id_check"));
      });
    });
  }

  viewChecklist() {
    $_all(".view").forEach(element => {
      element.addEventListener("click", () => {
        let objJSON = this.checklistsUser[element.getAttribute("data-id_check")].checklistJSON()
        localStorage.setItem('checklist', JSON.stringify(objJSON))
        openModalCheck(`<div id="checkCreateDiv">${this.templateCheck.main()}</div>`)
        this.templateCheck.proceedChecklist(JSON.parse(localStorage.getItem('checklist')));
        this.clickGeneral();
        this.templateCheck.checklist.setIdChecklist(element.getAttribute("data-id_check"))
        getB_id('typeQuestion').onchange = () => {
          this.templateCheck.alterTypeQuestion();
          this.templateCheck.enabledButtonInit();
          $('#headerQuestion input').value = "";
          $('#headerQuestion input').setAttribute('disabled', true)
        }
      });
    });
  }
  clickGeneral() {
    document.addEventListener("click", (element) => {
      if (element.target.tagName.toLowerCase() == 'button' || element.target.tagName.toLowerCase() == 'img') {
        let buttonCkick = element.target.parentNode
        if (buttonCkick.id) {
          this.functionsButton(buttonCkick.id.split('_'))
        }
      }
    })
  }
  async functionsButton(value) {
    switch (value[0]) {
      case "addNewOption":
        if (getB_id('updateQuestion')) {
          let idOp = await this.templateCheck.checklist.saveOption({ description: "Editável", observe: 0, photo: 0, value: 0 }, idQuestion);
          this.templateCheck.addOptions('bodyQuestion', idOp)
        } else {
          this.templateCheck.addOptions('bodyQuestion')
        }
        break;
      case "saveQuestion":
        if (this.templateCheck.validationQuestion()) {
          this.templateCheck.checklist.saveQuestions([this.templateCheck.addQuestion(this.templateCheck.idQuestion)])
          this.templateCheck.auxAddQuestion(this.templateCheck.idQuestion);
          this.templateCheck.alterTypeQuestion();
          this.templateCheck.enabledButtonInit();
          this.templateCheck.resetInput('#headerQuestion input')
        }
        break;
      case "updateQuestion":
        this.templateCheck.checklist.updateQuestionsDataBase(this.templateCheck.checklist.queryQuestion(idQuestion))        
        break;
      case "btnEnabledInput":
        this.templateCheck.enabledInputQuestion('#divForm input')
        break;
      case "btnEditabled":
        let input = document.querySelector(`#inputOption${value[1]}`)
        input.disabled = false;
        input.focus()
        break;
      case "btnDelete":
        getB_id(`option_${value[1]}`) && getB_id(`option_${value[1]}`).remove();
        break;
      case "editQuestionBtn":
        idQuestion = value[1]
        break;
      default:
        console.error('Botão invalido');
    }
  }

  deleteChecklist() {
    $_all(".delete").forEach(element => {
      element.addEventListener("click", () => {
        this.checklistsUser[
          element.getAttribute("data-id_check")
        ].deleteChecklistDataBase();
        $(`#checklist_${element.getAttribute("data-id_check")}`).remove();
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
          checklist =>
            `
            <div class="checklistCreated" id="checklist_${checklist.id}">
              <div id="description">
                  <h1>${checklist.description}</h1> 
              </div>
              <div>
                  <img src="${checklist.notification == 0? `assets/images/alertNotify.svg`: `assets/images/alertNotifyOn.svg`}"/>
              </div>
              <div id="date1">
                  <p>Data Inicial: ${checklist.date_init != null ? userful.convertData(checklist.date_init, "-") : "Sem data"}</p>
              </div>
              <div id="date2">
                  <p>Data Final: ${checklist.date_final != null ? userful.convertData(checklist.date_final, "-") : "Sem data"}</p>
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

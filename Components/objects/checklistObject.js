import { ConnectionCLPP } from "../../Connection/ConnectionCLPP.js";

export class ObjectChecklist extends ConnectionCLPP {
  #indexEditQuestion;
  #title;
  #date_init;
  #date_final;
  #notification = "0";
  #questions = [];
  #idChecklist;
  #creatorId;

  constructor(id) {
    super();
    this.#creatorId = id;
  }

  getTitle() {
    return this.#title;
  }
  getQuestion() {
    return this.#questions;
  }
  getNotification() {
    return this.#notification;
  }
  getDate_init() {
    return this.#date_init;
  }
  getDate_final() {
    return this.#date_final;
  }
  getIdCHecklist() {
    return this.#idChecklist;
  }
  getCreatorId() {
    return this.#creatorId;
  }

  setTitle(title) {
    this.#title = title;
  }
  setQuestion(question) {
    this.#questions = question;
  }
  setNotification(notification) {
    this.#notification = notification;
  }
  setDate_init(date_init) {
    this.#date_init = date_init;
  }
  setDate_final(date_final) {
    this.#date_final = date_final;
  }
  setIdChecklist(idChecklist) {
    this.#idChecklist = idChecklist;
  }
  setCreatorId(creatorId) {
    this.#creatorId = creatorId;
  }

  checklistJSON() {
    let response = {};
    response.nameChecklist = this.#title;
    response.dataInit = this.#date_init;
    response.dataFinal = this.#date_final;
    response.notify = this.#notification;
    response.questions = this.#questions;
    response.notify = this.#notification;
    response.creatorId = this.#creatorId;
    return response;
  }

  loadingChecklist(object) {
    if (object.nameChecklist) this.#title = object.nameChecklist;
    if (object.dataInit) this.#date_init = object.dataInit;
    if (object.dataFinal) this.#date_final = object.dataFinal;
    if (object.questions) this.#questions = object.questions;
    if (object.notify) this.#notification = object.notify;
    if (object.creatorId) this.#creatorId = object.creatorId;
  }
  async loadingCheckDataBase(checklist) {
    this.#title = checklist.description;
    this.#idChecklist = checklist.id;
    this.#creatorId = checklist.id_creator;
    this.#notification = checklist.notification;
    let questionJSON = await this.loadingQuestionDataBase(checklist);
    this.#questions = questionJSON.data;
    this.#questions.forEach(async (element) => {
      let req = await this.loadingOptionDataBase(element.id);
      req.data.forEach((option, index) => { element["op_" + (index + 1)] = option });
    });
  }

  async loadingQuestionDataBase(checklist) {
    return await this.get(
      `&id=${checklist.id}&user_id=${checklist.id_creator}`,
      "CLPP/Question.php",
      true
    );
  }
  async loadingOptionDataBase(id_question) {
    return await this.get(`&id=${id_question}`, "CLPP/Option.php", true);
  }

  deleteChecklistDataBase() {
    this.delete({ id: this.#idChecklist }, "CLPP/Checklist.php")
  }
  // let array = this.filterOption(this.queryQuestion(idQuestion)) -> Esse codigo pega todas as Options de uma determinada Question
  async deleteQuestionDataBase(idQuestion) {
    await this.deleteAllOptionDataBase(idQuestion);
    this.delete({ "id": idQuestion }, "CLPP/Question.php")
  }
  deleteOptionDataBase(idOption) {
    this.delete({ "id": idOption }, "CLPP/Option.php")
  }
  async deleteAllOptionDataBase(idQuestion) {
    this.delete({ "id_question": idQuestion }, "CLPP/Option.php")
  }

  addQuestion(questionJson) {
    this.#questions.push(questionJson);
  }

  updateQuestion(arrayQuestion) {
    this.#questions[this.#indexEditQuestion] = arrayQuestion;
  }

  deleteQuestion(idQuestion) {
    this.#questions.forEach((element, index) => {
      if (element.id == idQuestion) {
        this.#questions.splice(index, 1);
      }
    });
  }

  queryQuestion(idQuestion) {
    let response;
    this.#questions.forEach((element, index) => {
      if (element.id == idQuestion) {
        response = element;
        this.#indexEditQuestion = index;
      }
    });
    return response;
  }

  updateChecklistDataBase() {
    let checklistJSON = {
      id: this.#idChecklist,
      description: this.#title,
      date_init: this.#date_init,
      date_final: this.#date_final,
      notification: this.#notification,
      id_creator: this.#creatorId
    };
    this.put(checklistJSON, "CLPP/Checklist.php?app_id=7");
  }
  async saveChecklist() {
    let checklistJSON = {
      description: this.#title,
      date_init: this.#date_init,
      date_final: this.#date_final,
      notification: this.#notification,
      id_creator: this.#creatorId
    };

    let req = await this.post(checklistJSON, "CLPP/Checklist.php?app_id=7");
    this.#idChecklist = req.last_id;
  }
  async saveQuestions() {
    this.#questions.forEach(async (question) => {
      let questionJSON = {
        type: question.type,
        id_checklist: this.#idChecklist,
        description: question.title
      };
      let req = await this.post(questionJSON, "CLPP/Question.php?app_id=7", true);
      question.id_question = req.last_id;
      this.saveOptions(this.filterOption(question), question.id_question);
    });
  }
  saveOptions(options, idQuestion) {
    options.forEach(async (element) => {
      element.id_question = idQuestion;
      let req = await this.post(element, "CLPP/Option.php?app_id=7");
      element.id = req.last_id;
    });
  }
  async saveQuestionsBD(question) { 
    let questionJSON = {
      type: question.type,
      id_checklist: this.#idChecklist,
      description: question.title
    };
    let req = await this.post(questionJSON, "CLPP/Question.php?app_id=7", true);
    question.id_question = req.last_id;
    let resp = await this.saveOptionsBD(this.filterOption(question), question.id_question, questionJSON);
    console.log(resp);
    console.log(Object.keys(resp))
    this.addQuestion(resp)    
    return resp
  }
  async saveOptionsBD(options, idQuestion, Object) {
    console.log(options, idQuestion, Object)
    Object.id_question = idQuestion
    let newObj = this.mountQuestion(Object);
    options.forEach(async (element, index) => {
      element.id_question = idQuestion;
      element.question_id = idQuestion
      let req = await this.post(element, "CLPP/Option.php?app_id=7");
      element.id = req.last_id;
      newObj[`op_${index + 1}`] = element;
      delete element.id_question
      delete element.type
    });
    return newObj;
  }
  
  mountQuestion(Object) {
    let obj = {
      checklist_id: Object.id_checklist,
      description: Object.description,
      id: Object.id_question,
      type: Object.type,
    }
    return obj;
  }
  async updateQuestionsDataBase(question) {
    let questionJSON = {
      id: question.id,
      type: question.type,
      id_checklist: this.#idChecklist,
      description: question.title
    };
    await this.put(questionJSON, "CLPP/Question.php?app_id=7");
    this.updateOptionsDataBase(this.filterOption(question));
  }
  updateOptionsDataBase(options) {
    options.forEach(async (element) => {
      element.id_question = options.question_id;
      await this.put(element, "CLPP/Option.php?app_id=7"); // NÂO ESTÁ RETORNANDO NADA...
    });
  }
  async saveOption(option, idQuestion) {
    option.id_question = idQuestion;
    let req = await this.post(option, "CLPP/Option.php?app_id=7");
    option.id = req.last_id;
    return option
  }
  filterOption(question) {
    let response = [];
    Object.keys(question).forEach((element) => {
      if (typeof question[element] == "object")
        response.push(question[element]);
    });
    return response;
  }
}

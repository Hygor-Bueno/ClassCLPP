import { Checklist } from "../../Connection/Checklist.js";
import { Question } from "../../Connection/Question.js";

export class ObjectChecklist {

	#indexEditQuestion;
	#title;
	#date_init;
	#date_final;
	#notification = '0';
	#questions = [];
	#idChecklist;
	#creatorId;

	constructor(id) {
		this.#creatorId = id
	}

	addQuestion(questionJson) {
		this.#questions.push(questionJson)
	}

	updateQuestoin(arrayQuestion) {
		this.#questions[this.#indexEditQuestion] = arrayQuestion;
	}

	deleteQuestion(idQuestion) {
		this.#questions.forEach((element, index) => {
			if (element.id == idQuestion) { this.#questions.splice(index, 1), console.log(element) }
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

	getTitle() { return this.#title }
	getQuestion() { return this.#questions }
	getNotification() { return this.#notification }
	getDate_init() { return this.#date_init }
	getDate_final() { return this.#date_final }
	getIdCHecklist() { return this.#idChecklist }
	getCreatorId() { return this.#creatorId }

	setTitle(title) { this.#title = title }
	setQuestion(question) { this.#questions = question }
	setNotification(notification) { this.#notification = notification }
	setDate_init(date_init) { this.#date_init = date_init }
	setDate_final(date_final) { this.#date_final = date_final }
	setIdCHecklist(idChecklist) { this.#idChecklist = idChecklist }
	setCreatorId(creatorId) { this.#creatorId = creatorId }

	salveFullChecklist() {

	}

	async salveChecklist() {
		const connectChecklist = new Checklist;
		let checklistJSON = {
			"description": this.#title,
			"date_init": this.#date_init,
			"date_final": this.#date_final,
			"notification": toString(this.#notification),
			"id_creator": this.#creatorId,
		};
		this.#idChecklist = await connectChecklist.post(checklistJSON);
		console.log(this.#idChecklist + " <-- Este é o ID do checklist")
	}
	salveQuestions() {
		const connectQuestion = new Question;
		this.#questions.forEach(async (question) => {
			let questionJSON = {
				"type": question.type,
				"id_checklist": this.#idChecklist,
				"description": question.title
			};
			console.log(questionJSON);
			question.id_qustion = await connectQuestion.post(questionJSON,true)
			console.log(this.#questions);
		});
		// this.idQuestion = await connectQuestion.post(checklistJSON);
	}
}
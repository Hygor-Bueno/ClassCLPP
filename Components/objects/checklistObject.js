import { Checklist } from "../../Connection/Checklist.js";
import { ConnectionCLPP } from "../../Connection/ConnectionCLPP.js";

export class ObjectChecklist {

	#indexEditQuestion;
	#title;
	#date_init;
	#date_final;
	#notification = '0';
	#questions = [];
	#idChecklist;
	#creatorId;
	#apiCLPP = new ConnectionCLPP
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
		this.#questions.forEach(async (question) => {
			let questionJSON = {
				"type": question.type,
				"id_checklist": this.#idChecklist,
				"description": question.title
			};
			let req = await this.#apiCLPP.asyncPost(questionJSON,"CLPP/Question.php?app_id=7",true)
			question.id_question = req.last_id
			this.salveOption(this.filterOption(question),question.id_question)
		});
	}
	salveOption(options,idQuestion){ 
		options.forEach(element => {
			element.id_question = idQuestion;
			this.#apiCLPP.asyncPost(element,"CLPP/Option.php?app_id=7");
		});
	}
	filterOption(question) {
        let response = [];
        Object.keys(question).forEach((element) => {
            if (typeof question[element] == 'object') response.push(question[element]);
        });
        return response;
    }
}
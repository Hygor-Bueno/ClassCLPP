export class ObjectChecklist{
    #title;
    #questions = [];
    addQuestion(questionJson){        
        this.#questions.push(questionJson)
    }
    delete(idQuestion){
        delete this.#questions[idQuestion];
    }

    getTitle(){return this.#title}
    getQuestion(){return this.#questions}

    setTitle(title){this.#title = title}
    setQuestion(question){this.#questions= question}
}
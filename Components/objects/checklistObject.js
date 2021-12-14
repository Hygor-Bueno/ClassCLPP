export class ObjectChecklist{
    
    #title;
    #questions = [];

    addQuestion(questionJson){        
        this.#questions.push(questionJson)
    }

    deleteQuestion(idQuestion){
        this.#questions.forEach((element,index) => {
            if(element.id == idQuestion) this.#questions.splice(index,1)
        });
    }
    queryQuestion(idQuestion){
        let response;
        this.#questions.forEach((element) => {
            if(element.id == idQuestion) response = element
        });
        return response;
    }

    getTitle(){return this.#title}
    getQuestion(){return this.#questions}

    setTitle(title){this.#title = title}
    setQuestion(question){this.#questions= question}
}
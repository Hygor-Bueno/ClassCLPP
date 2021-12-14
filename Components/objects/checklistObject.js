export class ObjectChecklist{
    #indexEditQuestion;
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
        this.#questions.forEach((element,index) => {
            if(element.id == idQuestion){ response = element ; this.#questions[index] = [].this.#indexEditQuestion= index}
        });
        return response;
    }

    getTitle(){return this.#title}
    getQuestion(){return this.#questions}

    setTitle(title){this.#title = title}
    setQuestion(question){this.#questions= question}
}
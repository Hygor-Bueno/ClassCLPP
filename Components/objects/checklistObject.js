export class ObjectChecklist{

    #indexEditQuestion;
    #title;
    #questions = [];

    addQuestion(questionJson){        
        this.#questions.push(questionJson)
    }

    updateQuestoin(arrayQuestion){
        this.#questions[this.#indexEditQuestion] = arrayQuestion;
        console.log(this.#questions[this.#indexEditQuestion])
    }   

    deleteQuestion(idQuestion){
        this.#questions.forEach((element,index) => {
            if(element.id == idQuestion) {this.#questions.splice(index,1),console.log(element)}
        });
    }

    queryQuestion(idQuestion){
        let response;
        this.#questions.forEach((element,index) => {
            if(element.id == idQuestion){ 
                response = element ; 
                this.#indexEditQuestion= index;
            }
        });
        return response;
    }
    
    getTitle(){return this.#title}
    getQuestion(){return this.#questions}

    setTitle(title){this.#title = title}
    setQuestion(question){this.#questions= question}

}
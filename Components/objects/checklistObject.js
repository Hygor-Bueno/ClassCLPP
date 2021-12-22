export class ObjectChecklist{

    #indexEditQuestion;
    #title;
    #date_init;
    #date_final;
    #notification;
    #questions = [];

    addQuestion(questionJson){        
        this.#questions.push(questionJson)
    }

    updateQuestoin(arrayQuestion){
        this.#questions[this.#indexEditQuestion] = arrayQuestion;
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
    getNotification(){return this.#notification}
    getDate_init(){return this.#date_init}
    getDate_final(){return this.#date_final}

    setTitle(title){this.#title = title}
    setQuestion(question){this.#questions= question}
    setNotification(notification){this.#notification = notification}
    setDate_init(date_init){this.#date_init = date_init}
    setDate_final(date_final){this.#date_final = date_final}

    salveFullChecklist(){

    }
    salveChecklist(){
        
    }
}
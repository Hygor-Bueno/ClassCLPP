export class ObjectChecklist{
    titulo;
    questions = [];
    addQuestion(questionJson){
        console.log(questionJson)
        this.questions.push(questionJson)
    }
    delete(idQuestion){
        delete this.questions[idQuestion];
    }
}
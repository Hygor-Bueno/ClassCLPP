export class Translate{
    main(message){
        let response;
        switch (message) {
            case "(id_checklist, id_user, object) is broken":
                response = "ERRO 400 - Falha no envio das informações, certifique-se que todos os campos foram preenchidos corretamente."
                break
            case "This method is not allowed":
                response = "ERRO 405 - Não foi possível executar os métodos.";
                break
            case "(id) is broken":
                response = "ERRO 400 - ID da mensagem inválido. Falha ao deletar";
                break
            case "(id, id_checklist, asking) is broken":
                response = "ERRO 400 - Falha ao adicionar opção de resposta, por favor preencher todos os campos obrigatórios..."
                break
            case "(id, description, value, photo, observe) is broken":
                response = "ERRO 400 - Falha ao atualizar opção de resposta, por favor preencher todos os campos obrigatórios..."
                break
            case "(id or questionId) is broken":
                response = "ID ou ID da questão inválido"
                break
            case "(notification) is broken":
                response = "Falha ao buscar as informações da pergunta."
                break
            case "(type,checklistId,description) is broken":
                response = "Falha ao criar nova pergunta. Preencha todos os campos obrigatórios."
                break
            case "(id, type, checklistId, description) is broken":
                response = "Falha ao atualizar a pergunta. Preencha todos os campos obrigatórios."
                break
            case "(id or checklistId) is broken":
                response = "Não foi possível deletar a pergunta. Falha no ID do Checklist ou ID da Questão."
                break
            case "(notification,description, id_creator) is broken":
                response = "Falha ao criar checklist, preencher todos os campos obrigatórios."
                break
            case "(id, description, notification) is broken":
                response = "Não foi possível atualizar o checklist. Validar campos obrigatórios..."
                break
            case "(user, password, app_id) is broken":
                response = "Desculpe, Não foi possível realizar o login. Verificar se os campos Usuário e Senha foram preenchidos."
                break
            case "No data":
                response = "Desculpe, dados não encontrados."
                break
            case "Default password is not permited":
                response = "Você será redirecionado para a página de alteração de senha."
                break
            case "This password do is not match":
                response = "Senha Incorreta! "
                break
            case "No data to delete":
                response = "Não Existe dados para excluir"
                break
            case "Delete success":
                response = "Excluído com sucesso"
                break
            case "Add data success":
                response = "Adicionado com sucesso";
                break
            case "The user is already linked with the checklist":
                response = "O usuário já está vinculado ao Checklist"
                break
            case "Authorization denied":
                response = "Autorização Negada. Realize o login novamente."
                break
            case "Update success":
                response = "Atualizado com sucesso!"
                break
            case "No data to Update":
                response = "Não houve nenhuma alteração"
                break
            default:
                response = message;
        }
        return response;
    }
}
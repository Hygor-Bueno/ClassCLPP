import { $, $_all, getB_id, closeModal } from "../../Util/compressSyntaxe.js";
import { ConnectionCLPP } from "../../Connection/ConnectionCLPP.js";

export class RecordObject extends ConnectionCLPP {
    #id_user;
    #point;
    #date;
    #type;
    #description;
    #filters;
    graphicRecord;

    alertSave() {
        const modalAlert = `
            <div id="modalAlert">
                <div id="alertMsg">
                    <h1>Deseja salvar o arquivo em seu computador?</h1>
                </div>    
                <footer id="alertBtn">
                    <button id="saveFile">Salvar</button>
                    <button id="cancelFile">Cancelar</button>
                </footer>
            </div> `
        return modalAlert;
    }
    settingBtnAlertSave() {
        $('#modalAlert').addEventListener('click', (element) => {
            if (element.target.tagName.toLowerCase() == 'button') this.filtarBtnModalAlert(element.target)
        })
    }
    filtarBtnModalAlert(element) {
        switch (element.getAttribute('id')) {
            case ("saveFile"):
                console.log("saveFile")
                break;
            case ("cancelFile"):
                closeModal()
                break;
            default:
                console.error("not found!")
        }
    }
    // saveReport(){

    // }
    clppGraphics(arrayValues, context, types) {
       this.graphicRecord =  new Chart(document.querySelector(`${context}`).getContext("2d"),
            {
                type: this.typeGraphics(types),
                data: {
                    labels: [...arrayValues.map(item => item[0])],

                    datasets: [
                        {
                            label: "Porcentagem de vendas",
                            data: [...arrayValues.map(item => item[1])],
                           
                            backgroundColor: [
                                "#ccc", "blue", "red",
                            ],
                            borderColor: "#000",
                            borderWidth: 1
                        }
                    ]
                },
                options: {
                    scales: {
                        y: {
                            ticks: {
                                callback: function (value) {
                                    return value + " %"
                                }
                            },
                            suggestedMax: 100
                        }
                    }
                }
            });
    }

    typeGraphics(value) {
        console.log(value.trim().toLowerCase());
        let response;
        switch (value.trim().toLowerCase()) {
            case "pizza":
                response = "pie";
                break;
            case "barra":
                response = "bar"
                break;
            case "linha":
                response = "line"
                break;
            default:
                response = "doughnut"
        }
        return response;
    }
}
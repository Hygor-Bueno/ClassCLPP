import { ConnectionCLPP } from "../../Connection/ConnectionCLPP.js";

export class RecordObject extends ConnectionCLPP {
    #id_user;
    #point;
    #date;
    #type;
    #description;
    #filters;

    graphicRecord;

    getId_user() {return this.#id_user}
    getPoint() {return this.#point}
    getDate() {return this.#date}
    getType() {return this.#type}
    getDescription() {return this.#description}
    getFilters() {return this.#filters}

    setId_user(id_user) {this.#id_user = id_user}
    setPoint(point) {this.#point = point}
    setDate(date) {this.#date = date}
    setType(type) {this.#type = type}
    setDescritpion(description) {this.#description = description}
    setFilters(filters) {this.#filters = filters}


    saveReport(){
        let json ={
            id_user: this.#id_user, 
            point: this.#point,
            date: this.#date,
            type: this.#type, 
            nome: this.#description,
            filters: this.#filters
        }
        console.log(json)
    } 

    clppGraphics(arrayValues, context, types) {
        this.graphicRecord = new Chart(document.querySelector(`${context}`).getContext("2d"),
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

        let response;

        switch (value) {
            case 1:
                response = "pie";
                break;
            case 2:
                response = "bar"
                break;
            case 3:
                response = "doughnut"
                break;           
        }
        return response;
    }
}
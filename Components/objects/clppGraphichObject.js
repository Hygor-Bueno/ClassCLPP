export class ClppGraphichObject{
    graphicRecord;
    clppGraphics(arrayValues, context, types) {
        
        let heightY = arrayValues.length
        let transparency = 0.6
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
                                `rgba(192,192,192,${transparency})`,`rgba(255,0,0,${transparency})`, `rgba(0,0,255,${transparency})`, `rgba(50,103,68,${transparency})`, `rgba(246,239,29,${transparency})`, `rgba(204,0,204,${transparency})`
                            ],
                            borderColor: ["rgb(192,192,192)","rgb(255,0,0)","rgb(0,0,255)","rgb(50,103,68)","rgb(246,239,29)","rgb(204,0,204)"],
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
                            suggestedMax: heightY < 7 ? 100 : "" 
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
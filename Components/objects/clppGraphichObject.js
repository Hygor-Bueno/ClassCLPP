export class ClppGraphichObject {
    graphicRecord;
    clppGraphics(arrayValues, context, types) {
        console.log(arrayValues)
        let transparency = 0.4
        let noS = arrayValues[0][0] == "Não Satisfatório"
        let heightY = arrayValues.length
        
        this.graphicRecord = new Chart(document.querySelector(`${context}`).getContext("2d"),
            {
                type: this.typeGraphics(types),
                
                data: {
                    labels: [...arrayValues.map(item => item[0])],
                    datasets: [
                        {
                            label: "Porcentagem",
                            data: [...arrayValues.map(item => item[1])],
                            backgroundColor: this.colorsGraphics(transparency, noS),
                            borderColor: this.borderColorGraphics(noS),
                            borderWidth: 1
                        }
                    ]
                },
                options: this.grade(types,heightY)
            });
    }

    grade(type,heightY) {
        return type == 2 ?
            {
                scales:
                {
                    y:
                    {
                        ticks:
                        {
                            callback: function (value) { return value + " %" }
                        }, suggestedMax: heightY < 7 ? 100 : ""
                    }
                }
            }
            :
            {}
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

    colorsGraphics(transparency, noS) {
        let color = [
            `rgba(50,103,68,${transparency})`,
            
            `rgba(246, 143, 31,${transparency})`,
            `rgba(46, 49, 146,${transparency})`,

            `rgba(255, 195, 36,${transparency})`,
            `rgba(73, 23, 110,${transparency})`,

            `rgba(254, 241, 4,${transparency})`,
            `rgba(108, 32, 128,${transparency})`,

            `rgba(65, 150, 59,${transparency})`,
            `rgba(219, 17, 98,${transparency})`,

            `rgba(5, 99, 35,${transparency})`,
            `rgba(237, 27, 36,${transparency})`,

            `rgba(2, 107, 100,${transparency})`,
            `rgba(242, 100, 50,${transparency})`
        ]
        for (let index = 0; index < 10; index++) {
            color.push(...color);
        }
        noS && color.unshift(`rgba(131,131,131,${transparency})`)
        return color;
    }

    borderColorGraphics(noS) {
        let borderColor = [
            `rgb(50,103,68)`,

            `rgb(246, 143, 31)`,
            `rgb(46, 49, 146)`,

            `rgb(255, 195, 36)`,
            `rgb(73, 23, 110)`,

            `rgb(254, 241, 4)`,
            `rgb(108, 32, 128)`,

            `rgb(65, 150, 59)`,
            `rgb(219, 17, 98)`,

            `rgb(5, 99, 35)`,
            `rgb(237, 27, 36)`,

            `rgb(2, 107, 100)`,
            `rgb(242, 100, 50)`
        ]
        for (let index = 0; index < 10; index++) {
            borderColor.push(...borderColor);
        }
        noS && borderColor.unshift(`rgb(131,131,131)`)
        return borderColor;
    }
}
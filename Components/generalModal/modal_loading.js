var count = 4;
var values = 1;
export class ModalLoading {
    openInterval;
    porcent = document.querySelector('.porcent');
    main() {
        return `
                <div class="loading">
                    <div class="spinner">
                        <div class="porcent">0%</div>
                    </div>
                </div>
                `
    }
    settingLoading(newValue, speed) {
        values = newValue
        clearInterval(this.openInterval)
        this.openInterval = setInterval(() => this.animate(), speed);
    }
    animate() {
        if (count >= values) {
            clearInterval(this.openInterval)
            if (values == 100) {
                console.log(count , values)
                document.querySelector('.loading').parentElement.removeChild(document.querySelector('.loading'));
                count = 4;
                values = 1;
            }
        } else {
            count++;
           if(document.querySelector('.porcent')){  document.querySelector('.porcent').textContent = count + "%"; console.log("vral")}

        }
    }
}
import { closeModal } from "../../Util/compressSyntaxe.js";

export class GeneralModal {
  main(message, controller) {
    document
      .getElementById("StyleModal")
      .setAttribute("href", "./Components/generalModal/modal_geral.css");

    let svgAlertError = `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#FFFFFF"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/></svg>`;
    let svgAlertConfirm = `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#FFFFFF"><path d="M0 0h24v24H0V0z" fill="none" opacity=".87"/><path d="M21 8h-6.31l.95-4.57.03-.32c0-.41-.17-.79-.44-1.06L14.17 1 7.59 7.59C7.22 7.95 7 8.45 7 9v10c0 1.1.9 2 2 2h9c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73v-2c0-1.1-.9-2-2-2zm0 4l-3 7H9V9l4.34-4.34L12.23 10H21v2zM1 9h4v12H1z"/></svg><h1 class="title_alert">`;
    let response = `   <div class="${controller ? "modalERR" : "modalCONF"}">
                <header>
                    ${controller ? svgAlertError : svgAlertConfirm
      }<h1 class="title_alert">ATENÇÃO !</h1>
                    <button type="button" id="closeAlert" title="fechar">X</button>
                </header>
                <section>
                    <p class="txt_alert">${message}</p>
                </section>
            </div>
        `;
    return response;
  }

  readingTime(message) {
    return (message.length / 10) * 1000;
  }

  close() {
    document
      .getElementById("closeAlert")
      .addEventListener("click", () => closeModal());
  }
}

export class ChecklistCreatedPage {
  main() {
    document.getElementById("message").setAttribute("style", "display:none");
    let response = `
        <h1>Pagina dos Checklists Criados</h1>            
        `;
    return response;
  }
}

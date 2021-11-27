export class ChecklistCreatePage {
	main() {
		let response =
			`	
			<div id="checkCreateDiv">			
				<form id="formCheclist">		
					<div id="groupForm">
						<input type="text" id="nameChecklist" disabled=false>
						<button><img src="./assets/images/pencil.svg" title="Editar Nome do checklist" /></button>
						<div id="groupFormDate">
							<p>Data Inicial: </p> <input type="date" id="dateInicial"/>
							<p>Data Final: </p> <input type="date" id="dateFinal"/>
						</div>		
					</div>
					<div>
						<button id="notifyChecklist"><img src="./assets/images/alertNotify.svg" title="Noftificar quando checklist for respondido" /></button>
						<button id="notifyChecklist"><img src="./assets/images/salve.svg" title="Salvar checklist" /></button>
						<button id="notifyChecklist"><img src="./assets/images/delete.svg" title="Excluir checklist" /></button>
					</div>
				</form>  
			</div>      
		`
		return response;
	}
}
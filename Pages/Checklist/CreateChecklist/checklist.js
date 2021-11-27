export class ChecklistCreatePage {
	main() {
		let response =
			`				
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
					<button id="notifyChecklist">notificar</button>
					<button id="notifyChecklist">salvar</button>
					<button id="notifyChecklist">excluir</button>
				</div>
			</form>        
		`
		return response;
	}
}
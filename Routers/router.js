import { HomePage } from "../Pages/Home/home.js";
import { ChecklistCreatePage } from "../Pages/Checklist/CreateChecklist/checklist.js";
import { ChecklistCreatedPage } from "../Pages/Checklist/ChecklistCriated/checklist.js";
import { MessagePage } from "../Pages/Message/message.js"
import { RecordPage } from "../Pages/Record/record.js"
import { Employee } from "../Connection/Employee.js";
import { ModalLoading } from "../Components/generalModal/modal_loading.js";

export class Routers {
	modalLoading = new ModalLoading;
	async routers(params) {
		let employee = new Employee;
		/** Limpa a div content para receber um novo conteúdo */
		let local = document.getElementById('content');
		local ? local.innerHTML = "" : local;
		// Insere e abre o modal de loading
		document.querySelector("body").insertAdjacentHTML("beforeend", this.modalLoading.main());
		await this.loadPage(employee.get("&id=" + localStorage.getItem("id"), true), null, 35, 2);
		localStorage.setItem('router', params);
		// Fecha a aba de mensagens caso ela esteja aberta.
		document.getElementById('message').setAttribute('style', 'display:none');
		if (local) {
			switch (params) {
				case 'home':
					await this.pageHome(local);
					break;
				case 'checklistCreate':
					this.pageChecklistCreate(local);
					break;
				case 'checklistCreated':
					await this.pageChecklistCreated(local);
					break;
				case 'record':
					await this.pageRecord(local);
					break;
				case 'message':
					try{
						await this.pageMessage(local);
					}catch(e){
						console.error(e)
					}
					break;
			}
			this.modalLoading.settingLoading(100, 10)
		}
	}
	async pageHome(local) {
		let result;
		result = new HomePage;
		document.getElementById('StylePages').setAttribute('href', "./Pages/Home/home.css");
		await this.loadPage(result["main"](), local, 70, 25);
		result.settings();
	}
	pageChecklistCreate(local) {
		let result;
		result = new ChecklistCreatePage;
		document.getElementById('StylePages').setAttribute('href', "");
		local.insertAdjacentHTML("beforeend", result.main());
		result.setting();
	}
	async pageChecklistCreated(local) {
		let result;
		document.getElementById('StylePages').setAttribute('href', "./Pages/Checklist/ChecklistCriated/checklist.css");
		result = new ChecklistCreatedPage;
		localStorage.removeItem('checklist');
		let req = await result.arrayCheckList();
		await this.loadPage(result["main"](req), local, 70, 10);
		await result.setting(req);
	}
	async pageRecord(local) {
		let result;
		document.getElementById('StylePages').setAttribute('href', "./Pages/Record/record.css")
		result = new RecordPage;
		let reqCheck = await result.getChecklist();
		await this.loadPage(result["main"](reqCheck), local, 70, 10);
		await result.setting(reqCheck);
	}
	async pageMessage(local) {
		try{
			let result;
			result = new MessagePage;
			document.getElementById('StylePages').setAttribute('href', "./Pages/Message/message.css");
			await this.loadPage(result["main"](), local, 70, 10);
			result.setting();
		}catch(e){
			console.error(e)
		}
	}

	async loadPage(elementMethod, local, percentage, speed) {
		return new Promise(async (resolve) => {
			this.modalLoading.settingLoading(percentage, speed);
			if (local) {
				local.insertAdjacentHTML("beforeend", await elementMethod);
			} else {
				await elementMethod;
			}
			resolve("sucess")
		})
	}
}
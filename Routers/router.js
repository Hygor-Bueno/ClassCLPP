import { HomePage } from "../Pages/Home/home.js";
import { ChecklistCreatePage } from "../Pages/Checklist/CreateChecklist/checklist.js";
import { ChecklistCreatedPage } from "../Pages/Checklist/ChecklistCriated/checklist.js";
import { MessagePage } from "../Pages/Message/message.js"
import { RecordPage } from "../Pages/Record/record.js"
export class Routers {
	async routers(params) {
		localStorage.setItem('router', params)
		document.getElementById('message').setAttribute('style', 'display:none')
		let local = document.getElementById('content');
		if (local) {
			let result;
			local.innerHTML = "";
			switch (params) {
				case 'home':
					result = new HomePage;
					document.getElementById('StylePages').setAttribute('href', "./Pages/Home/home.css")
					local.insertAdjacentHTML("beforeend", await result.main());
					result.settings()
					break;
				case 'checklistCreate':
					result = new ChecklistCreatePage;
					document.getElementById('StylePages').setAttribute('href', "./Pages/Checklist/CreateChecklist/checklist.css")
					local.insertAdjacentHTML("beforeend", result.main());
					result.setting();
					break;
				case 'checklistCreated':
					result = new ChecklistCreatedPage;
					document.getElementById('StylePages').setAttribute('href', "./Pages/Checklist/ChecklistCriated/checklist.css")
					let req = await result.arrayCheckList();
					local.insertAdjacentHTML("beforeend", await result.main(req));
					result.setting(req);
					break;
				case 'record':
					result = new RecordPage;
					document.getElementById('StylePages').setAttribute('href', "./Pages/Record/record.css")
					local.insertAdjacentHTML("beforeend", await result.main());
					result.setting()
					break;
				case 'message':
					result = new MessagePage;
					document.getElementById('StylePages').setAttribute('href', "./Pages/Message/message.css")
					local.insertAdjacentHTML("beforeend", result.main());
					result.setting()
					break;
			}
			return result;
		}
	}
}
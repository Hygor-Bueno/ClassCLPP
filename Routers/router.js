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

		let local = document.getElementById('content');
		local ? local.innerHTML = "" : local;

		document.getElementById("content").insertAdjacentHTML("beforeend", this.modalLoading.main())
		await this.loadPage(employee.get("&id=" + localStorage.getItem("id"),true),null,35,2).then(data=>{console.log(data)})

		localStorage.setItem('router', params)
		document.getElementById('message').setAttribute('style', 'display:none')	
			
		if (local) {
			let result;
			switch (params) {
				case 'home':
					result = new HomePage;					
					document.getElementById('StylePages').setAttribute('href', "./Pages/Home/home.css")
					await this.loadPage(result["main"](),local,70,25).then(data=>{console.log(data)})
					result.settings()
					break;
				case 'checklistCreate':
					result = new ChecklistCreatePage;
					document.getElementById('StylePages').setAttribute('href', "")
					local.insertAdjacentHTML("beforeend", result.main());
					result.setting();
					break;
				case 'checklistCreated':
					document.getElementById('StylePages').setAttribute('href', "./Pages/Checklist/ChecklistCriated/checklist.css")
					result = new ChecklistCreatedPage;
					localStorage.removeItem('checklist')
					let req = await result.arrayCheckList();
					await this.loadPage(result["main"](req),local,70,10).then(data=>{console.log(data)})
					result.setting(req);
					break;
				case 'record':
					document.getElementById('StylePages').setAttribute('href', "./Pages/Record/record.css")				
					result = new RecordPage;
					let reqCheck = await result.getChecklist();
					await this.loadPage(result["main"](reqCheck),local,70,10).then(data=>{console.log(data)})
					await result.setting(reqCheck)
					break;
				case 'message':
					result = new MessagePage;
					document.getElementById('StylePages').setAttribute('href', "./Pages/Message/message.css")
					// local.insertAdjacentHTML("beforeend", await result.main());
					await this.loadPage(result["main"](),local,70,10).then(data=>{console.log(data)})
					result.setting()
					break;
			}
			this.modalLoading.settingLoading(100,10)
			setTimeout(() => {},1000)
			return result;
		}
	}

	async loadPage(elementMethod,local,percentage, speed){
		return new Promise( async(resolve) => {						
			this.modalLoading.settingLoading(percentage, speed)
			if(local){
				local.insertAdjacentHTML("beforeend", await elementMethod);		
			}else{
				await elementMethod;
				console.log(await elementMethod)
			}
			resolve("sucess")	
		})
	}
}
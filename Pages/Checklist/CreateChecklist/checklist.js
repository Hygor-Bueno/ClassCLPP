import { TemplateChecklist } from "../../../Components/templateChecklist.js";
import { SettingChecklist } from "./settingChecklist.js";

export class ChecklistCreatePage extends SettingChecklist{
	main() {
		let templateChecklist = new TemplateChecklist; 
		let response =
			`	
			<div id="checkCreateDiv">				 
				${templateChecklist.main()}				
			</div>      
		`
		return response;
	}
}
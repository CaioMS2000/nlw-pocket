import { checkbox } from "@inquirer/prompts";
import { GoalsManager } from "../app";

export async function deleteGoals() {
    const allMetas = GoalsManager.getGoals()

	if (allMetas.length === 0) {
		console.log("Nenhuma meta cadastrada");
		return;
	}
	
	const selectedGoals = await checkbox({
		message: "",
		choices: allMetas.map((goal) => ({
			value: goal.name,
			checked: goal.check,
		})),
		instructions: false,
	});
    
}
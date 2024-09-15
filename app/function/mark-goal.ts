import { checkbox } from "@inquirer/prompts";
import { GoalsManager } from "../app";

export const markGoal = async () => {
	const selectedGoals = await checkbox({
		message: "",
		choices: GoalsManager.getGoals().map((goal) => ({
			value: goal.name,
			checked: goal.check,
		})),
		instructions: false,
	});

	for (const goal of GoalsManager.getGoals()) {
		goal.check = false;
	}

	for (const selectedGoal of selectedGoals) {
		const goal = GoalsManager.getGoals().find(
			(goal) => goal.name === selectedGoal
		);

		if (goal) {
			goal.check = true;
		}
	}
};

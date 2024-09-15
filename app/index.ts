import { select } from "@inquirer/prompts";
import { createGoal } from "./function/create-goal";
import { CommandManager } from "./command";
import { markGoal } from "./function/mark-goal";

const app = CommandManager();

app.register(createGoal);
app.register(markGoal);

async function BOOT() {
	while (true) {
		const option = await select({
			message: "Menu >",
			choices: [
				{ name: "Cadastrar meta", value: "createGoal" },
				{ name: "Marcar metas", value: "markGoalAsChecked" },
				{ name: "Sair", value: "exit" },
			],
		});

		if (option === "exit") break;

		const fn = app.getCommand(option);
		await fn();
	}
}

BOOT();

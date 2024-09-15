import { select } from "@inquirer/prompts";
import { createGoal } from "./function/create-goal";
import { CommandManager } from "./command";

const app = CommandManager();

app.register(createGoal);

async function BOOT() {
	while (true) {
		const option = await select({
			message: "Menu >",
			choices: [
				{ name: "Cadastrar meta", value: "createGoal" },
				{ name: "Sair", value: "exit" },
			],
		});

        console.log(option);

		if (option === "exit") break;

		const fn = app.getCommand(option);
        await fn()
	}
}

BOOT();

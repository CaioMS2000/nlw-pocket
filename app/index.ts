import { select } from '@inquirer/prompts'
import { createGoal } from './function/create-goal'
import { CommandManager } from './command'
import { markGoal } from './function/mark-goal'
import { getAchievedGoals } from './function/get-achieved-goals'
import { getPendingGoals } from './function/get-pending-goals'
import { deleteGoals } from './function/delete-goals'
import { recoverStoredGoals } from './function/recover-stored-goals'

const app = CommandManager()

app.register(createGoal)
app.register(markGoal)
app.register(getAchievedGoals)
app.register(getPendingGoals)
app.register(deleteGoals)

async function BOOT() {
	
	recoverStoredGoals()
	
	while (true) {
		const option = await select({
			message: 'Menu >',
			choices: [
				{ name: 'Cadastrar meta', value: 'createGoal' },
				{ name: 'Marcar metas', value: 'markGoal' },
				{ name: 'Ver metas realizadas', value: 'getAchievedGoals' },
				{ name: 'Ver metas pendentes', value: 'getPendingGoals' },
				{ name: 'Deletar metas', value: 'deleteGoals' },
				{ name: 'Sair', value: 'exit' },
			],
		})

		if (option === 'exit') {
			process.exit(0)
		}

		const fn = app.getCommand(option)
		await fn()
	}
}

BOOT()

import { checkbox } from '@inquirer/prompts'
import { GoalsManager } from '../app'

export const markGoal = async () => {
    const allGoals = GoalsManager.getGoals()

    if (allGoals.length === 0) {
        console.log('Nenhuma meta cadastrada')
        return
    }

    const selectedGoals = await checkbox({
        message: '',
        choices: allGoals.map(goal => ({
            value: goal.name,
            checked: goal.checked,
        })),
        instructions: false,
    })

    for (const goal of allGoals) {
        const isSelected = selectedGoals.includes(goal.name)
        const wasChecked = goal.checked

        if (isSelected && !wasChecked) {
            GoalsManager.editGoal({ name: goal.name, checked: true })
            continue
        }

        if(!isSelected && wasChecked) {
            GoalsManager.editGoal({ name: goal.name, checked: false })
        }
    }

    console.clear()
}

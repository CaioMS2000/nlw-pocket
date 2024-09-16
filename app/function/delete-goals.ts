import { checkbox } from '@inquirer/prompts'
import { GoalsManager } from '../app'

export async function deleteGoals() {
  const allMetas = GoalsManager.getGoals()

  if (allMetas.length === 0) {
    console.log('Nenhuma meta cadastrada')
    return
  }

  allMetas.forEach(goal => {goal.checked = false})

  const selectedGoals = await checkbox({
    message: '',
    choices: allMetas.map(goal => ({
      value: goal.name,
      checked: goal.checked,
    })),
    instructions: false,
  })

  selectedGoals.forEach(goalName => GoalsManager.deleteGoal(goalName))
  console.clear()
}

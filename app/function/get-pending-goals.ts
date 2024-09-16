import { GoalsManager } from '../app'

export async function getPendingGoals() {
  const notCompleted = GoalsManager.getGoals().filter(goal => !goal.check)

  if(notCompleted.length === 0) {
    console.log("Nenhuma meta pendente")
    return
  }

  notCompleted.forEach(goal => console.log(`- ${goal.name}`))
}

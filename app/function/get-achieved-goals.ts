import { GoalsManager } from '../app'

export async function getAchievedGoals() {
  const concluded = GoalsManager.getGoals().filter(goal => goal.checked)

  if (concluded.length === 0) {
    console.log('Nenhuma meta concluída\n\n')
    return
  }

  console.log('Metas concluídas:')
  concluded.forEach(goal => {
    console.log(`- ${goal.name} (${goal.checked})`)
    console.log("\n")
  })
}

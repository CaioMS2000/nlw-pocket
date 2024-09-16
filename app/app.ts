import { StorageManager } from "./db/database"

export type Goal = {
    name: string
    checked: boolean
}

export class GoalsManager {
    private static goals: Array<Goal> = []

    static getGoals() {
        return GoalsManager.goals
    }

    static addGoal(goal: Goal) {
        GoalsManager.goals.push(goal)
        StorageManager.store(GoalsManager.goals)
    }

    static deleteGoal(name: string){
        const goal = GoalsManager.goals.find(goal => goal.name === name)
        if (!goal) throw new Error('Meta não encontrada');

        const remainingGoals = GoalsManager.goals.filter(goal => goal.name !== name)
        GoalsManager.goals = remainingGoals

        StorageManager.store(remainingGoals)
    }

    static editGoal(editedGoal: Goal){
        const goal = GoalsManager.goals.find(goal => goal.name === editedGoal.name)
        if (!goal) throw new Error('Meta não encontrada');

        const otherGoals = GoalsManager.goals.filter(goal => goal.name !== editedGoal.name)
        const goals = [...otherGoals, editedGoal]

        GoalsManager.goals = goals
        StorageManager.store(goals)
    }
}

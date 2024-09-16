import { GoalsManager } from "../app";
import { StorageManager } from "../db/database";

export async function recoverStoredGoals() {
    const goals = StorageManager.getData()
    
    goals.forEach(goal => {
        GoalsManager.addGoal(goal)
    })
}
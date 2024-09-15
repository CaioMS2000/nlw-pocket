export type Goal = {
	name: string;
    check: boolean;
};


export class GoalsManager {
    private static goals: Array<Goal> = []

    static getGoals(){
        return GoalsManager.goals
    }

    static addGoal(goal:Goal){
        GoalsManager.goals.push(goal)
    }
}
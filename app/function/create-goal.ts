import { input } from '@inquirer/prompts';
import { GoalsManager } from '../app';

export const createGoal = async () => {
    const meta = await input({message: "Qual o nome da meta?"})

    console.log(meta);

    if(!meta || meta.length <= 0) throw new Error("Meta não pode ser vazia")

    GoalsManager.addGoal({name: meta, check: false})

    console.log(GoalsManager.getGoals());
    
    return;
}
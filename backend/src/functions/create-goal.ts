import { db } from "../db";
import { goals } from "../db/schema";

export interface CreateGoalRequest {
	title: string;
	desiredWeeklyFrequency: number;
}

export async function createGoal({
	desiredWeeklyFrequency,
	title,
}: CreateGoalRequest) {
	const result = await db
		.insert(goals)
		.values({
			title,
			desiredWeeklyFrequency,
		})
		.returning();

	const goal = result[0];

	return { goal };
}

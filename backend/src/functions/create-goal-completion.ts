import dayjs from "dayjs";
import { db } from "../db";
import { and, count, eq, gte, lte, sql } from "drizzle-orm";
import { goalCompletions, goals } from "../db/schema";

interface CreateGoalCompletionRequest {
	goalId: string;
}

export async function createGoalCompletion({
	goalId,
}: CreateGoalCompletionRequest) {
	const firstDayOfWeek = dayjs().startOf("week").toDate();
	const lastDayOfWeek = dayjs().endOf("week").toDate();
	const goalCompletionCounts = db.$with("goal_completion_counts").as(
		db
			.select({
				goalId: goalCompletions.goalId,
				completitionCount: count(goalCompletions.id).as(
					"completitionCount"
				),
			})
			.from(goalCompletions)
			.where(
				and(
					gte(goalCompletions.createdAt, firstDayOfWeek),
					lte(goalCompletions.createdAt, lastDayOfWeek),
					eq(goalCompletions.goalId, goalId)
				)
			)
			.groupBy(goalCompletions.goalId)
	);
	const result = await db
		.with(goalCompletionCounts)
		.select({
			desiredWeeklyFrequency: goals.desiredWeeklyFrequency,
			completionCount:
				sql`COALESCE(${goalCompletionCounts.completitionCount}, 0)`.mapWith(
					Number
				),
		})
		.from(goals)
		.leftJoin(
			goalCompletionCounts,
			eq(goalCompletionCounts.goalId, goals.id)
		)
		.where(eq(goals.id, goalId))
		.limit(1);
	const { completionCount, desiredWeeklyFrequency } = result[0];

	if (completionCount >= desiredWeeklyFrequency) {
		throw new Error("Goal already completed this week");
	}

	const insertResult = await db
		.insert(goalCompletions)
		.values({ goalId })
		.returning();
	const goalCompletion = insertResult[0];
	return { goalCompletion };
}
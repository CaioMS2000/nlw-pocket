import dayjs from "dayjs";
import { client, db } from ".";
import { goalCompletions, goals } from "./schema";

export async function seed() {
	await db.delete(goalCompletions);
	await db.delete(goals);

	const createdGoals = await db
		.insert(goals)
		.values([
			{ title: "Acordar cedo", desiredWeeklyFrequency: 5 },
			{ title: "Fazer exercícios", desiredWeeklyFrequency: 3 },
			{ title: "Ler um livro", desiredWeeklyFrequency: 4 },
		])
		.returning();
	const startOfWeek = dayjs().startOf("week");
	const createdCompletitions = await db.insert(goalCompletions).values([
		{
			goalId: createdGoals[0].id,
			createdAt: startOfWeek.toDate(),
			// completedAt: new Date(),
		},
		{
			goalId: createdGoals[1].id,
			createdAt: startOfWeek.add(1, "day").toDate(),
			// completedAt: new Date(),
		},
	]);

	return;
}

seed().finally(() => {
    client.end();
});

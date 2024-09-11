import fastify from "fastify";
import { createGoal } from "../functions/create-goal";
import {
	serializerCompiler,
	validatorCompiler,
	type ZodTypeProvider,
} from "fastify-type-provider-zod";
import z from "zod";
import { getWeekPendingGoals } from "../functions/get-week-pending-goals";
import { createGoalCompletion } from "../functions/create-goal-completion";

const app = fastify().withTypeProvider<ZodTypeProvider>();

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

async function BOOT() {
	app.get("/pending-goals", async () => {
		const { pendingGoals } = await getWeekPendingGoals();
		console.log(pendingGoals);
	});

	app.post(
		"/goals",
		{
			schema: {
				body: z.object({
					title: z.string(),
					desiredWeeklyFrequency: z.number().int().min(1).max(7),
				}),
			},
		},
		async (request) => {
			const { desiredWeeklyFrequency, title } = request.body;
			const res = await createGoal({
				title,
				desiredWeeklyFrequency,
			});

			return res;
		}
	);

	app.post("/completions",{
		schema: {
			body: z.object({
				goalId: z.string(),
			}),
		},
	},
	async (request) => {
		const { goalId } = request.body;
		const res = await createGoalCompletion({
			goalId,
		});

		return res;
	})

	await app.listen({
		port: 3333,
	});

	console.log("HTTP Server Running");
}

BOOT();

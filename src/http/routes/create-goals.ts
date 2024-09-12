import { createGoal } from "@/functions/create-goal";
import { type FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import z from "zod";

export const createGoalRoute: FastifyPluginAsyncZod = async (app) => {
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
};
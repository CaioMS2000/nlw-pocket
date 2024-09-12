import { createGoalCompletion } from "@/functions/create-goal-completion";
import { type FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import z from "zod";

export const createCompletionRoute: FastifyPluginAsyncZod = async (app) => {
	app.post(
		"/completions",
		{
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
		}
	);
};

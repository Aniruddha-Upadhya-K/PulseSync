import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const userRouter = createTRPCRouter({
	updateUser:publicProcedure.input(z.object({
		name: z.string(),
		age: z.number(),
		height: z.number(),
		weight: z.number(),
		gender: z.enum(["Male", "Female", "Other"]).nullish(),
		healthConditions: z.string(),
		medications: z.string(),
	})).mutation(async ({ctx, input})=>{
		await ctx.prisma.user.update({
			where: {
				id: ctx.session?.user.id,
			},
			data: {
				name: input.name,
				age: input.age,
				height: input.height,
				weight: input.weight,
				gender: input.gender,
				previousHealthIssues: input.healthConditions,
				medication: input.medications,
			},
		})
		})
	})

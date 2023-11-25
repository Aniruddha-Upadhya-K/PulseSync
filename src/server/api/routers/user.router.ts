import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const postRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),
});
export const userRouter = createTRPCRouter({
	updateUser:publicProcedure.input(z.object({
		name: z.string(),
		age: z.number(),
		gender: z.enum(["Male", "Female", "Other"]),
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
				gender: input.gender,
				previousHealthIssues: input.healthConditions,
				medication: input.medications,
			},
		})
		})
	})

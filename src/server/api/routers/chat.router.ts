import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import axios from "axios";

type chatHistoryType = {
	user: string;
	model: string;
};
export const chatRouter = createTRPCRouter({
	handleQuery: protectedProcedure
		.input(
			z.object({
				query: z.string(),
			})
		)
		.mutation(async ({ ctx, input }) => {
			let chatid = ctx.session.user.latestChatId;
			if (!chatid) {
				const newChat = await ctx.prisma.chats.create({
					data: {
						user: {
							connect: {
								id: z.string().parse(ctx.session.user.id),
							},
						},
					},
				});
				chatid = newChat.id;
				const response = await axios.post(
					"http://127.0.0.1:8080/completion",
					{
						prompt: "Pretend that this is a conversation between a doctor, and a patient who needs empathetical, supportive responses to motivate him. Reply in a few words around 40-60 to do so. Again you are pretending to be a doctor to be a mental support. patient: " + input.query,
						n_predict: 128,
					},
					{ headers: { "Content-Type": "application/json" } }
				);
				await ctx.prisma.chats.update({
					where: {
						id: chatid,
					},
					data: {
						chatHistory: JSON.stringify([
							{
								user: input.query,
								model: response.data?.content,
							},
						]),
					},
				});
				//convert response to audio
				const lipsyncApiResponse = await axios.post("/api/lipsync", {
					lamaResponse: response.data.content,
				});

				console.log(lipsyncApiResponse.data);
				return {
					text: [
						{ user: input.query, model: response.data.content },
					],
					lipsync: lipsyncApiResponse.data.lipsync,
					audio: lipsyncApiResponse.data.audio,
				};
			} else {
				const context = await ctx.prisma.chats.findUnique({
					where: {
						id: chatid,
					},
				});
				const response = await axios.post(
					"http://127.0.0.1:8080/completion",
					{
						prompt: input.query,
						n_predict: 128,
					},
					{ headers: { "Content-Type": "application/json" } }
				);

				// console.log(response.data)
				//keep context as chat history for later use
				const prevHistory = JSON.parse(context?.chatHistory ?? JSON.stringify([]));
				await ctx.prisma.chats.update({
					where: {
						id: chatid,
					},
					data: {
						chatHistory: JSON.stringify([
							...prevHistory,
							{ user: input.query, model: String(response.data.content) },
						]),
					},
				});

				//convert response to audio
				const lipsyncApiResponse = await axios.post(
					"http://localhost:3000/api/lipsync",
					{
						lamaResponse: response.data.content,
					}
				);

				return {
					text: [
						...prevHistory,
						{ user: input.query, model: response.data.content },
					],
					audio: lipsyncApiResponse.data.audio,
					lipsync: lipsyncApiResponse.data.lipsync,
				};
			}
		}),
	getChatHistory: protectedProcedure.query(async ({ ctx }) => {
		const chatid = ctx.session.user.latestChatId;
		if (!chatid) {
			return { text: null };
		} else {
			const data = await ctx.prisma.chats.findUnique({
				where: {
					id: chatid,
				},
			});
			return { text: JSON.parse(data?.chatHistory ?? JSON.stringify([])) };
		}
	})
});

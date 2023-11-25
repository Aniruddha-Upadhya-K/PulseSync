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
						prompt: input.query,
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

				//keep context as chat history for later use
				const prevHistory = JSON.parse(context?.chatHistory);
				await ctx.prisma.chats.update({
					where: {
						id: chatid,
					},
					data: {
						chatHistory: [
							...prevHistory,
							{ user: input.query, model: response.data.content },
						],
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
			return { text: "No chat history" };
		} else {
			const data = await ctx.prisma.chats.findUnique({
				where: {
					id: chatid,
				},
			});
			return { text: data?.chatHistory };
		}
	})
});

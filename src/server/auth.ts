import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { type GetServerSidePropsContext } from "next";
import {
	getServerSession,
	type DefaultSession,
	type NextAuthOptions,
} from "next-auth";
import GoogleProvider from "next-auth/providers/google";

import { env } from "~/env";
import { prisma } from "~/server/db";

declare module "next-auth" {
	interface Session {
		user: {
			id: string | null | undefined;
			age: number | null | undefined;
			gender: "Male" | "Female" | "Other" | null | undefined;
			height: number | null | undefined;
			weight: number | null | undefined;
			healthConditions: string | null | undefined;
			medications: string | null | undefined;
		} & DefaultSession["user"];
	}
}

export const authOptions: NextAuthOptions = {
	callbacks: {
		session: async ({ session, user }) => {
			if (session?.user) {
				const data = await prisma.user.findUnique({
					where: { id: user.id },
				});

				session.user.id = data?.id;
				session.user.age = data?.age;
				session.user.gender = data?.gender;
				session.user.height = data?.height;
				session.user.weight = data?.weight;
				session.user.healthConditions = data?.previousHealthIssues;
				session.user.medications = data?.medication;
			}
			return session;
		},
	},
	adapter: PrismaAdapter(prisma),
	providers: [
		GoogleProvider({
			clientId: env.GOOGLE_CLIENT_ID,
			clientSecret: env.GOOGLE_CLIENT_SECRET,
		}),
	],
};

export const getServerAuthSession = (ctx: {
	req: GetServerSidePropsContext["req"];
	res: GetServerSidePropsContext["res"];
}) => {
	return getServerSession(ctx.req, ctx.res, authOptions);
};

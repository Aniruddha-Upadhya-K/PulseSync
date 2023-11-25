import { signIn, signOut, useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import Register from "~/components/Register";
import { api } from "~/utils/api";
import Chat from "~/components/Chat";
import { Canvas } from "@react-three/fiber";
import { Environment, OrbitControls } from "@react-three/drei";
/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */
/* @ts-ignore */

import { Avatar1 } from "~/components/3d/Avatar1";

export default function Home() {
	const { data: sessionData } = useSession();

	return (
		<>
			<main className=" flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
				<Register />
				{/* {
          sessionData?<>
          <p className="text-white text-4xl font">Welcome {sessionData.user.name}!</p>
          </>:""
        } */}
				{sessionData ? (
					<Button onClick={() => signOut()} />
				) : (
					<Button onClick={() => signIn("google")}>
						Talk with SyncBot
					</Button>
				)}

				{sessionData?.user.image ? <Chat /> : ""}
				<Canvas shadows camera={{ position: [0, 0, 8], fov: 43 }}>
					<color attach="background" args={["#ececec"]} />
					<OrbitControls />
					{/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
					{/* @ts-ignore */}
					<Avatar1 />
					<Environment preset="apartment" />
				</Canvas>
				<Register />
			</main>
		</>
	);
}

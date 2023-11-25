import { signIn, signOut, useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import Register from "~/components/Register";
import { api } from "~/utils/api";
import Chat from "~/components/Chat";
import { Canvas, useThree } from "@react-three/fiber";
import { Environment, OrbitControls, useTexture } from "@react-three/drei";
/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */
/* @ts-ignore */

import { Avatar } from "~/components/3d/Avatar";

export default function Home() {
  const hello = api.post.hello.useQuery({ text: "from tRPC" });
  const { data: sessionData } = useSession();

  // const texture = useTexture("/assets/texture.png")
  // const viewport = useThree((state) => state.viewport)

  return (
    <>
      <div className="absolute inset-0 -z-50">
        <Canvas shadows camera={{ position: [0, 0, 5], fov: 43 }}>
          <color attach="background" args={["#ececec"]} />
          <OrbitControls />
          {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
          {/* @ts-ignore */}
          <Avatar position={[-1, -3, 1]} scale={2} />
          <Environment preset="apartment" />
          <Scene />
        </Canvas>
      </div>
      <main className="relative z-0 flex min-h-screen flex-col items-center justify-center">
        {/* {
          sessionData?<>
          <p className="text-white text-4xl font">Welcome {sessionData.user.name}!</p>
          </>:""
        } */}
        {sessionData ? (
          ""
        ) : (
          <Button onClick={() => signIn("google")}>Talk with SyncBot</Button>
        )}
        {sessionData?.user.image ? <Chat /> : ""}
        <Register />
      </main>
    </>
  );
}

const Scene = () => {
  const viewport = useThree((state) => state.viewport);
  const texture = useTexture("/assets/texture.png");
  return (
    <mesh>
      <planeGeometry args={[viewport.width, viewport.height]} />
      <meshBasicMaterial map={texture} />
    </mesh>
  );
};

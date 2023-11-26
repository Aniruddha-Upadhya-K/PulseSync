import { signIn, signOut, useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { api } from "~/utils/api";
import Chat from "~/components/Chat";
import { Canvas, useThree } from "@react-three/fiber";
import { Environment, OrbitControls, useTexture } from "@react-three/drei";
import { useEffect } from "react";
/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */
/* @ts-ignore */

import { Avatar } from "~/components/3d/Avatar";
import { use, useState } from "react";

export default function Home() {
  const { data: sessionData } = useSession();
  const [audioAvailable, setAudioAvailable] = useState("");

  const chat = api.chat.handleQuery.useMutation({
    onSuccess(data, variables, context) {
      const blob = new Blob([data?.audio], { type: "audio/mp3" });
      const audio =  URL.createObjectURL(blob);
      setAudioAvailable(audio); 

      console.log("audio blob has transformed into audio source\n", audio);
    },
  });

  // useEffect(() => {
  //   if (audioAvailable) {
  //     audioAvailable.play();
  //   }
  // }, [audioAvailable?.src])
  // console.log(audioAvailable)

  return (
    <>
      <div className="absolute inset-0 z-10">
        <Canvas shadows camera={{ position: [0, 0, 5], fov: 43 }}>
          <color attach="background" args={["#800080"]} />
          <OrbitControls />
          {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
          {/* @ts-ignore */}
          <Avatar
            position={[-1, -3.85, 1.7]}
            scale={2.45}
            audioSpeech={audioAvailable}
            lipsync={chat.data?.lipsync}
          />
          <Environment preset="apartment" />
          <Scene />
        </Canvas>
      </div>
      <main className="absolute right-0 top-0 bottom-0 z-20 flex min-h-screen flex-col items-center justify-center ">
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
        {sessionData?.user.image ? <Chat chatApi={chat} /> : ""}
        {/* <audio autoPlay controls src={audioAvailable}> */}
      </main>
      <audio src={audioAvailable} autoPlay autoFocus className="hidden"></audio>
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

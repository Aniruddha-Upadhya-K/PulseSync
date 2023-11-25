import { signIn, signOut, useSession } from "next-auth/react";
import Head from "next/head";
import { Button } from "@/components/ui/button";
import Register from "~/components/Register";
import { api } from "~/utils/api";
import Chat from "~/components/Chat";


export default function Home() {
  const hello = api.post.hello.useQuery({ text: "from tRPC" });
  const { data: sessionData } = useSession();

  return (
    <> 
      <Head>
        <title>PulseSync</title>
        <meta name="description" content="PulseSync" />
        <link rel="icon" href="/favicon.png" />
      </Head>
      <main className=" flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
        {/* {
          sessionData?<>
          <p className="text-white text-4xl font">Welcome {sessionData.user.name}!</p>
          </>:""
        } */}
        {
          sessionData ? 
          "" :
          <Button onClick={() => signIn("google")}>Talk with SyncBot</Button>
        }
        {
          sessionData?.user.image ? <Chat /> : ""

        }
        <Register />
      </main>
    </>
  );
}

import Link from "next/link";
import Image from "next/image";
import { useSession } from "next-auth/react";
import Register from "~/components/Register";

const Navbar = () => {
  const { data: sessionData } = useSession();

  return (
    <nav className="fixed top-0 z-20 flex w-full items-center justify-between border-b border-gray-400/20 bg-white bg-opacity-5 p-4 text-center drop-shadow-xl backdrop-blur-lg backdrop-filter dark:bg-gray-600 md:text-left">
      <h1 className="flex flex-row justify-between gap-4 text-4xl font-bold text-white md:px-12">
        <Image src="/favicon.png" alt="" height={30} width={40} />
        <Link href="/">PulseSync</Link>
      </h1>
      <div className="">{sessionData ? <Register /> : <div></div>}</div>
    </nav>
  );
};

export default Navbar;

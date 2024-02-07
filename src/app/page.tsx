import Image from "next/image";
import plusImg from "@/assets/+.png";
import Link from "next/link";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

export default async function Home() {
  const session = await getServerSession(authOptions);

  return (
    <main className="flex items-center flex-col justify-center min-h-[calc(100vh-80px)] bg-zinc-900">
      <h2 className="text-6xl text-white mb-10">
        Study<span className="text-blue-600">+</span>
      </h2>
      <div className="flex items-center flex-col justify-center mt-5 mb-28">
        <p className="text-white"> Feito para facilitar sua organização<span className="text-blue-600">!</span></p>
        <span className="text-blue-600 text-2xl">&</span>
        <p className="text-white"> Ajudar na sua rotina<span className="text-blue-600">!</span></p>
      </div>
      <h4 className="absolute bottom-10 text-white">
        Feito por<a className="text-blue-600" href="https://www.linkedin.com/in/victor-lis-bronzo/" target="_blank"> Victor Lis</a>
      </h4>
    </main>
  );
}

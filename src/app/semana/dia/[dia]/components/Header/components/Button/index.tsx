"use client"

import { useRouter } from "next/navigation";
import { FiX } from "react-icons/fi";

export default function Button() {

    const router = useRouter()

  return (
    <div 
        className="flex justify-center items-center hover:opacity-65 duration-300 cursor-pointer"
        onClick={() => router.replace("/semana")}
    >
      <h2 className="text-2xl">Voltar</h2>
      <FiX color="#ff0000" size={35} />
    </div>
  );
}

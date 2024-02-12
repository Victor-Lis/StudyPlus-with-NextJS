"use client";

import Link from "next/link";
import { FiLogOut, FiLoader, FiLock } from "react-icons/fi";
import { LiaCalendarWeekSolid } from "react-icons/lia";
import { signIn, signOut, useSession } from "next-auth/react";

export default function Header() {
  const { status, data } = useSession();

  async function handleLogin() {
    await signIn();
  }

  async function handleLogout() {
    await signOut();
  }

  return (
    <header className="w-full flex items-center px-2 py-4 bg-zinc-900 h-20 shadow-sm">
      <div className="w-full flex items-center justify-between max-w-7x1 mx-auto">
        <Link href={"/"}>
          <h1 className="font-bold text-2x1 hover:tracking-widest duration-300 text-white">
            Study
            <span className="text-blue-600">Plus</span>
          </h1>
        </Link>

        {status === "loading" && (
          <button className="animate-spin">
            <FiLoader size={26} color="#fff" />
          </button>
        )}

        {status === "unauthenticated" && (
          <button onClick={handleLogin}>
            <FiLock size={26} color="#fff" />
          </button>
        )}

        {status === "authenticated" && (
          <div className="flex gap-x-4 items-baseline">
            <Link href={"/semana"} className="hover:scale-110 duration-300 cursor-pointer">
              <LiaCalendarWeekSolid size={24} color="#fff" />
            </Link>

            <button className="hover:scale-110 duration-300 cursor-pointer" onClick={handleLogout}>
              <FiLogOut size={24} color="#ff3a13" />
            </button>
          </div>
        )}
      </div>
    </header>
  );
}

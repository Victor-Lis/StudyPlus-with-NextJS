import { useEffect, useState } from "react";
import { verifyAuth } from "@/utils/verifyAuth";
import { api } from "@/lib/api";
import { DayType } from "@/@types/dia";
import Header from "./components/Header";
import Tarefas from "./components/Tarefas";
import Categorias from "./components/Categorias";

interface ParamsType {
  dia: string;
}

export default async function Dia({ params }: { params: ParamsType }) {

  await verifyAuth();

  return (
    <div className="min-h-[calc(100vh-80px)] bg-zinc-900 text-white">
      <Header params={parseInt(params.dia)}/>
      <div className="w-10/12 mx-auto grid grid-cols-1">
        <Tarefas />
        {/* <Categorias /> */}
      </div>
    </div>
  );
}

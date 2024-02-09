"use client";

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

export default function Dia({ params }: { params: ParamsType }) {
  const [day, setDay] = useState<DayType | null>();

  async function handleGetTasks() {
    let data: DayType = await api
      .get(`/api/day?id=${params.dia}`)
      .then((data) => data.data);
    if (data) {
      setDay(data as DayType);
    }
  }

  useEffect(() => {
    verifyAuth();
    handleGetTasks();
  }, []);

  return (
    <div className="min-h-[calc(100vh-80px)] bg-zinc-900 text-white">
      {day && (
        <>
          <Header day={day} />
          <div className="w-10/12 mx-auto grid grid-cols-2">
            <Tarefas/>
            <Categorias/>
          </div>
        </>
      )}
    </div>
  );
}

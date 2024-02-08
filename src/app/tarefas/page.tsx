"use client";

import prisma from "@/lib/prisma";
import { TarefaType } from "@/@types/tarefa";
import { getTasks } from "./utils/get";
import { useEffect, useState } from "react";
import Header from "./components/Header";
import GridTarefas from "./components/GridTarefas";
import Tarefa from './components/Tarefa'

export default function Tarefas() {
  const [tarefas, setTarefas] = useState<TarefaType[]>([]);

  async function handleGetTasks() {
    let data = await getTasks();
    setTarefas(data);
  }

  useEffect(() => {
    handleGetTasks();
  }, []);

  return (
    <div className="min-h-[calc(100vh-80px)] bg-zinc-900">
      <Header />
      <GridTarefas>
        {tarefas.map((tarefa) => {
          return <Tarefa key={tarefa.id} tarefa={tarefa}/>
        })}
      </GridTarefas>
    </div>
  );
}

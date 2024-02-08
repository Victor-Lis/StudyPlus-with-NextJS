"use client"

import prisma from '@/lib/prisma'
import { Tarefa } from '@/@types/tarefa';
import { getTasks } from './utils/get';
import { useEffect, useState } from 'react';

export default function Tarefas() {

  const [tarefas, setTarefas] = useState<Tarefa[]>([]);

  async function handleGetTasks(){
    let data = await getTasks()
    setTarefas(data)
  }

  useEffect(() => {
    handleGetTasks()
  }, [])

 return (
   <div className="flex items-center flex-col justify-center min-h-[calc(100vh-80px)] bg-zinc-900">
    <h2>Tarefas</h2>
    {tarefas.map((tarefa) => {
      return <h2>{tarefa.title}</h2>
    })}
   </div>
 );
}
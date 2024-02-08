"use server"

import prisma from '@/lib/prisma'
import { Tarefa } from '@/@types/tarefa';

export async function getTasks(){
    let tarefas: Tarefa[] = await prisma.task.findMany()
    tarefas.sort((a,b) => a.date.getTime()-b.date.getTime())
    return tarefas
}
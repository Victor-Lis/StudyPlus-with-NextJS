"use server"

import prisma from '@/lib/prisma'
import { TarefaType } from '@/@types/tarefa';

export async function getTasks(){
    let tarefas: TarefaType[] = await prisma.task.findMany({
        include: {
            Categorie: true
        }
    })
    tarefas.sort((a,b) => a.date.getTime()-b.date.getTime())
    return tarefas
}
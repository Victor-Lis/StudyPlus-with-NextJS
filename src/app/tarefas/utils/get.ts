"use server"

import prisma from '@/lib/prisma'
import { TarefaType } from '@/@types/tarefa';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function getTasks(){

    const session = await getServerSession(authOptions);

    let tarefas: TarefaType[] = await prisma.task.findMany({
        where: {
            User: {
                email: session?.user?.email
            }
        },
        include: {
            Categorie: true,
        }
    })
    tarefas.sort((a,b) => a.date.getTime()-b.date.getTime())

    return tarefas
}
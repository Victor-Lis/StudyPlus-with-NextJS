import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import prismaClient from '@/lib/prisma'
import { TarefaType } from '@/@types/tarefa'
import { redirect } from 'next/navigation'

export async function GET(request: Request){

    const { searchParams } = new URL(request.url)
    const day = searchParams.get("day")

    const session = await getServerSession(authOptions);

    if(!session?.user || !day){
        redirect("/")
    }

    try {
        let tarefas: TarefaType[] = await prismaClient.task.findMany({
            where: {
                day: parseInt(day),
                User: {
                    email: session.user.email
                }
            },
        })
        return NextResponse.json(tarefas || [])
    } catch (error) {
        return NextResponse.json({ error: "Week not found" }, {status: 400})
    }
}
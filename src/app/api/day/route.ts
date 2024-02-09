import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import prismaClient from '@/lib/prisma'
import { DayType } from '@/@types/dia'
import { redirect } from 'next/navigation'

export async function GET(request: Request){

    const { searchParams } = new URL(request.url)
    const id = searchParams.get("id")

    const session = await getServerSession(authOptions);

    if(!session?.user || !id){
        redirect("/")
    }

    try {
        let day: DayType = await prismaClient.day.findFirst({
            where: {
                id: parseInt(id as string),
            }
        }) as DayType

        return NextResponse.json(day)
    } catch (error) {
        return NextResponse.json({ error: "Week not found" }, {status: 400})
    }
}
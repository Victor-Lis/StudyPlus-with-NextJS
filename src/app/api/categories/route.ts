import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import prismaClient from '@/lib/prisma'
import { CategoriaType } from '@/@types/categoria'
import { redirect } from 'next/navigation'

export async function GET(request: Request){

    const { searchParams } = new URL(request.url)
    const session = await getServerSession(authOptions);

    if(!session?.user){
        redirect("/")
    }

    try {
        let categories: CategoriaType[] = await prismaClient.categorie.findMany({
            where:{
                User: {
                    email: session?.user as string,
                }
            }
        })

        return NextResponse.json(categories)
    } catch (error) {
        return NextResponse.json({ error: "Week not found" }, {status: 400})
    }
}
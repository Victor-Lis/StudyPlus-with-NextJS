import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import prismaClient from '@/lib/prisma'
import { DayType } from '@/@types/dia'
import { redirect } from 'next/navigation'
import { User } from '@/@types/user'

export async function GET(request: Request){
    const { searchParams } = new URL(request.url);
  
    const email = searchParams.get("email");
    const id = searchParams.get("id");
  
    if (!email) {
      return NextResponse.json(
        { error: "Email não encontrado" },
        { status: 400 }
      );
    }
  
    if (!id) {
      return NextResponse.json({ error: "Id não encontrado" }, { status: 400 });
    }
  

    try {
        let findUser: User | null = await prismaClient.user.findFirst({
            where: {
              email: {
                equals: email,
              },
            },
          });
        if (findUser?.id.slice(0, 5) === id) {
            return NextResponse.json(findUser)
        }else{
            return NextResponse.json({ error: "Credenciais não batem" }, {status: 400})
        }
    } catch (error) {
        return NextResponse.json({ error: "Usuário não encontrado" }, {status: 400})
    }
}
import { TarefaType } from "@/@types/tarefa";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import Header from "./components/Header";

export default async function Tarefas({ params }: { params: number }) {
  const session = await getServerSession(authOptions);

  async function getTasks() {
    return await prisma.task.findMany({
      where: {
        day: params,
        User: {
          email: session?.user?.email,
        },
      },
    }) as TarefaType[]
  }

  let tarefas: TarefaType[] = await getTasks();

  return (
    <div className="w-full mt-5">
      <Header/>
    </div>
  );
}

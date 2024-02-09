import { TarefaType } from "@/@types/tarefa";
import { api } from "@/lib/api";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import Button from "./components/Button";

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
      <div className="w-full flex justify-between items-center">
        <h2 className="text-3xl text-blue-600">Tarefas</h2>
        <Button/>
      </div>
    </div>
  );
}

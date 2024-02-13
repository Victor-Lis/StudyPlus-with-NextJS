import { TarefaType } from "@/@types/tarefa";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import Header from "./components/Header";
import TarefasGrid from "./components/TarefasGrid";
import { ModalTaskProvider } from "./providers/modalTaskProvider";
import { hourToTime } from "@/utils/hourToTime";

export default async function Tarefas({ params }: { params: number }) {
  const session = await getServerSession(authOptions);

  async function getTasks() {
    let tarefas = await prisma.task.findMany({
      where: {
        day: params,
        User: {
          email: session?.user?.email,
        },
      },
      include: {
        Categorie: true
      }
    }) as TarefaType[]
    let newTarefas = tarefas.sort((a,b) => hourToTime({time: a.primeira_hora})-hourToTime({time: b.primeira_hora}))
    return newTarefas
  }

  let tarefas: TarefaType[] = await getTasks();

  return (
    <ModalTaskProvider dayId={params}>
    <div className="w-full mt-10 md:mt-5">
      <Header/> 
      <TarefasGrid tasks={tarefas}/>
    </div>
    </ModalTaskProvider>
  );
}

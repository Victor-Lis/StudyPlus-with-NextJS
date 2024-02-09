import { TarefaType } from "@/@types/tarefa";
import { FiPlusCircle } from "react-icons/fi";

export default function Tarefas({
  tarefas,
}: {
  tarefas: TarefaType[] | null | undefined;
}) {
  return (
    <div className="w-full mt-5">
      <div className="w-full flex justify-between items-center">
        <h2 className="text-3xl text-blue-600">Tarefas</h2>
        <FiPlusCircle color="rgb(37 235 99)" size={35} className="hover:scale-105 duration-300 cursor-pointer"/>
      </div>
    </div>
  );
}

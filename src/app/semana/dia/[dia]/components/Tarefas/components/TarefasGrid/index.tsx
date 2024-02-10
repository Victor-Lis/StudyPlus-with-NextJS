import { TarefaType } from "@/@types/tarefa";
import Tarefa from "../Tarefa";

export default function TarefasGrid({
  tasks,
}: {
  tasks: TarefaType[];
}) {
  return (
    <>
      {tasks.length ? (
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-2 mt-5">
          {tasks?.map((tarefa) => {
            return <Tarefa tarefa={tarefa} key={tarefa.id}/>;
          })}
        </div>
      ) : (
        <h2 className="text-red">Ainda não há Tarefas...</h2>
      )}
    </>
  );
}

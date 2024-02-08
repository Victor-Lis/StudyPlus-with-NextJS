import { TarefaType } from "@/@types/tarefa";
import { TbClockPlay } from "react-icons/tb";
import { TfiAlarmClock } from "react-icons/tfi";
import { FiTrash2 } from "react-icons/fi";

export default function Tarefa({ tarefa }: { tarefa: TarefaType }) {
  return (
    <div
      className={`flex flex-col justify-between items-center py-5 px-5 bg-[${tarefa?.Categorie?.color}] text-white text-center`}
    >
      <div className="w-full flex justify-between items-center mb-3">
        <input type="checkbox" className="w-5 h-5 accent-green-600" checked={tarefa.completed}/>
        <FiTrash2 size={25} color="#ff0000" />
      </div>
      <h2 className="text-2xl mb-5">{tarefa.title}</h2>
      <p>{tarefa.desc}</p>
      <div className="w-full flex justify-between items-center mt-5">
        <div className="flex justify-center items-center">
          <TbClockPlay size={25} color="#ff0000" />
          <h2>{tarefa.primeira_hora}</h2>
        </div>
        <div className="flex justify-center items-center">
          <TfiAlarmClock size={25} color="#00ff00" />
          <h2>{tarefa.ultima_hora}</h2>
        </div>
      </div>
    </div>
  );
}

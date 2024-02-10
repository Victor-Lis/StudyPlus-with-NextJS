"use client";
import { CategoriaType } from "@/@types/categoria";
import { useContext, useState } from "react";
import { FiEdit, FiTrash, } from "react-icons/fi";
import { TbClockPlay, TbClockPin, TbClockHour3 } from "react-icons/tb";
import { ModalTaskContext } from "../../providers/modalTaskProvider";
import { deleteTask } from "../../utils/functions";
import { useRouter } from "next/navigation";
import { TarefaType } from "@/@types/tarefa";
import { formatNum } from "@/utils/formatNum";

export default function Tarefa({ tarefa }: { tarefa: TarefaType }) {
  const { setEditTarefa } = useContext(ModalTaskContext)
  const [loading, setLoading] = useState<boolean>(false)
  const route = useRouter()

  async function handleDeleteCategorie(){
    setLoading(true)
    await deleteTask({id: tarefa.id})
    route.refresh()
    setLoading(false)
  }

  return (
    <div
      className={
        !loading ? 
         `w-full bg-zinc-800 flex flex-col justify-center items-center rounded`
        : 
         `w-full bg-gray-500 flex flex-col justify-center items-center rounded p-2`
      }
    >
      <h2 className="text-2xl mt-5 mb-4">{tarefa.title}</h2>
      <p className="w-full text-center mb-7 px-5">{tarefa.desc}</p>
      <div className="w-full flex items-center justify-around mb-5">
        <div className="flex items-center justify-center">
          <TbClockPlay color="rgb(37,99,235)" size={27} />
          <h2 className="ml-1">{tarefa.primeira_hora}</h2>
        </div>
        <div className="flex items-center justify-center">
          <TbClockPin color="rgb(37,99,235)" size={27} />
          <h2 className="ml-1">{tarefa.ultima_hora}</h2>
        </div>
      </div>
      <div className="w-full flex items-center justify-center mb-5">
          <TbClockHour3 color="rgb(37,99,235)" size={27} />
          <h2 className="ml-1">{`${formatNum(Math.floor(tarefa.hours/60))}:${formatNum(tarefa.hours%60)}h`}</h2>
      </div>
      <div className="w-full flex items-center justify-around mb-5">
        <FiEdit className="hover:scale-110 duration-300 cursor-pointer" color="#00ff00" size={27} onClick={() => {setEditTarefa(tarefa)}}/>
        <FiTrash className="hover:scale-110 duration-300 cursor-pointer" color="#ff0000" size={30} onClick={() => handleDeleteCategorie()}/>
      </div>
    </div>
  );
}

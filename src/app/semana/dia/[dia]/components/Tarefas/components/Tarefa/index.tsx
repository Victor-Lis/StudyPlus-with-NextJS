"use client";
import { CategoriaType } from "@/@types/categoria";
import { useContext, useState } from "react";
import { FiEdit, FiTrash } from "react-icons/fi";
import { ModalTaskContext } from "../../providers/modalTaskProvider";
import { deleteTask } from "../../utils/functions";
import { useRouter } from "next/navigation";
import { TarefaType } from "@/@types/tarefa";

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
      <h2 className="text-2xl mt-5 mb-6">{tarefa.title}</h2>
      <div className="w-full flex items-center justify-around mb-5">
        <FiEdit className="hover:scale-110 duration-300 cursor-pointer" color="#00ff00" size={27} onClick={() => {setEditTarefa(tarefa)}}/>
        <FiTrash className="hover:scale-110 duration-300 cursor-pointer" color="#ff0000" size={30} onClick={() => handleDeleteCategorie()}/>
      </div>
    </div>
  );
}

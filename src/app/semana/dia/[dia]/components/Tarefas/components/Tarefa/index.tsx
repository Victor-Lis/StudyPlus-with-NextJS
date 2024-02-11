"use client";
import { CategoriaType } from "@/@types/categoria";
import { useContext, useState } from "react";
import { FiEdit, FiTrash, FiBookmark } from "react-icons/fi";
import { TbClockPlay, TbClockPin, TbClockHour3 } from "react-icons/tb";
import { ModalTaskContext } from "../../providers/modalTaskProvider";
import { deleteTask, toggleCompleted } from "../../utils/functions";
import { useRouter } from "next/navigation";
import { TarefaType } from "@/@types/tarefa";
import { formatHours } from "@/utils/formatHours";

export default function Tarefa({ tarefa }: { tarefa: TarefaType }) {
  const { setEditTarefa } = useContext(ModalTaskContext);
  const [loading, setLoading] = useState<boolean>(false);
  const [checked, setChecked] = useState<boolean>(tarefa.completed);
  const route = useRouter();

  async function handleDeleteCategorie() {
    if (!loading) {
      setLoading(true);
      await deleteTask({ id: tarefa.id });
      route.refresh();
      setLoading(false);
    }
  }

  async function handleToggleCompleted() {
    if (!loading) {
      setLoading(true);
      let task = await toggleCompleted({ id: tarefa.id, completed: !checked });
      setChecked(!checked);
      route.refresh();
      setLoading(false);
    }
  }

  return (
    <div
      className={
        !loading
          ? `w-full bg-zinc-800 flex flex-col justify-center items-center rounded my-2`
          : `w-full bg-gray-500 flex flex-col justify-center items-center rounded my-2`
      }
    >
      <h2
        className={`text-2xl mt-5 mb-4 text-center ${
          checked && "line-through"
        }`}
      >
        {tarefa.title}
      </h2>
      <p className="w-full text-center mb-7 px-5">{tarefa.desc}</p>
      <div className="w-full flex items-center justify-around mb-5">
        <div className="flex items-center justify-center">
          <TbClockPlay color="rgb(37,99,235)" size={27} />
          <h1 className="ml-1 hidden sm:flex">Começo:</h1>
          <h2 className="ml-1">{tarefa.primeira_hora}</h2>
        </div>
        <div className="flex items-center justify-center">
          <TbClockPin color="rgb(37,99,235)" size={27} />
          <h1 className="ml-1 hidden sm:flex">Final:</h1>
          <h2 className="ml-1">{tarefa.ultima_hora}</h2>
        </div>
      </div>
      <div className="w-full flex items-center justify-around mb-6">
        <div className="w-full flex items-center justify-center">
          <TbClockHour3 color="rgb(37,99,235)" size={27} />
          <h1 className="ml-1 hidden sm:flex">Total:</h1>
          <h2 className="ml-1">{formatHours(tarefa.hours)}</h2>
        </div>
        <div className="w-full flex items-center justify-center">
          <FiBookmark color={tarefa.Categorie?.bg_color} size={27} />
          <h2 className="ml-1">{tarefa.Categorie?.title}</h2>
        </div>
      </div>
      <div className="w-full flex items-center justify-center mb-5">
        <input
          className="accent-green-600 h-5 w-5 rounded hover:scale-105 hover:opacity-85 hover:cursor-pointer duration-300"
          type="checkbox"
          checked={checked}
          onChange={() => handleToggleCompleted()}
        />
        <h2 className={`ml-2 text-1xl`}>
          {checked ? "Concluída" : "Não concluída"}
        </h2>
      </div>
      <div className="w-full flex items-center justify-around mb-5">
        <div className="flex justify-center items-center gap-x-2">
          <FiEdit
            className="hover:scale-110 duration-300 cursor-pointer"
            color="#00ff00"
            size={27}
            onClick={() => {
              setEditTarefa(tarefa);
            }}
          />
          <h2>Editar</h2>
        </div>
        <div className="flex justify-center items-center gap-x-2">
          <FiTrash
            className="hover:scale-110 duration-300 cursor-pointer"
            color="#ff0000"
            size={30}
            onClick={() => handleDeleteCategorie()}
          />
          <h2>Deletar</h2>
        </div>
      </div>
    </div>
  );
}

"use client";
import { useContext, useEffect, useState, FormEvent } from "react";
import { updateTask, getCategories, verifyTime } from "../../utils/functions";
import { useRouter } from "next/navigation";
import { ModalTaskContext } from "../../../providers/modalTaskProvider";
import { FaSpinner } from "react-icons/fa";
import { CategoriaType } from "@/@types/categoria";

export default function EditForm({ toggleModal }: { toggleModal: () => void }) {
  const { dayId, tarefa } = useContext(ModalTaskContext);
  const [title, setTitle] = useState<string>(tarefa?.title as string);
  const [desc, setDesc] = useState<string>(tarefa?.desc as string);
  const [primeiraHora, setPrimeiraHora] = useState<string>(
    tarefa?.primeira_hora as string
  );
  const [ultimaHora, setUltimaHora] = useState<string>(
    tarefa?.ultima_hora as string
  );
  const [categories, setCategories] = useState<CategoriaType[]>([]);
  const [categorie, setCategorie] = useState<number | undefined>(
    tarefa?.categorie
  );

  const route = useRouter();

  const [loading, setLoading] = useState(false);

  async function handleCreateTask(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!!title && !!desc && primeiraHora && !!ultimaHora && !!categorie && await verifyTime({firstTime: primeiraHora, secondTime: ultimaHora})) {
      setLoading(true);
      let novaTarefa = await updateTask({
        id: tarefa?.id as number,
        title,
        desc,
        primeira_hora: primeiraHora,
        ultima_hora: ultimaHora,
        categorieId: categorie as number,
        dayId,
      });

      if (novaTarefa) {
        route.refresh();
        toggleModal();
      }
    }

    if(!(await verifyTime({firstTime: primeiraHora, secondTime: ultimaHora}))){
      alert("A hora inicial tem que ser menor que a hora final da tarefa!")
    }

    setLoading(false);
  }

  async function handleGetCategories() {
    let data = await getCategories();
    if (data) {
      setCategories(data);
    }
  }

  useEffect(() => {
    handleGetCategories();
  }, []);

  return (
    <>
      <h2 className="text-green-500 text-2xl w-full">Cadastrar Tarefa</h2>
      <form
        className="flex flex-col justify-center items-center text-white"
        onSubmit={(e) => handleCreateTask(e)}
      >
        <div className="mt-10 w-10/12 mx-auto flex flex-col items-center justify-between">
          <div className="flex items-center justify-between w-full">
            <h2 className="mr-2 flex-1">Título</h2>
            <input
              type="text"
              className="border-b-2 border-b-gray-300 px-2 ml-5 w-[48.5%] rounded text-black"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="flex items-center justify-between w-full mt-10">
            <h2 className="mr-2 flex-1">Descrição</h2>
            <textarea
              className="border-b-2 border-b-gray-300 ml-5 flex-1 min-h-18 px-2 py-1 rounded text-black resize-none"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
            />
          </div>
          <div className="flex items-center justify-between w-full mt-10">
            <h2 className="mr-2 flex-1">Começo</h2>
            <input
              type="time"
              className="border-b-2 border-b-gray-300 px-2 ml-5 flex-1 rounded text-black"
              value={primeiraHora}
              onChange={(e) => setPrimeiraHora(e.target.value)}
            />
          </div>
          <div className="flex items-center justify-between w-full mt-10">
            <h2 className="mr-2 flex-1">Fim</h2>
            <input
              type="time"
              className="border-b-2 border-b-gray-300 px-2 ml-5 flex-1 rounded text-black"
              value={ultimaHora}
              onChange={(e) => setUltimaHora(e.target.value)}
            />
          </div>
          <div className="flex items-center justify-between w-full mt-10">
            <h2 className="mr-2 flex-1">Categoria</h2>
            <select
              className="border-b-2 border-b-gray-300 w-[48%] rounded text-black"
              onChange={(e) => setCategorie(parseInt(e.target.value))}
            >
              {categorie === tarefa?.categorie && <option value={""}> </option>}
              {categories.map((categoria) => {
                if (categoria.id !== tarefa?.categorie) {
                  return (
                    <option
                      value={categoria.id}
                      style={{backgroundColor: categoria.bg_color, color: categoria.text_color}}
                    >
                      {categoria.title}
                    </option>
                  );
                }
              })}
            </select>
          </div>
        </div>
        <button
          disabled={loading}
          className={
            !loading
              ? "bg-green-500 mt-10 mx-auto py-1 px-5 hover:text-white hover:scale-105 duration-300 rounded"
              : "bg-gray-500 opacity-75 scale-75 mt-10 mx-auto py-1 px-10 text-white rounded"
          }
        >
          {loading ? (
            <FaSpinner className="animate-spin" color="#fff" size={25} />
          ) : (
            "Atualizar!"
          )}
        </button>
      </form>
    </>
  );
}

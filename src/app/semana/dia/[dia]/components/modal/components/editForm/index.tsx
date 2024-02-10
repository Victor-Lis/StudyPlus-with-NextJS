"use client";
import {
  useContext,
  useEffect,
  useState,
  FormEvent,
} from "react";
import { updateCategorie } from "../../utils/functions";
import { useRouter } from "next/navigation";
import { ModalCategorieContext } from "../../../../providers/modalCategorieProvider";
import { FaSpinner } from "react-icons/fa";

export default function EditForm({ toggleModal }: { toggleModal: () => void }) {
  const { categoria, clearCategoria } = useContext(ModalCategorieContext);

  const [title, setTitle] = useState<string | undefined>(categoria?.title);
  const [color, setColor] = useState<string | undefined>(categoria?.color);

  const route = useRouter();

  const [loading, setLoading] = useState(false)

  async function handleUpdateCategorie(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setLoading(true)
    let novoAluno = await updateCategorie({
      title,
      color,
      id: categoria?.id as number,
    });

    if (novoAluno) {
      route.refresh();
      clearCategoria();
      toggleModal();
    }
    setLoading(false)
  }

  return (
    <>
      <h2 className="text-green-500 text-2xl w-full">Atualizar Aluno</h2>
      <form
        className="flex flex-col justify-center items-center"
        onSubmit={(e) => handleUpdateCategorie(e)}
      >
        <div className="mt-10 w-10/12 mx-auto flex flex-col sm:flex-row md:flex-col items-center justify-between">
          <div className="flex items-center justify-center w-8/12">
            <h2 className="mr-2">Título</h2>
            <input
              type="text"
              className="border-b-2 border-b-gray-300 px-1 w-6/12 rounded text-black"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="flex items-center justify-center w-8/12 mt-10 sm:mt-0 md:mt-10">
            <h2 className="mr-2">Cor</h2>
            <input
              type="color"
              className="border-b-2 border-b-gray-300 px-1 w-6/12 rounded text-black"
              value={color}
              onChange={(e) => setColor(e.target.value)}
            />
          </div>
        </div>
        <button
            disabled={loading}
            className={
              !loading
                ? "bg-green-500 mt-10 mx-auto py-1 px-5 hover:text-white hover:scale-105 duration-300 rounded"
                : "bg-gray-500 mt-10 mx-auto py-1 px-10 text-white rounded"
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

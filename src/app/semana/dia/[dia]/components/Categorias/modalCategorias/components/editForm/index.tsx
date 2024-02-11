"use client";
import {
  useContext,
  useEffect,
  useState,
  FormEvent,
} from "react";
import { updateCategorie } from "../../utils/functions";
import { useRouter } from "next/navigation";
import { ModalCategorieContext } from "../../../providers/modalCategorieProvider";
import { FaSpinner } from "react-icons/fa";

export default function EditForm({ toggleModal }: { toggleModal: () => void }) {
  const { categoria, clearCategoria } = useContext(ModalCategorieContext);

  const [title, setTitle] = useState<string | undefined>(categoria?.title);
  const [backgroundColor, setBackgroundColor] = useState<string>(categoria?.bg_color as string);
  const [textColor, setTextColor] = useState<string>(categoria?.text_color as string);
  const route = useRouter();

  const [loading, setLoading] = useState(false)

  async function handleUpdateCategorie(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setLoading(true)
    let novoAluno = await updateCategorie({
      title,
      bg_color: backgroundColor,
      text_color: textColor,
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
      <h2 className="text-green-500 text-2xl w-full">Editar Categoria</h2>
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
          <div className="flex items-center justify-between w-8/12 mt-10 sm:mt-0 md:mt-10">
            <h2 className="mr-2 min-w-4">Cor do texto</h2>
            <input
              type="color"
              className="border-b-2 border-b-gray-300 px-1 w-6/12 rounded text-black"
              value={textColor}
              onChange={(e) => setTextColor(e.target.value)}
            />
          </div>
          <div className="flex items-center justify-between w-8/12 mt-10 sm:mt-0 md:mt-10">
            <h2 className="mr-2 min-w-4">Cor do fundo</h2>
            <input
              type="color"
              className="border-b-2 border-b-gray-300 px-1 w-6/12 rounded text-black"
              value={backgroundColor}
              onChange={(e) => setBackgroundColor(e.target.value)}
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

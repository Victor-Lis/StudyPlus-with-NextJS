"use client";
import { useEffect, useState, FormEvent } from "react";
import { createCategorie } from "../../utils/functions";
import { useRouter } from "next/navigation";
import { FaSpinner } from "react-icons/fa";

export default function CreateForm({
  toggleModal,
}: {
  toggleModal: () => void;
}) {
  const [title, setTitle] = useState<string>("");
  const [textColor, setTextColor] = useState<string>("#ffffff");
  const [backgroundColor, setBackgroundColor] = useState<string>("#000000");

  const route = useRouter();

  const [loading, setLoading] = useState(false);

  async function handleCreateCategorie(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!!title && !!backgroundColor && !!textColor) {
      setLoading(true);
      let novaCategoria = await createCategorie({
        title,
        bg_color: backgroundColor,
        text_color: textColor,
      });

      if (novaCategoria) {
        route.refresh();
        toggleModal();
      }
    }
    setLoading(false);
  }

  return (
    <>
      <h2 className="text-green-500 text-2xl w-full">Cadastrar Categoria</h2>
      <form
        className="flex flex-col justify-center items-center"
        onSubmit={(e) => handleCreateCategorie(e)}
      >
        <div className="mt-10 w-10/12 mx-auto flex flex-col sm:flex-row md:flex-col items-center justify-between">
          <div className="flex items-center justify-between w-8/12">
            <h2 className="mr-2 min-w-4">Título</h2>
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
              className={`border-b-2 border-b-gray-300 px-1 w-6/12 rounded text-black`}
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
              : "bg-gray-500 opacity-75 scale-75 mt-10 mx-auto py-1 px-10 text-white rounded"
          }
        >
          {loading ? (
            <FaSpinner className="animate-spin" color="#fff" size={25} />
          ) : (
            "Cadastrar!"
          )}
        </button>
      </form>
    </>
  );
}

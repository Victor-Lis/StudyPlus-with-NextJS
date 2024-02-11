"use client";
import { CategoriaType } from "@/@types/categoria";
import { useContext, useState } from "react";
import { FiEdit, FiTrash } from "react-icons/fi";
import { ModalCategorieContext } from "../../providers/modalCategorieProvider";
import { deleteCategorie } from "../../utils/functions";
import { useRouter } from "next/navigation";

export default function Categorie({ categorie }: { categorie: CategoriaType }) {
  const { setEditCategoria } = useContext(ModalCategorieContext)
  const [loading, setLoading] = useState<boolean>(false)
  const route = useRouter()

  async function handleDeleteCategorie(){
    setLoading(true)
    await deleteCategorie({id: categorie.id})
    route.refresh()
    setLoading(false)
  }

  return (
    <div
      className={
        !loading ? 
         `w-full flex flex-col justify-betweem items-center rounded overflow-hidden`
        : 
         `w-full bg-gray-500 flex flex-col justify-betweem items-center rounded overflow-hidden`
      }
      style={{backgroundColor: categorie.bg_color, color: categorie.text_color}}
    >
      <h2 className="text-2xl text-center my-2 flex-1">{categorie.title}</h2>
      <div className="w-full flex items-center justify-around bg-zinc-800 py-2">
        <FiEdit className="hover:scale-110 duration-300 cursor-pointer" color="#00ff00" size={27} onClick={() => {setEditCategoria(categorie)}}/>
        <FiTrash className="hover:scale-110 duration-300 cursor-pointer" color="#ff0000" size={30} onClick={() => handleDeleteCategorie()}/>
      </div>
    </div>
  );
}

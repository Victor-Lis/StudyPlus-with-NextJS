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
         `w-full flex flex-col justify-center items-center rounded my-2`
        : 
         `w-full bg-gray-500 flex flex-col justify-center items-center rounded my-2`
      }
      style={{backgroundColor: categorie.color}}
    >
      <h2 className="text-2xl mt-5 mb-6">{categorie.title}</h2>
      <div className="w-full flex items-center justify-around mb-5">
        <FiEdit className="hover:scale-110 duration-300 cursor-pointer" color="#00ff00" size={27} onClick={() => {setEditCategoria(categorie)}}/>
        <FiTrash className="hover:scale-110 duration-300 cursor-pointer" color="#ff0000" size={30} onClick={() => handleDeleteCategorie()}/>
      </div>
    </div>
  );
}

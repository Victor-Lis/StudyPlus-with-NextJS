import { CategoriaType } from "@/@types/categoria";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { FiPlusCircle } from "react-icons/fi";

export default async function Categorias({params}:{params: number}) {

  const session = await getServerSession(authOptions);

  async function getCategories() {
    return await prisma.categorie.findMany({
      where: {
        User: {
          email: session?.user?.email,
        },
      },
    }) as CategoriaType[]
  }

  let categories: CategoriaType[] = await getCategories();

  return (
    <div className="w-full mt-5">
      <div className="w-full flex justify-between items-center">
        <h2 className="text-3xl text-blue-600">Categorias</h2>
        <FiPlusCircle color="rgb(37 235 99)" size={35} className="hover:scale-105 duration-300 cursor-pointer"/>
      </div>
    </div>
  );
}

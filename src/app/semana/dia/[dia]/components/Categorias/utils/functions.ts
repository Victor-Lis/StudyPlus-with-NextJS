"use server";

import { CategoriaType } from "@/@types/categoria";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";

async function deleteTask({categorie}:{categorie: CategoriaType}){
  categorie?.task.map(async (task, index) => {
    await prisma.task.delete({
      where: {
        id: task.id,
      },
    });

    categorie.task.filter((t) => task.id !== t.id)
  })

  if(categorie.task.length === 0){
    return true
  }
}

async function deleteCategorie({
    id,
  }: {
    id: number;
  }) {

    const initCategorie = await prisma.categorie.findFirst({
      where: {
        id,
      },
      include: {
        task: true,
      }
    }); 

    await deleteTask({categorie: initCategorie as CategoriaType})

    const categorie = await prisma.categorie.delete({
      where: {
        id,
      },
    });
  
    return categorie;
  }

export { deleteCategorie };

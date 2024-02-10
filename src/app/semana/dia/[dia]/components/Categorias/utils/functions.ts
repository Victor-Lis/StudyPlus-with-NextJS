"use server";

import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";

async function deleteCategorie({
    id,
  }: {
    id: number;
  }) {
    const categorie = await prisma.categorie.delete({
      where: {
        id,
      }
    });
  
    return categorie;
  }

export { deleteCategorie };

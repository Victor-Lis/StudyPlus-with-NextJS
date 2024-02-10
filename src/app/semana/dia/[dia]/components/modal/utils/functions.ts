"use server";

import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";

async function createCategorie({
  title,
  color,
}: {
  title: string;
  color: string;
}) {
  const session = await getServerSession(authOptions)

  const categorie = await prisma.categorie.create({
    data: {
      title,
      color,
      User: {
        connect: {
          email: session?.user?.email as string,
        }
      }
    },
  });

  return categorie;
}

async function updateCategorie({
    title,
    color,
    id,
  }: {
    title: string | undefined;
    color: string | undefined;
    id: number;
  }) {
    const categorie = await prisma.categorie.update({
      data: {
        title,
        color,
      },
      where: {
        id,
      }
    });
  
    return categorie;
  }

export { createCategorie, updateCategorie };

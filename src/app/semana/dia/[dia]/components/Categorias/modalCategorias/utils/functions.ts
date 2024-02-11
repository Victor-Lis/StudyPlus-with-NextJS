"use server";

import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";

async function createCategorie({
  title,
  text_color,
  bg_color,
}: {
  title: string;
  text_color: string;
  bg_color: string;
}) {
  const session = await getServerSession(authOptions)

  const categorie = await prisma.categorie.create({
    data: {
      title,
      text_color,
      bg_color,
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
    text_color,
    bg_color,
    id,
  }: {
    title: string | undefined;
    text_color: string | undefined;
    bg_color: string | undefined;
    id: number;
  }) {
    const categorie = await prisma.categorie.update({
      data: {
        title,
        text_color,
        bg_color,
      },
      where: {
        id,
      }
    });
  
    return categorie;
  }

export { createCategorie, updateCategorie };

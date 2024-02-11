"use server";

import { CategoriaType } from "@/@types/categoria";
import { TarefaType } from "@/@types/tarefa";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";

async function createTask({
  title,
  desc,
  primeira_hora,
  ultima_hora,
  categorieId,
  dayId,
}: {
  title: string;
  desc: string;
  primeira_hora: string;
  ultima_hora: string;
  categorieId: number;
  dayId: number;
}) {
  const session = await getServerSession(authOptions);

  if (ultima_hora == "00:00") {
    ultima_hora = "24:00";
  }

  let firstHour = parseInt(primeira_hora.slice(0, 2)) * 60 + parseInt(primeira_hora.slice(3, 5));
  let lastHour = parseInt(ultima_hora.slice(0, 2)) * 60 + parseInt(ultima_hora.slice(3, 5));

  const task = await prisma.task.create({
    data: {
      title,
      desc,
      primeira_hora,
      ultima_hora,
      hours: parseFloat((lastHour - firstHour).toFixed(1)),
      Day: {
        connect: {
          id: dayId,
        }
      },
      Categorie: {
        connect: {
          id: categorieId,
        }
      },
      User: {
        connect: {
          email: session?.user?.email as string,
        },
      },
    },
  });

  return task;
}

async function updateTask({
  id,
  title,
  desc,
  primeira_hora,
  ultima_hora,
  categorieId,
  dayId,
}: {
  id: number,
  title: string;
  desc: string;
  primeira_hora: string;
  ultima_hora: string;
  categorieId: number;
  dayId: number;
}) {
  const session = await getServerSession(authOptions);

  const initTask = await prisma.task.findFirst({
    where: {
      id,
    }
  }) as TarefaType

  if (ultima_hora == "00:00") {
    ultima_hora = "24:00";
  }

  let firstHour = parseInt(primeira_hora.slice(0, 2)) * 60 + parseInt(primeira_hora.slice(3, 5));
  let lastHour = parseInt(ultima_hora.slice(0, 2)) * 60 + parseInt(ultima_hora.slice(3, 5));

  const task = await prisma.task.update({
    where: {
      id,
    },
    data: {
      title,
      desc,
      primeira_hora,
      ultima_hora,
      hours: parseFloat((lastHour - firstHour).toFixed(1)),
      Day: {
        connect: {
          id: dayId,
        }
      },
      Categorie: {
        connect: {
          id: categorieId,
        }
      },
      User: {
        connect: {
          email: session?.user?.email as string,
        },
      },
    },
  });

  return task;
}

async function getCategories() {
  const session = await getServerSession(authOptions);

  return (await prisma.categorie.findMany({
    where: {
      User: {
        email: session?.user?.email,
      },
    },
  })) as CategoriaType[];
}

async function verifyTime({firstTime, secondTime}:{firstTime: string, secondTime: string}){
  let time1 = (parseInt(firstTime[0]+firstTime[1])*60)+parseInt(firstTime[3]+firstTime[4])
  let time2 = (parseInt(secondTime[0]+secondTime[1])*60)+parseInt(secondTime[3]+secondTime[4])
  if(time1 >= time2){
    return false
  }else{
    return true
  }
}

export { createTask, updateTask, getCategories, verifyTime};

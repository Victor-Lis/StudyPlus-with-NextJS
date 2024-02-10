"use server";

import { CategoriaType } from "@/@types/categoria";
import { DayType } from "@/@types/dia";
import { TarefaType } from "@/@types/tarefa";
import { WeekType } from "@/@types/week";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";

export async function sumHours(task: TarefaType){
    let day = await prisma.day.findFirst({
        where: {
            id: task.day
        }
    }) as DayType

    await prisma.day.update({
        where: {
            id: day.id
        },
        data: {
            hours: day.hours + task.hours
        }
    })

    let week = await prisma.week.findFirst({
        where: {
            id: day.week
        }
    }) as WeekType

    await prisma.week.update({
        where: {
            id: week.id
        },
        data: {
            hours: week.hours + task.hours
        }
    })
}

export async function subHours(task: TarefaType){

    let day = await prisma.day.findFirst({
        where: {
            id: task.day
        }
    }) as DayType

    await prisma.day.update({
        where: {
            id: day.id
        },
        data: {
            hours: day.hours - task.hours
        }
    })

    let week = await prisma.week.findFirst({
        where: {
            id: day.week
        }
    }) as WeekType

    await prisma.week.update({
        where: {
            id: week.id
        },
        data: {
            hours: week.hours - task.hours
        }
    })
    
}

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

  sumHours(task)

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

  subHours(initTask)

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

  sumHours(task)

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

export { createTask, updateTask, getCategories, };

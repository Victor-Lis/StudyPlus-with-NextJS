"use server";
 
import prisma from "@/lib/prisma";

async function toggleCompleted({
  id,
  completed
}: {
  id: number;
  completed: boolean;
}){
  const task = await prisma.task.update({
    where: {
      id,
    },
    data: {
      completed,
    },
    include: {
      Categorie: true,
      Day: true,
    }
  })
  return task;
}

async function deleteTask({
    id,
  }: {
    id: number;
  }) {
    const task = await prisma.task.delete({
      where: {
        id,
      }
    });

    return task;
  }

export { deleteTask, toggleCompleted };

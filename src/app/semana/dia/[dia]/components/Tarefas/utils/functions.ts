"use server";

import prisma from "@/lib/prisma";

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

export { deleteTask };

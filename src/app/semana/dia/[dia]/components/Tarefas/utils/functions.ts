"use server";

import prisma from "@/lib/prisma";
import { subHours } from '../modalTarefas/utils/functions'

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
  
    subHours(task)

    return task;
  }

export { deleteTask };

"use client";

import { TarefaType } from "@/@types/tarefa";
import { useEffect, useState } from "react";
import Header from "./components/Header";
import GridWeek from "./components/GridWeek";
import Day from "./components/Day";
import { verifyAuth } from "../utils/verifyAuth";
import { api } from "@/lib/api";
import { WeekType } from "@/@types/week";

export default function Week() {
  const [weeks, setWeeks] = useState<WeekType | null>();

  async function handleGetTasks() {
    let data: WeekType = await api.get("/api/week").then((data) => data.data);
    if (data) {
      setWeeks(data as WeekType);
    }
  }

  useEffect(() => {
    verifyAuth();
    handleGetTasks();
  }, []);

  return (
    <div className="min-h-[calc(100vh-80px)] bg-zinc-900">
      <Header />
      <GridWeek>
        {weeks &&
          weeks?.days?.map((day) => {
            return <Day key={day.id} day={day} />;
          })}
      </GridWeek>
    </div>
  );
}

"use client";

import { TarefaType } from "@/@types/tarefa";
import { useEffect, useState } from "react";
import Header from "./components/Header";
import GridWeek from "./components/GridWeek";
import Day from "./components/Day";
import { verifyAuth } from "@/utils/verifyAuth";
import { api } from "@/lib/api";
import { WeekType } from "@/@types/week";
import { CgSpinner } from "react-icons/cg";
import Footer from "./components/Footer";

export default function Week() {
  const [weeks, setWeeks] = useState<WeekType | null>();

  async function handleGetDays() {
    let data: WeekType = await api.get("/api/week").then((data) => data.data);
    if (data) {
      setWeeks(data as WeekType);
    }
  }

  useEffect(() => {
    verifyAuth();
    handleGetDays();
  }, []);

  return (
    <div className="min-h-[calc(100vh-80px)] bg-zinc-900">
      {weeks ? (
        <>
          <Header />
          <GridWeek>
            {weeks?.days?.map((day) => {
              return <Day key={day.id} day={day} />;
            })}
          </GridWeek>
          <Footer/>
        </>
      ) : (
        <div className="min-h-[calc(100vh-80px)] flex items-center justify-center">
          <CgSpinner size={65} color="#fff" className="animate-spin mb-24" />
        </div>
      )}
    </div>
  );
}

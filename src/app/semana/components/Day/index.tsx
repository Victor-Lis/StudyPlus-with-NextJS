import { DayType } from "@/@types/dia";
import { formatDate } from "@/utils/formatDate";
import { formatHours } from "@/utils/formatHours";
import Link from "next/link";
import { BsListCheck, BsListTask } from "react-icons/bs";
import { TbClockHour8 } from "react-icons/tb";

export default function Day({ day }: { day: DayType }) {

  return (
    <Link
      href={`/semana/dia/${day.id}`}
      className={`flex flex-col justify-between items-center py-5 px-5 bg-zinc-800 text-white text-center rounded hover:scale-105 duration-300`}
    >
      <h2 className="text-3xl">{day.name}</h2>
      <h2 className="text-1xl text-blue-600">{formatDate(new Date(day.date))}</h2>
      <div className="w-full flex flex-col justify-between items-center mt-5 gap-y-5">
        <div className="flex justify-between items-center w-full">
          <BsListTask color="#fff" size={30}/>
          <h1 className="text-blue-600"> Tarefas </h1>
          <h2> {day.tarefas?.length || 0} </h2>
        </div>
        <div className="flex justify-between items-center w-full">
          <BsListCheck color="#fff" size={30}/>
          <h1 className="text-blue-600"> Feitas </h1>
          <h2> {day.tarefas?.filter(day => day.completed)?.length || 0} </h2>
        </div>
        <div className="flex gap-x-2">
          <TbClockHour8 color="#fff" size={25}/>
          <h1 className="text-blue-600"> Horas </h1>
          <h2> {formatHours(day?.hours as number)} </h2>
        </div>
      </div>
    </Link>
  );
}

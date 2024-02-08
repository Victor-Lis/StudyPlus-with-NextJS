import { DayType } from "@/@types/dia";
import Link from "next/link";
import { FaTasks } from "react-icons/fa";
import { TbClockHour8 } from "react-icons/tb";

export default function Day({ day }: { day: DayType }) {

  const formatNum = (n: number) => n < 10? "0"+n : n

  const formatDate = (date: Date) => `${formatNum(date.getDate())}/${formatNum(date.getMonth()+1)}/${date.getFullYear()}`
  
  return (
    <Link
      href={`/tarefas/day/${day.id}`}
      className={`flex flex-col justify-between items-center py-5 px-5 bg-zinc-800 text-white text-center rounded hover:scale-105 duration-300`}
    >
      <h2 className="text-3xl">{day.name}</h2>
      <h2 className="text-1xl text-blue-600">{formatDate(new Date(day.date))}</h2>
      <div className="w-full flex flex-col justify-between items-center mt-5 gap-y-5">
        <div className="flex gap-x-2">
          <FaTasks color="#fff" size={25}/>
          <h1 className="text-blue-600"> Tarefas </h1>
          <h2> {day.tarefas?.length || 0} </h2>
        </div>
        <div className="flex gap-x-2">
          <TbClockHour8 color="#fff" size={25}/>
          <h1 className="text-blue-600"> Horas </h1>
          <h2> {`${day.hours}h` || `0h`} </h2>
        </div>
      </div>
    </Link>
  );
}

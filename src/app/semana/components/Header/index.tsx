import { WeekType } from "@/@types/week";
import { formatHours } from "@/utils/formatHours";

export default function Header({week}:{week: WeekType}) {
 return (
   <header className="w-full flex justify-start items-baseline py-5 px-5">
    <h2 className="text-blue-600 text-4xl">Semana {week.id}</h2>
    <h2 className="text-white text-3xl ml-5">{formatHours(week?.hours as number)}</h2>
   </header>
 );
}
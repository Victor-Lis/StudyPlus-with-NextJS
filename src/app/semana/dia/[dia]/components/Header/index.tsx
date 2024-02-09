import { DayType } from "@/@types/dia";
import { api } from "@/lib/api";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import { FiX } from "react-icons/fi";

export default async function Header({params}:{params: number}) {

  async function getDay() {
    return await prisma.day.findFirst({
      where: {
          id: params,
      },
  }) as DayType
  }

  let day: DayType = await getDay();

  const formatNum = (n: number) => (n < 10 ? "0" + n : n);

  const formatDate = (date: Date) =>
    `${formatNum(date.getDate())}/${formatNum(
      date.getMonth() + 1
    )}/${date.getFullYear()}`;

  return (
    <header className="w-10/12 mx-auto flex items-center justify-between">
      <div className="flex justify-start items-baseline gap-x-5">
        <h2 className="text-4xl">{day?.name}</h2>
        <h3 className="text-3xl text-blue-600">
          {formatDate(new Date(day.date))}
        </h3>
      </div>
      <div className="flex justify-center items-center hover:opacity-65 duration-300 cursor-pointer">
        <h2 className="text-2xl">Voltar</h2> 
        <FiX color="#ff0000" size={35}/>
      </div>
    </header>
  );
}

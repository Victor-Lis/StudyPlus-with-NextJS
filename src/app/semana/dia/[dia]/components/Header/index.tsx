import { DayType } from "@/@types/dia";
import prisma from "@/lib/prisma";
import Button from "./components/Button";
import { formatDate } from "@/utils/formatDate";

export default async function Header({params}:{params: number}) {

  async function getDay() {
    return await prisma.day.findFirst({
      where: {
          id: params,
      },
  }) as DayType
  }

  let day: DayType = await getDay();
  
  return (
    <header className="w-10/12 mx-auto flex items-center justify-between">
      <div className="flex flex-col sm:flex-row justify-start items-baseline gap-x-5">
        <h2 className="text-4xl">{day?.name}</h2>
        <h3 className="text-3xl text-blue-600">
          {formatDate(new Date(day.date))}
        </h3>
      </div>
      <Button/>
    </header>
  );
}

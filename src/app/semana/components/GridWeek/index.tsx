import { ReactNode } from "react";

export default function GridTarefas({children}:{children: ReactNode}) {
 return (
   <div className="w-full grid grid-cols-1 min-[400px]:grid-cols-2 sm:grid-cols-3 md:grid-cols-5 min-[1100px]:grid-cols-7 px-6 py-5 gap-x-3 gap-y-2">
    {children}
   </div>
 );
}
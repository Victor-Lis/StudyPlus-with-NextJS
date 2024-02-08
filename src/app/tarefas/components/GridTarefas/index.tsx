import { ReactNode } from "react";

export default function GridTarefas({children}:{children: ReactNode}) {
 return (
   <div className="w-full grid grid-cols-5 px-6">
    {children}
   </div>
 );
}
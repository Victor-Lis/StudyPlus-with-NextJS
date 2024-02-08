import { TarefaType } from "@/@types/tarefa";

export default function Tarefa({tarefa}:{tarefa: TarefaType}) {

 return (
   <div className={`flex flex-col justify-between items-center py-10 px-5 bg-[${tarefa?.Categorie?.color}] text-white`}>
    <h2 className="text-2xl mb-5">{tarefa.title}</h2>
    <p>{tarefa.desc}</p>
   </div>
 );
}
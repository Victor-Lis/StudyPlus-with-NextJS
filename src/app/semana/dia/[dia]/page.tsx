import { verifyAuth } from "@/utils/verifyAuth";
import Header from "./components/Header";
import Tarefas from "./components/Tarefas";
import Categorias from "./components/Categorias";
import { ModalTaskProvider } from "./components/Tarefas/providers/modalTaskProvider";
interface ParamsType {
  dia: string;
}

export default async function Dia({ params }: { params: ParamsType }) {
  await verifyAuth();

  return (
    <div className="min-h-[calc(100vh-80px)] bg-zinc-900 text-white">
      <Header params={parseInt(params.dia)} />
      <div className="w-10/12 mx-auto grid grid-cols-1 gap-y-5 md:grid-cols-2 md:gap-y-0 gap-x-10">
        <Tarefas params={parseInt(params.dia)} />
        <Categorias params={parseInt(params.dia)} />
      </div>
    </div>
  );
}

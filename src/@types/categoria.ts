import { TarefaType } from "./tarefa";

export interface CategoriaType{
    id: number;
    title: string;
    text_color: string;
    bg_color: string;
    user_id: string;
    task: TarefaType[]
}
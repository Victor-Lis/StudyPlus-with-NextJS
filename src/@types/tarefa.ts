import { CategoriaType } from "./categoria";

export interface TarefaType{
    id: number;
    title: string;
    desc: string;
    primeira_hora: string;
    ultima_hora: string;
    hours: number;
    day: number;
    categorie: number;
    Categorie?: CategoriaType | null;
    user_id: string;
    completed: boolean;
}
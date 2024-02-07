export interface Tarefa{
    id: number;
    title: string;
    desc: string;
    primeira_hora: string;
    ultima_hora: string;
    date: Date;
    hours: number;
    categorie: number;
    completed: boolean;
    user_id: string;
}
import { TarefaType } from "./tarefa";
import { WeekType } from "./week";

export interface DayType{
    id: number;
    hours: number;
    date: Date;
    name: string;
    week: number;
    Week: WeekType
    tarefas?: TarefaType[] | null
}
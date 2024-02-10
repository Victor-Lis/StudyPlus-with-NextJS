import { DayType } from "./dia"

export interface WeekType{
    id: number
    hours?: number
    days: DayType[]
}
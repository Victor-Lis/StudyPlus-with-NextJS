import { formatNum } from "./formatNum"

export const formatHours = (hours: number) => `${formatNum(Math.floor(hours/60))}:${formatNum(hours%60)}h`
import { formatNum } from "./formatNum"
export const formatDate = (date: Date) => `${formatNum(date.getDate())}/${formatNum(date.getMonth()+1)}/${date.getFullYear()}`
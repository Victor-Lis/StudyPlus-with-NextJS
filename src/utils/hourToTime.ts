export function hourToTime({time}:{time: string}): number{
    return (parseInt(time[0]+time[1])*60)+parseInt(time[3]+time[4])
}
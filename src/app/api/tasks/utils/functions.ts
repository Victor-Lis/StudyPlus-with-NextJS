import prisma from "@/lib/prisma"

// export async function sumHours(task){
//     let day = await prisma.day.findFirst({
//         where: {
//             id: task.day
//         }
//     })

//     await prisma.day.update({
//         where: {
//             id: day.id
//         },
//         data: {
//             hours: day.hours + task.hours
//         }
//     })

//     let week = await prisma.week.findFirst({
//         where: {
//             id: day.week
//         }
//     })

//     await prisma.week.update({
//         where: {
//             id: week.id
//         },
//         data: {
//             hours: week.hours + task.hours
//         }
//     })
// }

// export async function subHours(task){

//     let day = await prisma.day.findFirst({
//         where: {
//             id: task.day
//         }
//     })

//     await prisma.day.update({
//         where: {
//             id: day.id
//         },
//         data: {
//             hours: day.hours - task.hours
//         }
//     })

//     let week = await prisma.week.findFirst({
//         where: {
//             id: day.week
//         }
//     })

//     await prisma.week.update({
//         where: {
//             id: week.id
//         },
//         data: {
//             hours: week.hours - task.hours
//         }
//     })
    
// }
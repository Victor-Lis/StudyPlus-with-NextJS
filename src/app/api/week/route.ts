import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import prismaClient from '@/lib/prisma'
import { DayType } from '@/@types/dia'
import { WeekType } from '@/@types/week'
import { redirect } from 'next/navigation'

async function createWeek() {

    let week = await prismaClient.week.create({
        include: {
            days: true,
        }
    })

    let today = new Date()
    let days = []

    while (today.getDay() != 0) {
        today.setDate(today.getDate() - 1)
    }

    for (let i = 0; (today.getDay() <= 6) && (i < 7); i++) {
        days.push(`${today.getDate() < 10 ? '0' + today.getDate() : today.getDate()}/${(today.getMonth() + 1) < 10 ? '0' + (today.getMonth() + 1) : (today.getMonth() + 1)}/${today.getFullYear()}`)
        today.setDate(today.getDate() + 1)
    }

    let daysNames = [
        "Domingo",
        "Segunda",
        "Terça",
        "Quarta",
        "Quinta",
        "Sexta",
        "Sábado",
    ]

    let monthsNames = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ];

    let daysObject: Date[] = []

    days.map((day) => {
        let d = parseInt(day.slice(0, 3))
        let m = parseInt(day.slice(3, 6))
        let y = parseInt(day.slice(6, 10))
        let date = new Date(`${monthsNames[m-1]} ${d} ${y} 23:59:00`)
        daysObject.push(date)
    })

    let daysData = [];

    for (let i = 0; i < daysObject.length; i++) {

        let dayName = daysNames[daysObject[i].getDay()]

        let day = await prismaClient.day.create({
            data: {
                date: daysObject[i],
                name: dayName as string,
                Week: {
                    connect: {
                        id: week.id,
                    }
                },
            },
            include: {
                tarefas: true,
            }
        })

        daysData.push(day)

    }

    week.days = days as unknown as DayType[]

    return week as WeekType
}

// read
export async function GET(request: Request){

    const session = await getServerSession(authOptions);

    if(!session?.user){
        redirect("/")
    }

    try {
        let weeks: WeekType[] = await prismaClient.week.findMany({
            include: {
                days: {
                    include: {
                        tarefas: {
                            where: {
                                User: {
                                    email: session?.user?.email as string
                                }
                            }
                        },
                    }
                },
            }
        })
        weeks.reverse()
        let week: WeekType = weeks[0]

        if(!week || (week.days[6].date.getTime() < new Date().getTime())){
            return NextResponse.json(await createWeek())
        }
        
        let hours = 0;
        let dayHours = 0
        
        week.days.map((day) => {
            day.tarefas?.map((task) => {
                hours+=task.hours
                dayHours += task.hours;
            })
            day["hours"] = dayHours
            dayHours = 0;            
        })

        week["hours"] = hours;
        return NextResponse.json(week)
        
    } catch (error) {
        return NextResponse.json({ error: "Week not found" }, {status: 400})
    }
}
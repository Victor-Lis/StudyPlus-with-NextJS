"use server"

import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export async function verifyAuth(){
    const session = await getServerSession(authOptions);

    if(!session?.user){
        redirect("/")
    }else{
        return true
    }
}
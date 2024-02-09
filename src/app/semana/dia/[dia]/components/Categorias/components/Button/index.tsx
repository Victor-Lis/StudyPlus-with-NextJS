"use client"
import { FiPlusCircle } from "react-icons/fi";

export default function Button() {
 return (
    <FiPlusCircle color="rgb(37 235 99)" size={35} className="hover:scale-105 duration-300 cursor-pointer" onClick={() => console.log("Criando categoria")}/>
 );
}
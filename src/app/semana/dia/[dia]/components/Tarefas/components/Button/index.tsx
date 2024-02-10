"use client"
import { useContext } from "react";
import { FiPlusCircle } from "react-icons/fi";
import { ModalTaskContext } from "../../providers/modalTaskProvider";

export default function Button() {
   
   const { handleModalVisible } = useContext(ModalTaskContext)

 return (
    <FiPlusCircle color="rgb(37 235 99)" size={35} className="hover:scale-105 duration-300 cursor-pointer" onClick={() => handleModalVisible()}/>
 );
}
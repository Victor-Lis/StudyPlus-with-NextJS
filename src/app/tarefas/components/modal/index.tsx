"use client";
import { useContext, useRef, MouseEvent, } from "react";
import { TarefaContext } from '../../providers/tarefaContext'
import CreateForm from "./components/createForm";

export default function Modal(
  { 
    toggleModal, 
  }: 
  { 
    toggleModal: () => void 
  }
) {

  const modalRef = useRef<HTMLDivElement | null>(null);

  const handleModalClick = (e: MouseEvent<HTMLDivElement>) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      toggleModal();
    }
  };

  return (
    <div
      className="absolute bg-gray-900/80 w-full min-h-screen top-0"
      onClick={handleModalClick}
    >
      <div className="absolute inset-0 flex items-center justify-center">
        <div
          className="bg-white shadow-lg w-4/5 md:w-1/2 max-w-2xl p-3 rounded"
          ref={modalRef}
        > 
          <CreateForm toggleModal={toggleModal}/>
        </div>
      </div>
    </div>
  );
}

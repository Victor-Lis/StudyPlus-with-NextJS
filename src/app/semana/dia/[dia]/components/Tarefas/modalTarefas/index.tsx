"use client";
import { useContext, useRef, MouseEvent, } from "react";
import { ModalTaskContext } from "../providers/modalTaskProvider";
import CreateForm from "./components/createForm";
import EditForm from "./components/editForm";

export default function Modal(
  { 
    toggleModal, 
  }: 
  { 
    toggleModal: () => void 
  }
) {

  const { hasTarefa } = useContext(ModalTaskContext)

  const modalRef = useRef<HTMLDivElement | null>(null);

  const handleModalClick = (e: MouseEvent<HTMLDivElement>) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      toggleModal();
    }
  };

  return (
    <div
      className="absolute bg-gray-900/80 min-w-full min-h-screen top-0 left-0 z-10"
      onClick={handleModalClick}
    >
      <div className="absolute inset-0 flex items-center justify-center">
        <div
          className="bg-gray-800 shadow-lg w-4/5 sm:w-2/3 md:w-1/3 max-w-3xl p-3 rounded"
          ref={modalRef}
        > 
          {!hasTarefa && <CreateForm toggleModal={toggleModal}/>}
          {hasTarefa && <EditForm toggleModal={toggleModal}/>}
        </div>
      </div>
    </div>
  );
}

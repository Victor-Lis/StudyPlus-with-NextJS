"use client";
import { useSearchParams } from "next/navigation";
import { createContext, ReactNode, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import Modal from "../components/modal";

interface TarefaContextData {
   toggleModal: () => void
}

export const TarefaContext = createContext({} as TarefaContextData);

export const TarefaProvider = ({ children, }: { children: ReactNode }) => {
  const [visible, setVisible] = useState(false)
  const route = useRouter()

  function toggleModal(){
    setVisible(!visible)
  }

  return (
    <TarefaContext.Provider value={{ toggleModal, }}>
      {!visible && <Modal toggleModal={toggleModal}/>}
      {children}
    </TarefaContext.Provider>
  );
};

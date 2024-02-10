"use client";
import { createContext, ReactNode, useEffect, useState } from "react";
import Modal from "../modalTarefas";
import { TarefaType } from "@/@types/tarefa";

interface ModalTaskContextData {
  visible: boolean;
  handleModalVisible: () => void;
  tarefa: TarefaType | null | undefined;
  hasTarefa: boolean;
  setEditTarefa: (aluno: TarefaType) => void;
  clearTarefa: () => void;
  dayId: number;
}

export const ModalTaskContext = createContext({} as ModalTaskContextData);

export const ModalTaskProvider = ({ children, dayId }: { children: ReactNode, dayId: number }) => {
  const [visible, setVisible] = useState(false);
  const [tarefa, setTarefa] = useState<TarefaType | null>();

  function handleModalVisible() {
    clearTarefa();
    setVisible(!visible);
  }

  function setEditTarefa(tarefa: TarefaType) {
    setTarefa(tarefa);
    setVisible(true);
  }

  function clearTarefa() {
    setTarefa(null);
  }

  useEffect(() => {
    document.body.style.overflow = visible ? "hidden" : "auto";
    if (visible) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [visible]);

  return (
    <ModalTaskContext.Provider
      value={{
        visible,
        handleModalVisible,
        tarefa,
        hasTarefa: !!tarefa,
        setEditTarefa,
        clearTarefa,
        dayId,
      }}
    >
      {visible && <Modal toggleModal={handleModalVisible} />}
      {children}
    </ModalTaskContext.Provider>
  );
};

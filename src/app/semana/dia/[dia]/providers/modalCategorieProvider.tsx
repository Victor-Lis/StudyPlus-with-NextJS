"use client";
import { createContext, ReactNode, useEffect, useState } from "react";
import Modal from "../components/modal";
import { CategoriaType } from "@/@types/categoria";

interface ModalCategorieContextData {
  visible: boolean;
  handleModalVisible: () => void;
  categoria: CategoriaType | null | undefined;
  hasCategoria: boolean;
  setEditCategoria: (aluno: CategoriaType) => void;
  clearCategoria: () => void;
}

export const ModalCategorieContext = createContext({} as ModalCategorieContextData);

export const ModalCategorieProvider = ({ children }: { children: ReactNode }) => {
  const [visible, setVisible] = useState(false);
  const [categoria, setCategoria] = useState<CategoriaType | null>();

  function handleModalVisible() {
    console.log("rodou")
    clearCategoria();
    setVisible(!visible);
  }

  function setEditCategoria(categoria: CategoriaType) {
    setCategoria(categoria);
    setVisible(true);
  }

  function clearCategoria() {
    setCategoria(null);
  }

  useEffect(() => {
    document.body.style.overflow = visible ? "hidden" : "auto";
    if (visible) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [visible]);

  return (
    <ModalCategorieContext.Provider
      value={{
        visible,
        handleModalVisible,
        categoria,
        hasCategoria: !!categoria,
        setEditCategoria,
        clearCategoria,
      }}
    >
      {visible && <Modal toggleModal={handleModalVisible} />}
      {children}
    </ModalCategorieContext.Provider>
  );
};

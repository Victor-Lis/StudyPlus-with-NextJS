"use client";
import {
  useEffect,
  useState,
  FormEvent,
} from "react";
import { createTask } from "../../utils/functions";
import { useRouter } from "next/navigation";
import { FaSpinner } from "react-icons/fa";

export default function CreateForm(  
{ 
  toggleModal, 
}: 
{ 
  toggleModal: () => void 
}) {
  const route = useRouter()

  const [loading, setLoading] = useState(false)

  async function handleCreateAluno(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true)
    setLoading(false)
  }

  return (
    <>
      <h2 className="text-green-500 text-2xl w-full">Criar Tarefa</h2>
        <form
          className="flex flex-col justify-center items-center"
          onSubmit={(e) => handleCreateAluno(e)}
        >
          <button
            disabled={loading}
            className={
              !loading
                ? "bg-green-500 mt-10 mx-auto py-1 px-5 hover:text-white hover:scale-105 duration-300 rounded"
                : "bg-gray-500 mt-10 mx-auto py-1 px-10 text-white rounded"
            }
          >
            {loading ? (
              <FaSpinner className="animate-spin" color="#fff" size={25} />
            ) : (
              "Criar!"
            )}
          </button>
        </form>
    </>
  );
}

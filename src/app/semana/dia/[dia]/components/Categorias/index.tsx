import { CategoriaType } from "@/@types/categoria";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { ModalCategorieProvider } from "../../providers/modalCategorieProvider";
import Header from "./components/Header";
import CategoriesGrid from "./components/CategoriesGrid";

export default async function Categorias({ params }: { params: number }) {
  const session = await getServerSession(authOptions);

  async function getCategories() {
    return (await prisma.categorie.findMany({
      where: {
        User: {
          email: session?.user?.email,
        },
      },
    })) as CategoriaType[];
  }

  let categories: CategoriaType[] = await getCategories();

  return (
    <ModalCategorieProvider>
      <div>
        <Header />
        <CategoriesGrid categories={categories} />
      </div>
    </ModalCategorieProvider>
  );
}

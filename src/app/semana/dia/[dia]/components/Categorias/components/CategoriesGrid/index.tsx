import { CategoriaType } from "@/@types/categoria";
import Categorie from "../Categorie";

export default function CategoriesGrid({
  categories,
}: {
  categories: CategoriaType[];
}) {
  return (
    <>
      {categories.length ? (
        <div className="w-full grid grid-cols-2 gap-2 mt-5">
          {categories?.map((categorie) => {
            return <Categorie categorie={categorie} />;
          })}
        </div>
      ) : (
        <h2 className="text-red">Ainda não há categorias...</h2>
      )}
    </>
  );
}

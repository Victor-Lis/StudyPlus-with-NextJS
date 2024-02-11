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
        <div className="w-full grid min-[400px]:grid-cols-2 gap-2 my-5">
          {categories?.map((categorie) => {
            return <Categorie categorie={categorie} key={categorie.id}/>;
          })}
        </div>
      ) : (
        <h2 className="text-red">Ainda não há categorias...</h2>
      )}
    </>
  );
}

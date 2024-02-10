import Button from "../Button";

export default function Header() {
  return (
    <div className="w-full mt-5">
      <div className="w-full flex justify-between items-center">
        <h2 className="text-3xl text-blue-600">Categorias</h2>
        <Button />
      </div>
    </div>
  );
}

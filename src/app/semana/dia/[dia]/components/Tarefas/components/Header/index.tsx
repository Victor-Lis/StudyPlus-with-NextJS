import Button from "../Button";

export default function Header() {
  return (
    <div className="w-full flex justify-between items-center">
      <h2 className="text-3xl text-blue-600">Tarefas</h2>
      <Button />
    </div>
  );
}

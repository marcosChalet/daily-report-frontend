import { HiMiniTrash } from "react-icons/hi2";
import { useTodoDataDelete } from "../hooks/useTodoDataDelete";

export default function Todo({
  idx,
  id,
  title,
}: {
  idx: number;
  id: number;
  title: string;
}) {
  const { mutate: mutateDelete } = useTodoDataDelete();

  function deletefn() {
    mutateDelete(id);
  }

  return (
    <div
      className={`text-md flex h-16 w-full items-center justify-between px-2 sm:text-lg ${
        idx % 2 == 0 ? "bg-slate-800" : "bg-slate-700"
      }`}
    >
      <p className="overflow-x-hidden whitespace-nowrap">{title}</p>
      <div className="ml-1 flex items-center gap-1">
        <button
          onClick={deletefn}
          className="rounded-full p-1 text-xl text-red-700 duration-300 hover:scale-125"
        >
          <HiMiniTrash />
        </button>
      </div>
    </div>
  );
}

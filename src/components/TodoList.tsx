import { BsThreeDots } from "react-icons/bs";
import { TagType, TodoListType } from "../core/todoListType";
import { useEffect, useState } from "react";

export default function TodoList({
  todoList,
  selectList,
}: {
  todoList: TodoListType;
  selectList: (item: TodoListType) => void;
}) {
  const [isAvaliable, setIsAvaliable] = useState(false);

  useEffect(() => {
    setIsAvaliable(true);
  }, []);

  useEffect(() => {
    if (isAvaliable) {
      selectList(todoList);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [todoList]);

  return (
    <div
      onClick={() => selectList(todoList)}
      key={todoList.id}
      className="relative flex h-36 w-40 items-center justify-center overflow-hidden rounded-md bg-[#12151f] px-3 duration-200 hover:translate-x-1 hover:translate-y-2 hover:cursor-crosshair sm:h-48 sm:w-72"
    >
      <div className="absolute right-2 top-1 p-1 text-2xl text-slate-400 hover:cursor-pointer">
        <BsThreeDots />
      </div>
      <div
        className={`absolute left-2 top-2 h-2 w-2 animate-pulse rounded-full ${
          todoList.todoType === 1
            ? "bg-sky-500"
            : todoList.todoType === 2
              ? "bg-yellow-500"
              : todoList.todoType === 3
                ? "bg-green-600"
                : "bg-sky-500"
        } `}
      />
      <h2 className="flex max-h-36 flex-wrap items-center justify-center bg-gradient-to-r from-rose-600 to-purple-600 bg-clip-text text-left text-xl font-bold uppercase text-transparent sm:text-3xl">
        #{todoList.id}
        {` `}
        {todoList.title}
      </h2>
      <div className="absolute bottom-1 left-1 flex w-[95%] gap-1 overflow-x-clip whitespace-nowrap px-1">
        {todoList.tags.map((tag: TagType) => (
          <p key={tag.id} className="min-w-fit text-xs text-slate-500">
            <strong>#{tag.name.replaceAll(" ", "-")}</strong>
          </p>
        ))}
      </div>
    </div>
  );
}

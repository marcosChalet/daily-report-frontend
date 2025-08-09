import { useEffect, useRef } from "react";
import { BsFillSendPlusFill } from "react-icons/bs";
import { MutateType, TodoType } from "../core/todoType";
import Todo from "./Todo";
import BaseModal from "./BaseModal";
import { TodoListType } from "../core/todoListType";

import { useTodoDataMutate } from "../hooks/useTodoDataMutate";

export default function ModalViewList({
  todoList,
}: {
  todoList: TodoListType | null;
}) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const listRef = useRef<HTMLDivElement | null>(null);
  const { mutate } = useTodoDataMutate(todoList?.title || "");

  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }
  }, [todoList?.todos]);

  function processEvent(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      addTodo();
    }
  }

  function addTodo() {
    const todo: TodoType = {
      todo: inputRef.current?.value ?? "",
    };

    const mutateTodolist: MutateType = {
      id: todoList?.id ?? -1,
      todo,
    };

    mutate(mutateTodolist);
    if (inputRef.current && inputRef.current.value) {
      inputRef.current.value = "";
    }
  }

  return (
    <BaseModal>
      <div className="flex h-full max-h-[60vh] w-full flex-col items-center justify-center overflow-auto sm:max-h-full sm:min-w-[600px]">
        <h1 className="mb-8 inline-block w-full bg-gradient-to-r from-rose-600 to-violet-800 bg-clip-text text-start text-3xl font-bold uppercase text-transparent md:text-4xl">
          {todoList?.title && todoList?.title.length > 45
            ? todoList?.title.slice(0, 45).concat("...")
            : todoList?.title}
        </h1>
        <div
          ref={listRef}
          className="max-h-80 w-full overflow-y-auto rounded-md bg-slate-700"
        >
          {todoList?.todos?.map((todoItem: TodoType, idx: number) => (
            <Todo
              key={todoItem.id}
              idx={idx}
              id={todoItem.id ?? -1}
              title={todoItem.todo}
            />
          ))}
        </div>
        <div className="mt-5 flex h-14 w-full items-center justify-between">
          <input
            ref={inputRef}
            type="text"
            placeholder="Algo novo?"
            onKeyUp={(e) => processEvent(e)}
            className="min-w-64 h-full min-h-[40px] w-full rounded-md rounded-r-none border-2 border-r-0 border-dashed border-slate-500 bg-transparent px-2 text-lg text-slate-300 outline-none"
          />
          <button
            onClick={addTodo}
            className="flex h-full w-12 items-center justify-center rounded-md rounded-l-none border-2 border-l-0 border-dashed border-slate-500 pr-2"
          >
            <BsFillSendPlusFill className="text-2xl text-slate-400 duration-300 hover:scale-125" />
          </button>
        </div>
      </div>
    </BaseModal>
  );
}

import TodoList from "./components/TodoList";
import ModalViewList from "./components/ModalViewList";
import ModalCreateList from "./components/ModalCreateList";
import { TodoListType } from "./core/todoListType";
import { useTodoDataGet } from "./hooks/useListsDataGet";

import { MdNoteAdd } from "react-icons/md";
import { useState } from "react";

export default function App() {
  const { data: todoLists } = useTodoDataGet();
  const [showModal, setShowModal] = useState<boolean>(false);
  const [todoListToShow, setTodoListToShow] = useState<TodoListType>();
  const [showModalCreateList, setShowModalCreateList] =
    useState<boolean>(false);

  function selectList(item: TodoListType) {
    setTodoListToShow(item);
    setShowModal(true);
  }

  function dropModal(
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    cb: () => void,
  ) {
    if (e.clientX === 0 && e.clientY === 0) {
      return;
    }
    cb();
  }

  return (
    <div className="box-border grid h-screen w-screen grid-rows-[90px_1fr] overflow-auto bg-slate-950 text-slate-300 dark:[color-scheme:dark]">
      <header className="flex w-full items-center justify-start px-8">
        <p className="inline-block bg-gradient-to-r from-violet-700 to-red-700 bg-clip-text text-2xl font-bold uppercase text-transparent sm:text-4xl">
          Daily Report
        </p>
      </header>
      <main className="container m-auto px-4 py-10 sm:px-16">
        <section className="flex flex-wrap items-center justify-center gap-8">
          {todoLists
            ?.map((list: TodoListType) => (
              <TodoList key={list.id} todoList={list} selectList={selectList} />
            ))
            .reverse()}
        </section>
      </main>
      <button
        onClick={() => setShowModalCreateList(true)}
        className="sm:right-15 absolute bottom-10 right-10 rounded-es-xl rounded-se-xl bg-gradient-to-r from-rose-600 to-purple-600 p-2 text-3xl duration-300 hover:scale-110 hover:cursor-cell sm:bottom-20 sm:right-20 sm:text-4xl"
      >
        <MdNoteAdd />
      </button>
      {showModal && (
        <div
          onClick={(e) => dropModal(e, () => setShowModal(false))}
          className="absolute h-full w-full overflow-hidden backdrop-blur-sm transition-opacity"
        >
          <ModalViewList todoList={todoListToShow ?? null} />
        </div>
      )}
      {showModalCreateList && (
        <div
          onClick={(e) => dropModal(e, () => setShowModalCreateList(false))}
          className="absolute h-full w-full overflow-hidden backdrop-blur-sm transition-opacity"
        >
          <ModalCreateList
            lastId={todoLists?.length || 0}
            isModalOpen={setShowModalCreateList}
          />
        </div>
      )}
    </div>
  );
}

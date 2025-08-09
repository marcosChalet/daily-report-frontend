import { useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import BaseModal from "./BaseModal";
import { TagType, TodoListType } from "../core/todoListType";

import { useTodoCreateList } from "../hooks/useListDataCreate";

export default function ModalCreateList({
  lastId,
  isModalOpen,
}: {
  lastId: number;
  isModalOpen: (T: boolean) => void;
}) {
  const [id, setId] = useState<number>(lastId + 1);
  const [title, setTitle] = useState<string>("");
  const [type, setType] = useState<number>(1);
  const [tags, setTags] = useState<string[]>([]);
  const [tag, setTag] = useState<string>("");

  const { mutate: insertList } = useTodoCreateList();

  function addTag(e: React.KeyboardEvent<HTMLInputElement>, currText: string) {
    if (currText === "") return;
    if (e.key === "Enter") {
      setTags((prev: string[]) => [...prev, currText]);
      setTag("");
    }
  }

  function changeType(type: number) {
    if (type >= 4 || type <= -1) return;
    setType(type);
  }

  function createList() {
    const tagList: TagType[] = tags.map((tag: string) => {
      const tagTmp: TagType = {
        name: tag,
      };
      return tagTmp;
    });
    const list: TodoListType = {
      title,
      todoType: type,
      tags: tagList,
      todos: [],
    };

    setId((prev) => prev + 1);
    insertList(list);
    isModalOpen(false);
  }

  return (
    <BaseModal>
      <div className="m-auto flex w-full flex-col items-center justify-center gap-y-8">
        <div className="relative flex h-40 w-56 items-center justify-center rounded-md bg-slate-800 px-3 duration-200 hover:translate-x-1 hover:translate-y-2 hover:cursor-crosshair sm:h-48 sm:w-72">
          <div className="absolute right-2 top-1 p-1 text-2xl text-slate-400 hover:cursor-pointer">
            <BsThreeDots />
          </div>
          <div
            className={`absolute left-2 top-2 h-2 w-2 animate-pulse rounded-full ${
              type === 1
                ? "bg-sky-500"
                : type === 2
                  ? "bg-yellow-500"
                  : type === 3
                    ? "bg-green-600"
                    : "bg-sky-500"
            } `}
          />
          <h2 className="flex max-h-36 flex-wrap items-center justify-center bg-gradient-to-r from-rose-600 to-purple-600 bg-clip-text text-left text-3xl font-bold uppercase text-transparent">
            #{id}
            {` `}
            {title}
          </h2>
          <div className="absolute bottom-1 left-1 flex w-[95%] gap-1 overflow-x-clip whitespace-nowrap px-1">
            {tags.map((tag: string) => (
              <p key={tag} className="min-w-fit text-xs text-slate-500">
                <strong>#{tag.replaceAll(" ", "-")}</strong>
              </p>
            ))}
            <p className="min-w-fit text-xs text-slate-500">
              <strong>
                {tag && `#${tag.trimStart().replaceAll(" ", "-")}`}
              </strong>
            </p>
          </div>
        </div>

        <div className="flex h-full w-full items-center justify-center px-2">
          <div className="flex w-[100%] flex-col items-center justify-center gap-y-3 text-slate-400 sm:w-[500px]">
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              type="text"
              placeholder="título"
              className="w-full rounded-sm bg-slate-800 px-3 py-2"
            />
            <input
              value={type}
              onChange={(e) => changeType(+e.target.value)}
              type="number"
              placeholder="tipo"
              className="w-full rounded-sm bg-slate-800 p-2 px-3"
            />
            <input
              value={tag}
              onChange={(e) => setTag(e.target.value.trimStart())}
              type="text"
              placeholder="tag"
              className="w-full rounded-sm bg-slate-800 p-2 px-3"
              onKeyUp={(e) => addTag(e, tag)}
            />

            <button
              onClick={createList}
              type="submit"
              className="text-md h-12 w-full bg-slate-700 font-bold uppercase duration-300 hover:cursor-pointer hover:bg-slate-950 sm:text-lg"
            >
              criar
            </button>
          </div>
        </div>
      </div>
    </BaseModal>
  );
}

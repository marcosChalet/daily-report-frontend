import { TodoType } from "./todoType";

export interface TagType {
  id: number;
  value: string;
}

type LinksType = { todos: { href: string } } | { self: { href: string } };

export type ResponseGet = {
  _embedded: {
    reportResponseList: [TodoListType];
  };
  _links: LinksType;
};

export type TodoListType = {
  id: number;
  title: string;
  type: number;
  tags: TagType[];
  tasks: TodoType[];
  _links?: LinksType;
};

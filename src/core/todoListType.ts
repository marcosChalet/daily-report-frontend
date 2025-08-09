import { TodoType } from "./todoType";

export interface TagType {
  id?: number,
  name: string,
}

type LinksType = 
  | { todos: { href: string } }
  | { self: { href: string } };

export type ResponseGet = {
  _embedded: {
    todolists: [TodoListType];
  }
  _links: LinksType;
}

export type TodoListType = {
  id?: number;
  title: string;
  todoType: number;
  tags: TagType[];
  todos: TodoType[];
  _links?: LinksType
};
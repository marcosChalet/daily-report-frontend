export type TodoType = {
  id?: number;
  todo: string;
};

export type MutateType = {
  id: number;
  todo: TodoType;
}
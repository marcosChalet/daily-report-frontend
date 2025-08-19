export type TodoType = {
  id?: number;
  value: string;
};

export type MutateType = {
  id: number;
  tasks: TodoType;
};

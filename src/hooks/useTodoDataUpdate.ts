import axios, { AxiosPromise } from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { TodoType } from "../core/todoType";

const apiUpdateTodoUrl = `${import.meta.env.VITE_API_URL}/lists/todos`

async function updateTodo(data: TodoType): AxiosPromise<TodoType> {
  const response = await axios.put(`${apiUpdateTodoUrl}/${data.id ?? -1}`, data);
  return response;
}

export function useTodoDataUpdate() {

  const queryClient = useQueryClient()

  const mutate = useMutation({
    mutationFn: updateTodo,
    retry: 2,
    onSuccess: async () => {
      await queryClient.invalidateQueries(['todolists-data'])
    }
  });

  return mutate
}

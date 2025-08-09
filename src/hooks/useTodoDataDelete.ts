import axios, { AxiosPromise } from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { TodoType } from "../core/todoType";

const apiDeleteTodoUrl = `${import.meta.env.VITE_API_URL}/todos`

async function deleteTodo(id: number): AxiosPromise<TodoType> {
  const response = await axios.delete(`${apiDeleteTodoUrl}/${id}`);
  return response;
}

export function useTodoDataDelete() {

  const queryClient = useQueryClient()

  const mutate = useMutation({
    mutationFn: deleteTodo,
    retry: 2,
    onSuccess: async () => {
      await queryClient.invalidateQueries(['todolists-data'])
    }
  });

  return mutate;
}

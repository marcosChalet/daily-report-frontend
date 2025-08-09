import axios, { AxiosPromise } from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { MutateType } from "../core/todoType";

const apiPostListUrl = `${import.meta.env.VITE_API_URL}/todos`

async function postTodos(data: MutateType): AxiosPromise<[MutateType]> {
  const response = await axios.post(`${apiPostListUrl}/${data.id}`, data.todo);
  return response;
}

export function useTodoDataMutate(title: string) {

  const queryClient = useQueryClient()

  const mutate = useMutation({
    mutationFn: postTodos,
    retry: 2,
    mutationKey: [title],
    onSuccess: async () => {
      await queryClient.invalidateQueries(["todolists-data"])
    }
  });

  return mutate
}

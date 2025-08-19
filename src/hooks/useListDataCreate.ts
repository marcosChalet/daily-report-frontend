import axios, { AxiosPromise } from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { TodoListType } from "../core/todoListType";

// eslint-disable-next-line @typescript-eslint/restrict-template-expressions
const apiCreateListUrl = `${import.meta.env.VITE_API_URL}/reports`;

async function createList(data: TodoListType): AxiosPromise<TodoListType> {
  const response = await axios.post(apiCreateListUrl, data);
  return response;
}

export function useTodoCreateList() {
  const queryClient = useQueryClient();
  const mutate = useMutation({
    mutationFn: createList,
    retry: 2,
    onSuccess: async () => {
      await queryClient.invalidateQueries(["@dailyReport-report-data"]);
    },
  });

  return mutate;
}

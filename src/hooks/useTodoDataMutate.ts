import axios, { AxiosPromise } from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { MutateType } from "../core/todoType";

// eslint-disable-next-line @typescript-eslint/restrict-template-expressions
const apiPostListUrl = `${import.meta.env.VITE_API_URL}/reports`;

async function postTodos(data: MutateType): AxiosPromise<[MutateType]> {
  const response = await axios.post(
    `${apiPostListUrl}/${data.id}/tasks`,
    data.tasks,
  );
  return response;
}

export function useTodoDataMutate(title: string) {
  const queryClient = useQueryClient();

  const mutate = useMutation({
    mutationFn: postTodos,
    retry: 2,
    mutationKey: [title],
    onSuccess: async () => {
      await queryClient.invalidateQueries(["@dailyReport-report-data"]);
    },
  });

  return mutate;
}

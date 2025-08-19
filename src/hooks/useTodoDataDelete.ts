import axios, { AxiosPromise } from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { TodoType } from "../core/todoType";

// eslint-disable-next-line @typescript-eslint/restrict-template-expressions
const apiDeleteTodoUrl = `${import.meta.env.VITE_API_URL}/reports`;

async function deleteTodo(ids: {
  reportId: number;
  taskId: number;
}): AxiosPromise<TodoType> {
  const response = await axios.delete(
    `${apiDeleteTodoUrl}/${ids.reportId}/tasks/${ids.taskId}`,
  );
  return response;
}

export function useTodoDataDelete() {
  const queryClient = useQueryClient();

  const mutate = useMutation({
    mutationFn: deleteTodo,
    retry: 2,
    onSuccess: async () => {
      await queryClient.invalidateQueries(["@dailyReport-report-data"]);
    },
  });

  return mutate;
}

import axios, { AxiosPromise } from "axios";
import { useQuery } from "@tanstack/react-query";
import { ResponseGet } from "../core/todoListType";

// eslint-disable-next-line @typescript-eslint/restrict-template-expressions
const apiFetchTodoUrl = `${import.meta.env.VITE_API_URL}/reports?sort=updatedAt,desc`;

async function fetchTodos(): AxiosPromise<ResponseGet> {
  const response = await axios.get(apiFetchTodoUrl);
  return response;
}

export function useTodoDataGet() {
  const query = useQuery({
    queryFn: fetchTodos,
    queryKey: ["@dailyReport-report-data"],
    retry: 2,
  });

  return {
    ...query,
    data: query.data?.data?._embedded?.reportResponseList,
  };
}

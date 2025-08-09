import axios, { AxiosPromise } from "axios";
import { useQuery } from "@tanstack/react-query";
import { ResponseGet } from "../core/todoListType";

const apiFetchTodoUrl = `${import.meta.env.VITE_API_URL}/todolists`

async function fetchTodos(): AxiosPromise<ResponseGet> {
  const response = await axios.get(apiFetchTodoUrl);
  return response;
}

export function useTodoDataGet() {
  const query = useQuery({
    queryFn: fetchTodos,
    queryKey: ["todolists-data"],
    retry: 2,
  });

  return {
    ...query,
    data: query.data?.data?._embedded?.todolists,
  };
}
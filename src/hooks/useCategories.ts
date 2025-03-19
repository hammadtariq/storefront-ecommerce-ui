import useSWR from "swr";
import { fetcher } from "../api/integration";
import { Category } from "../types/Category";

export function useCategories() {
  const { data, error } = useSWR(["/categories"], ([url]) =>
    fetcher<{ categories: Category[] }, never>(url)
  );

  return {
    categories: data?.categories.length ? data.categories : [],
    isLoading: !error && !data,
    isError: error,
  };
}

export function useCategory(id: string | null) {
  const { data, error } = useSWR(id ? [`/categories/${id}`] : null, ([url]) =>
    fetcher<{ category: Category }, never>(url)
  );

  return {
    category: data?.category,
    isLoading: id && !error && !data,
    isError: error,
  };
}

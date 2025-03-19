import useSWR from "swr";
import { Product, ProductParams } from "../types/Product";
import { Category } from "../types/Category";
import { fetcher } from "../api/integration";

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

export function useProducts(params?: ProductParams) {
  const { data, error } = useSWR([`/products`, params], ([url]) =>
    fetcher<Product[], ProductParams>(url, params)
  );

  return {
    products: data?.length ? data : [],
    isLoading: !error && !data,
    isError: error,
  };
}

export function useProduct(id: string | null) {
  const { data, error } = useSWR(id ? [`/products/store/${id}`] : null, ([url]) =>
    fetcher<Product, never>(url)
  );

  return {
    product: data,
    isLoading: id && !error && !data,
    isError: error,
  };
}

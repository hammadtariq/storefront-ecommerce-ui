import useSWR from "swr";
import { Product, ProductParams } from "../types/Product";
import { fetcher } from "../api/integration";

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

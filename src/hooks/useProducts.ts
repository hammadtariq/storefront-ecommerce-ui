import { useEffect, useState } from "react";
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
  const { data, error } = useSWR(
    id ? [`/products/store/${id}`] : null,
    ([url]) => fetcher<Product, never>(url)
  );

  return {
    product: data,
    isLoading: id && !error && !data,
    isError: error,
  };
}

export function useProductDetails(params?: ProductParams) {
  const { products, isLoading: productsLoading } = useProducts(params);
  const [productDetails, setProductDetails] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (products.length) {
      setLoading(true);
      const productPromises = products.map((product: Product) =>
        fetcher<Product, never>(`/products/store/${product.id}`)
      );

      Promise.all(productPromises)
        .then((details) => setProductDetails(details))
        .finally(() => setLoading(false));
    }
  }, [products]);

  return {
    products: productDetails,
    isLoading: loading || productsLoading,
  };
}

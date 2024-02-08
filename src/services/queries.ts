import { useQuery } from "@tanstack/react-query";
import client from "../utils/client";
import { useProductStore } from "../store/ProductStore";

export const useCategory = () => {
  const { setCategory } = useProductStore();
  const { data: categories } = useQuery<string[]>({
    queryKey: ["categories"],
    queryFn: async () => {
      const response = await client.get<string[]>("categories");
      const data = response.data;
      return data;
    },
    onSuccess: (response) => {
      setCategory(response);
    },
  });

  return { categories };
};

export const useProduct = () => {
  const { setProducts } = useProductStore();
  const {
    filter: { limit, skip, q, category },
  } = useProductStore();

  const { data, isError, isLoading } = useQuery({
    queryKey: ["products", limit, skip, q, category],
    queryFn: async () => {
      const endpoint = category
        ? `category/${category}?limit=${limit}&skip=${skip}`
        : `search?limit=${limit}&skip=${skip}&q=${q}`;
      const response = await client.get(endpoint);
      const data = response?.data;
      return data;
    },
    onSuccess: (response) => {
      setProducts(response);
    },
    keepPreviousData: true,
  });

  return {
    data,
    isError,
    isLoading,
  };
};

import { useQuery, keepPreviousData } from "@tanstack/react-query";
import client from "../utils/client";
import { useProductStore } from "../store/ProductStore";

export const useProduct = () => {
  const {
    filter: { limit, skip, q, category },
  } = useProductStore();

  const { data, isError, isPending } = useQuery({
    queryKey: ["products", limit, skip, q, category],
    queryFn: async () => {
      const endpoint = category
        ? `category/${category}?limit=${limit}&skip=${skip}`
        : `search?limit=${limit}&skip=${skip}&q=${q}`;
      const response = await client.get(endpoint);
      const data = response?.data;
      return data;
    },
    placeholderData: keepPreviousData,
  });

  return {
    data,
    isError,
    isPending,
  };
};

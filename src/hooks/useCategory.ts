import { useQuery } from "@tanstack/react-query";
import client from "../utils/client";

export const useCategory = () => {
  const { data: categories } = useQuery<string[]>({
    queryKey: ["categories"],
    queryFn: async () => {
      const response = await client.get<string[]>("categories");
      const data = response.data;
      return data;
    },
  });

  return { categories };
};

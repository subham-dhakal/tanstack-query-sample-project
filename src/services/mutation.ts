import { useMutation, useQueryClient } from "@tanstack/react-query";
import client from "../utils/client";
import { ProductsType } from "../@types/product";

export const useAddProducts = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (newProduct: ProductsType) => {
      return client.post("add", newProduct);
    },
    // onMutate: () => {
    //   console.log("mutate");
    // },
    // onError: () => {
    //   console.log("error");
    // },
    // onSuccess: () => {
    //   console.log("success");
    // },
    onSettled: (_, error) => {
      if (error) {
        console.log(error);
      }
      queryClient.invalidateQueries({ queryKey: ["products"] }); // refetches the data
    },
  });

  return { mutation };
};

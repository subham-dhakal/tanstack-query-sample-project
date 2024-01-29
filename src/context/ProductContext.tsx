import React, { createContext, useContext } from "react";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import client from "../utils/client";
import { SelectChangeEvent } from "@mui/material/Select";
import { useSearchParams } from "react-router-dom";
import { ProductContextProps } from "../@types/product";

const ProductContext = createContext<ProductContextProps | undefined>(
  undefined
);

export const useProductContext = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error("useProductContext must be used within a ProductProvider");
  }
  return context;
};

export const ProductProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [searchParams, setSearchParams] = useSearchParams({
    skip: "0",
    limit: "8",
  });
  const skip: number = parseInt(searchParams.get("skip") || "0");
  const limit: number = parseInt(searchParams.get("limit") || "8");
  const q: string = searchParams.get("q") || "";
  const category: string = searchParams.get("category") || "";

  const handleCategoryChange = (e: SelectChangeEvent) => {
    setSearchParams((prev) => {
      prev.set("category", e.target.value);
      prev.delete("q");
      prev.set("skip", "0");
      return prev;
    });
  };

  const { data: categories } = useQuery<string[]>({
    queryKey: ["categories"],
    queryFn: async () => {
      const response = await client.get<string[]>("categories");
      const data = response.data;
      return data;
    },
  });

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

  const handlePage = (moveCount: number) => {
    setSearchParams((prev) => {
      prev.set("skip", Math.max(skip + moveCount, 0).toString());
      return prev;
    });
  };

  const contextValue: ProductContextProps = {
    searchParams,
    setSearchParams,
    categories,
    data,
    isError,
    isPending,
    handleCategoryChange,
    handlePage,
  };

  return (
    <ProductContext.Provider value={contextValue}>
      {children}
    </ProductContext.Provider>
  );
};

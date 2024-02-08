import { create } from "zustand";
import { SelectChangeEvent } from "@mui/material/Select";
import debounce from "lodash.debounce";
import { DataResponseType } from "../@types/product";

type FilterType = {
  limit: string;
  skip: string;
  category?: string;
  q?: string;
};

interface ProductStore {
  data: DataResponseType | null;
  categories: string[] | undefined;
  setProducts: (data: DataResponseType) => void;
  setCategory: (data: string[]) => void;
  filter: FilterType;
  handleCategoryChange: (e: SelectChangeEvent) => void;
  handlePage: (moveCount: number) => void;
  handleSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const useProductStore = create<ProductStore>()((set) => ({
  data: null,
  categories: [],
  setProducts: async (data) => {
    set({ data });
  },
  setCategory: async (data) => {
    set({ categories: data });
  },
  filter: { limit: "8", skip: "0", category: "", q: "" },
  handleCategoryChange: (e: SelectChangeEvent) => {
    set((state) => ({
      ...state,
      filter: {
        ...state.filter,
        category: e.target.value,
        q: "",
        skip: "0",
      },
    }));
  },
  handlePage: (moveCount: number) => {
    set((state) => ({
      ...state,
      filter: {
        ...state.filter,
        skip: Math.max(parseInt(state.filter.skip) + moveCount, 0).toString(),
      },
    }));
  },
  handleSearchChange: debounce((e: React.ChangeEvent<HTMLInputElement>) => {
    set((state) => ({
      ...state,
      filter: {
        ...state.filter,
        q: e.target.value,
        category: "",
        skip: "0",
      },
    }));
  }, 1000),
}));

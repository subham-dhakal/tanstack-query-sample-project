import { create } from "zustand";
import { SelectChangeEvent } from "@mui/material/Select";
import debounce from "lodash.debounce";

type FilterType = {
  limit: string;
  skip: string;
  category?: string;
  q?: string;
};

interface ProductStore {
  filter: FilterType;
  handleCategoryChange: (e: SelectChangeEvent) => void;
  handlePage: (moveCount: number) => void;
  handleSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const useProductStore = create<ProductStore>()((set) => ({
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

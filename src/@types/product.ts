import { SelectChangeEvent } from "@mui/material/Select";

export type ProductsType = {
  id?: number;
  title: string;
  price?: string;
  discountPercentage?: number;
  rating?: number;
  stock?: number;
  brand?: string;
  category?: string;
  description: string;
  thumbnail?: string;
  images?: string[];
};

export type DataResponseType = {
  products: ProductsType[];
  total: number;
  skip: number;
  limit: number;
};

export type SearchParamsType = {
  limit?: string;
  skip?: string;
  category?: string;
  q?: string;
};

export interface ProductContextProps {
  searchParams: URLSearchParams;
  categories: string[] | undefined;
  data: DataResponseType;
  isError: boolean;
  isPending: boolean;
  handleCategoryChange: (e: SelectChangeEvent) => void;
  handlePage: (moveCount: number) => void;
  handleSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

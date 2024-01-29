import { SelectChangeEvent } from "@mui/material/Select";

export type ProductsType = {
  id: number;
  title: string;
  price: string;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  description: string;
  thumbnail: string;
  images: string[];
};

export type DataResponseType = {
  products: ProductsType;
  total: number;
  skip: number;
  limit: number;
};

export interface ProductContextProps {
  searchParams: URLSearchParams;
  categories: string[] | undefined;
  products: ProductsType;
  isError: boolean;
  isPending: boolean;
  handleCategoryChange: (e: SelectChangeEvent) => void;
  handlePage: (moveCount: number) => void;
  setSearchParams: URLSearchParams;
}

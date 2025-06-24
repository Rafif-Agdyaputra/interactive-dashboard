import axios from "axios";

export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
}

export interface ProductResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}

export const fetchProducts = async (
  search = "",
  limit = 10,
  skip = 0,
  sortBy: "price" | "rating" = "price",
  order: "asc" | "desc" = "asc"
): Promise<ProductResponse> => {
  let url = `https://dummyjson.com/products?limit=${limit}&skip=${skip}&sortBy=${sortBy}&order=${order}`;

  if (search.trim() !== "") {
    url = `https://dummyjson.com/products/search?q=${encodeURIComponent(search)}&limit=${limit}&skip=${skip}&sortBy=${sortBy}&order=${order}`;
  }

  const response = await axios.get<ProductResponse>(url);
  return response.data;
};


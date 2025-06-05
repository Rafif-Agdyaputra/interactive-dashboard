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

export const fetchProducts = async (): Promise<ProductResponse> => {
  const response = await axios.get<ProductResponse>('https://dummyjson.com/products');
  return response.data;
};
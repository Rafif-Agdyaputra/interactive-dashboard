import axios from "axios";

export interface CartProduct {
  id: number;
  title: string;
  price: number;
  quantity: number;
  total: number;
  discountPercentage: number;
  discountedPrice: number;
  thumbnail: string;
}

export interface Cart {
  id: number;
  products: CartProduct[];
  total: number;
  discountedTotal: number;
  userId: number;
  totalProducts: number;
  totalQuantity: number;
}

export interface CartResponse {
  carts: Cart[];
  total: number;
  skip: number;
  limit: number;
}

export const fetchCarts = async (skip: number, limit: number): Promise<CartResponse> => {
  const response = await axios.get<CartResponse>(`https://dummyjson.com/carts?skip=${skip}&limit=${limit}`);
  return response.data;
};

export async function fetchCartById(id: number): Promise<Cart | null> {
  try {
    const res = await fetch(`https://dummyjson.com/carts/${id}`);
    if (!res.ok) return null;
    const data = await res.json();
    return data;
  } catch (err) {
    return null;
  }
}
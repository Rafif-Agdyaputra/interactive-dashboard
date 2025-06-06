import axios from "axios";

export interface Recipe {
  id: number;
  name: string;
  ingredients: string[];
  instructions: string[];
  prepTimeMinutes: number;
  cookTimeMinutes: number;
  servings: number;
  difficulty: string;
  cuisine: string;
  caloriesPerServing: number;
  tags: string[];
  userId: number;
  image: string;
  rating: number;
  reviewCount: number;
  mealType: string[];
}

export interface RecipeResponse {
  recipes: Recipe[];
  total: number;
  skip: number;
  limit: number;
}

export const fetchRecipes = async (skip: number, limit: number): Promise<RecipeResponse> => {
  const response = await axios.get<RecipeResponse>(`https://dummyjson.com/recipes?skip=${skip}&limit=${limit}`);
  return response.data;
};

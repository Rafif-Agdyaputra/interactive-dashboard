This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/pages/api-reference/create-next-app).

## ✨ Features

* Recipes page with filter by `tag` and `meal type`
* Charts for analytics (e.g. most spending users, highest rated recipes)
* Dynamic pagination and "Load More" button
* TypeScript & Axios based API integrations (`/recipes`, `/carts`)
* Modern UI with skeleton loading
* Modular components (e.g. `<CardRecipe />`, `<ButtonLoadMore />`)
* API layer abstraction (`recipes-api.ts`, `carts-api.ts`)

## Getting Started

First, install the dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

Run the project

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# docker
docker run -p 3000:3000 interactive-dashboard
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📦 API Usage

This project integrates with [DummyJSON](https://dummyjson.com/) for testing APIs:

* Recipes endpoint:
  `https://dummyjson.com/recipes`
  Filters supported:

  * By tag: `/recipes/tag/:tag`
  * By meal type: `/recipes/meal-type/:type`

* Carts endpoint:
  `https://dummyjson.com/carts`
  Includes analytics such as total spending, quantity, discounts, etc.

## 🧪 Example API Functions

Inside `api/recipes-api.ts`:

```ts
export const fetchRecipes = async (skip: number, limit: number): Promise<RecipeResponse> => {
  const response = await axios.get(`https://dummyjson.com/recipes?skip=${skip}&limit=${limit}`);
  return response.data;
};

export const fetchRecipesByTag = async (tag: string): Promise<RecipeResponse> => {
  const response = await axios.get(`https://dummyjson.com/recipes/tag/${tag}`);
  return response.data;
};

export const fetchRecipesByMealType = async (type: string): Promise<RecipeResponse> => {
  const response = await axios.get(`https://dummyjson.com/recipes/meal-type/${type}`);
  return response.data;
};
```

## 🖼 Chart Integrations

Implemented using chart libraries such as ApexChart. Example charts:

* Top 5 Most Spending Users
* Top 5 Highest Rated Recipes

Charts fetch data from API and render responsive components in dashboard.

## Learn More

To learn more about Next.js, take a look at the following resources:

* [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
* [Learn Next.js](https://nextjs.org/learn-pages-router) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

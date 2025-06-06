import { useState, useEffect } from "react";
import { fetchRecipes, Recipe } from "../../../api/recipes-api";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function RecipesPage() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [skip, setSkip] = useState(0);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const limit = 6;

  const loadMoreRecipes = async () => {
      if (loading || !hasMore) return;
      setLoading(true);
      try {
        const data = await fetchRecipes(skip, limit);
        setRecipes((prev) => [...prev, ...data.recipes]);
        setSkip((prev) => prev + limit);
        if (skip + limit >= data.total) setHasMore(false);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
  
    useEffect(() => {
      loadMoreRecipes();
    }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-3xl font-bold text-center text-blue-700 mb-10">Delicious Recipes</h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {recipes.map((recipe) => (
          <div
            key={recipe.id}
            className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all p-4 flex flex-col items-center"
          >
            <img
              src={recipe.image}
              alt={recipe.name}
              className="w-full h-48 object-cover rounded-xl mb-4"
            />
            <h2 className="text-xl font-semibold text-center text-gray-800 mb-2">
              {recipe.name}
            </h2>
            <div className="text-sm text-gray-600 space-y-1 text-center">
              <p>🧑‍🍳 Difficulty: {recipe.difficulty}</p>
              <p>🍽 Servings: {recipe.servings}</p>
              <p>
                ⏱️ Time: {recipe.prepTimeMinutes + recipe.cookTimeMinutes} mins
              </p>
              <p>🔥 Calories: {recipe.caloriesPerServing} kcal</p>
            </div>
            <div className="mt-4 flex flex-wrap gap-2 justify-center">
              {recipe.tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        ))}

        {loading &&
          Array.from({ length: 3 }).map((_, idx) => (
            <div
              key={idx}
              className="bg-white p-4 rounded-2xl shadow space-y-3 animate-pulse"
            >
              <Skeleton height={192} className="rounded-xl" />
              <Skeleton height={24} width="80%" className="mx-auto" />
              <Skeleton height={14} count={4} />
              <Skeleton height={24} width="60%" className="mx-auto" />
            </div>
          ))}
      </div>

      {hasMore && (
        <div className="text-center mt-8">
          <button
            onClick={loadMoreRecipes}
            className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm shadow"
          >
            {loading ? "Loading..." : "Load More"}
          </button>
        </div>
      )}
    </div>
  );
}

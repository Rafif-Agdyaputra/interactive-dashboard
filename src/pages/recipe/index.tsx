import { useState, useEffect } from "react";
import { fetchRecipes, Recipe } from "../../../api/recipes-api";
import Skeleton from "react-loading-skeleton";
import ButtonLoadMore from "../../../component/button/ButtonLoadMore";
import CardRecipe from "../../../component/card/CardRecipe";

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
          <CardRecipe recipe={recipe} />
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
        <ButtonLoadMore onClick={loadMoreRecipes} loading={loading} />
      )}
    </div>
  );
}

import { useState, useEffect, useCallback } from "react";
import {
  fetchRecipes,
  fetchRecipesByTag,
  fetchRecipesByMealType,
  Recipe,
} from "../../../api/recipes-api";
import Skeleton from "react-loading-skeleton";
import ButtonLoadMore from "../../../component/button/ButtonLoadMore";
import CardRecipe from "../../../component/card/CardRecipe";

const TAGS = ["Pakistani", "Italian", "Mexican", "Japanese"];
const MEAL_TYPES = ["snack", "lunch", "dinner", "breakfast"];

export default function RecipesPage() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [skip, setSkip] = useState(0);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [selectedTag, setSelectedTag] = useState("");
  const [selectedMealType, setSelectedMealType] = useState("");
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

  const handleFilter = useCallback(async () => {
    setLoading(true);
    try {
      let data;
      if (selectedTag) {
        data = await fetchRecipesByTag(selectedTag);
      } else if (selectedMealType) {
        data = await fetchRecipesByMealType(selectedMealType);
      } else {
        data = await fetchRecipes(0, limit);
      }
      setRecipes(data.recipes);
      setSkip(limit);
      setHasMore(data.total > limit);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [selectedTag, selectedMealType]);

  useEffect(() => {
    handleFilter();
  }, [handleFilter]);

  return (
    <div className="min-h-screen bg-gray-50 p-6 space-y-6">
      <div className="flex flex-col sm:flex-row items-center gap-4">
        <select
          className="px-4 py-2 rounded border border-gray-300"
          value={selectedTag}
          onChange={(e) => {
            setSelectedMealType("");
            setSelectedTag(e.target.value);
          }}
        >
          <option value="">Filter All</option>
          {TAGS.map((tag) => (
            <option key={tag} value={tag}>
              {tag}
            </option>
          ))}
        </select>

        <select
          className="px-4 py-2 rounded border border-gray-300"
          value={selectedMealType}
          onChange={(e) => {
            setSelectedTag(""); // Reset other filter
            setSelectedMealType(e.target.value);
          }}
        >
          <option value="">Filter All</option>
          {MEAL_TYPES.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {recipes.map((recipe) => (
          <CardRecipe key={recipe.id} recipe={recipe} />
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

      {hasMore && !selectedTag && !selectedMealType && (
        <ButtonLoadMore onClick={loadMoreRecipes} loading={loading} />
      )}
    </div>
  );
}

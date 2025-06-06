import { Recipe } from "../../api/recipes-api";

type CardRecipeType = {
    recipe: Recipe
}

const CardRecipe = ({recipe}: CardRecipeType) => {
  return (
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
        <p>⏱️ Time: {recipe.prepTimeMinutes + recipe.cookTimeMinutes} mins</p>
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
  );
};

export default CardRecipe;

import { GetServerSideProps } from "next";
import { fetchRecipes, Recipe } from "../../api/recipes-api";

interface Props {
  recipes: Recipe[];
}

export default function RecipesPage({ recipes }: Props) {
  return (
    <div>
      <h1>Recipe List</h1>
      {recipes.map((recipe) => (
        <div key={recipe.id}>
          <h2>{recipe.name}</h2>
          <img src={recipe.image} alt={recipe.name} width={200} />
          <p>🧑‍🍳 Difficulty: {recipe.difficulty}</p>
          <p>🍽 Servings: {recipe.servings}</p>
          <p>⏱️ Time: {recipe.prepTimeMinutes + recipe.cookTimeMinutes} mins</p>
        </div>
      ))}
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const data = await fetchRecipes();

  return {
    props: {
      recipes: data.recipes,
    },
  };
};

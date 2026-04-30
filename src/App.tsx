import { useEffect, useState } from "react";
import type { Recipe } from "./types/recipe";
import RecipeForm from "./components/RecipeForm";
import RecipeCard from "./components/RecipeCard";

export default function App() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem("recipes");
    if (saved) setRecipes(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem("recipes", JSON.stringify(recipes));
  }, [recipes]);

  const addRecipe = (recipe: Recipe) => {
    setRecipes([recipe, ...recipes]);
  };

  const toggleFavorite = (id: number) => {
    setRecipes(
      recipes.map(r =>
        r.id === id ? { ...r, favorite: !r.favorite } : r
      )
    );
  };

  const updateRecipe = (updated: Recipe) => {
    setRecipes(
      recipes.map(r => (r.id === updated.id ? updated : r))
    );
  };

  const deleteRecipe = (id: number) => {
    setRecipes(recipes.filter(r => r.id !== id));
  };

  return (
    <div style={{ maxWidth: 480, margin: "0 auto", padding: 16 }}>
      <h1 style={{ textAlign: "center" }}>レシピアプリ</h1>

      <RecipeForm onAdd={addRecipe} />

      {recipes.map(r => (
        <RecipeCard
          key={r.id}
          recipe={r}
          onToggleFavorite={toggleFavorite}
          onUpdate={updateRecipe}
          onDelete={deleteRecipe}
        />
      ))}
    </div>
  );
}
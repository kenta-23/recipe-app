import { useEffect, useState } from "react";
import type { Recipe } from "./types/recipe";
import RecipeForm from "./components/RecipeForm";
import RecipeCard from "./components/RecipeCard";

export default function App() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [search, setSearch] = useState("");

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

  const filterdRecipes = recipes.filter((recipe) => {
    if (!search.trim()) return true;

    const keywords = search
      .split(/[, ]+/)
      .map(k => k.trim().toLowerCase())
      .filter(Boolean);
    
    const ingredientNames = recipe.ingredients.map(i =>
      i.name.toLowerCase()
    );

    return keywords.some(keyword =>
      ingredientNames.some(name => name.includes(keyword))
    );
  });

  return (
    <div style={{ maxWidth: 480, margin: "0 auto", padding: 16 }}>
      <h1 style={{ textAlign: "center" }}>レシピアプリ</h1>

      <RecipeForm onAdd={addRecipe} />

      <input type="text"
        placeholder="食材で検索（例：卵 鶏肉）"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          width: "100%",
          padding: 10,
          marginBottom: 16,
          borderRadius: 8,
          border: "1px solid #ccc",
        }}
      />

      {filterdRecipes.map(r => (
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
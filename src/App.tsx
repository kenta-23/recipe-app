import { useEffect, useState } from "react";
import type { Recipe } from "./types/recipe";
import RecipeForm from "./components/RecipeForm";
import RecipeCard from "./components/RecipeCard";

export default function App() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [search, setSearch] = useState("");
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const [tagFilter, setTagFilter] = useState("");

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

  const filteredRecipes = recipes.filter((recipe) => {
    if (!search.trim() && !showFavoritesOnly && !tagFilter.trim()) return true;

    const keywords = search
      .split(/[, ]+/)
      .map(k => k.trim().toLowerCase())
      .filter(Boolean);
    
    const ingredientNames = recipe.ingredients.map(i =>
      i.name.toLowerCase()
    );

    const matcheSearch =
      keywords.length === 0 ||
      keywords.every(keyword =>
        ingredientNames.some(name => name.includes(keyword))
      );
    
    const matchTag =
      !tagFilter.trim() ||
      recipe.tag.toLowerCase().includes(tagFilter.toLowerCase());

      if (showFavoritesOnly && !recipe.favorite) return false;
      
      return matcheSearch && matchTag;
    });
    
    const uniqueTags = [...new Set(recipes.map(r => r.tag).filter(tag => tag && tag.trim()))];

    const styles = {
      input: {
        display: "block",
        padding: 10,
        borderRadius: 8,
        border: "1px solid #ccc",
        width: "100%",
        boxSizing: "border-box" as const,
      },
    };

  return (
    <div style={{
      maxWidth: 520,
      margin: "0 auto",
      padding: 16,
      display: "flex",
      flexDirection: "column",
      gap: 12,
    }}>

      <h1 style={{ textAlign: "center" }}>レシピアプリ</h1>

      <RecipeForm onAdd={addRecipe} />

      <div style={{
        background: "#fff",
        padding: 12,
        borderRadius: 12,
        boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
        display: "flex",
        flexDirection: "column",
        gap: 8,
      }}>
        <input type="text"
          placeholder="食材で検索（例：卵 鶏肉）"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={styles.input}
        />

        <label>
          タグで絞り込み
          <select
            value={tagFilter}
            onChange={(e) => setTagFilter(e.target.value)}
            style={styles.input}
          >
            <option value="">すべてのタグ</option>
            {uniqueTags.map(tag => (
              <option key={tag} value={tag}>
                {tag}
              </option>
            ))}
          </select>
        </label>

        <button
          onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
          style={{
            padding: 8,
            borderRadius: 8,
            border: "1px solid #ccc",
            background: showFavoritesOnly ? "#333" : "#fff",
            color: showFavoritesOnly ? "#fff" : "#000",
          }}
        >
          {showFavoritesOnly ? "★ お気に入りのみ表示中" : "☆ お気に入りのみ表示"}
        </button>

      </div>

      {filteredRecipes.map(r => (
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
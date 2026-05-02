import { useEffect, useState } from "react";
import type { Recipe } from "./types/recipe";
import RecipeForm from "./components/RecipeForm";
import RecipeCard from "./components/RecipeCard";
import styles from "./App.module.css";

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
      .split(/[\s, ]+/)
      .map(k => k.trim().toLowerCase())
      .filter(Boolean);
    
    const ingredientNames = recipe.ingredients.map(i =>
      i.name.toLowerCase()
    );

    const matchSearch =
      keywords.length === 0 ||
      keywords.every(keyword =>
        ingredientNames.some(name => name.includes(keyword))
      );
    
    const matchTag =
      !tagFilter.trim() ||
      recipe.tag.toLowerCase().includes(tagFilter.toLowerCase());

      if (showFavoritesOnly && !recipe.favorite) return false;
      return matchSearch && matchTag;
    });
    
    const uniqueTags = [...new Set(recipes.map(r => r.tag).filter(tag => tag && tag.trim()))];

    const sortedRecipes = [...filteredRecipes].sort((a, b) => {
      // お気に入り優先
      if (a.favorite && !b.favorite) return -1;
      if (!a.favorite && b.favorite) return 1;

      // 新しい順（idが大きい=新しい）
      return b.id - a.id;
    });

  return (
    <div className={styles.container}>

      <h1 className={styles.title}>レシピアプリ</h1>

      <RecipeForm onAdd={addRecipe} />

      <div className={styles.searchBox}>
        <input type="text"
          placeholder="食材で検索（例：卵 鶏肉）"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className={styles.input}
        />

        <label>
          タグで絞り込み
          <select
            value={tagFilter}
            onChange={(e) => setTagFilter(e.target.value)}
            className={styles.input}
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
          className={`${styles.favoriteButton} ${showFavoritesOnly ? styles.favoriteActive : ""}`}
        >
          {showFavoritesOnly ? "★ お気に入りのみ表示中" : "☆ お気に入りのみ表示"}
        </button>

      </div>

      {sortedRecipes.length === 0 ? (
        <p className={styles.emptyMessage}>
          {search || tagFilter || showFavoritesOnly
            ? "条件に一致するレシピがありません"
            : "レシピがありません"}
        </p>
      ) : (
        sortedRecipes.map(r => (
          <RecipeCard
            key={r.id}
            recipe={r}
            onToggleFavorite={toggleFavorite}
            onUpdate={updateRecipe}
            onDelete={deleteRecipe}
          />
        ))
      )}
    </div>
  );

}
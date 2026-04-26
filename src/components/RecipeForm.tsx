import { useState } from "react";
import type { Recipe } from "../types/recipe";

type Props = {
  onAdd: (recipe: Recipe) => void;
};

export default function RecipeForm({ onAdd }: Props) {
  const [name, setName] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [tag, setTag] = useState("");
  const [memo, setMemo] = useState("");

  const handleSubmit = () => {
    if (!name.trim()) return;

    const newRecipe: Recipe = {
      id: Date.now(),
      name,
      ingredients: ingredients
        .split(",")
        .map(i => i.trim())
        .filter(Boolean),
      tag,
      memo,
      favorite: false,
    };

    onAdd(newRecipe);

    setName("");
    setIngredients("");
    setTag("");
    setMemo("");
  };

  return (
    <div style={styles.form}>
      <input
        style={styles.input}
        placeholder="料理名"
        value={name}
        onChange={e => setName(e.target.value)}
      />

      <input
        style={styles.input}
        placeholder="食材（例：卵, 鶏肉）"
        value={ingredients}
        onChange={e => setIngredients(e.target.value)}
      />

      <input
        style={styles.input}
        placeholder="タグ（和食 / 洋食）"
        value={tag}
        onChange={e => setTag(e.target.value)}
      />

      <textarea
        style={styles.textarea}
        placeholder="レシピ・メモ"
        value={memo}
        onChange={e => setMemo(e.target.value)}
      />

      <button style={styles.button} onClick={handleSubmit}>
        ＋ 追加
      </button>
    </div>
  );
}

const styles: any = {
  form: {
    display: "flex",
    flexDirection: "column",
    gap: 8,
    marginBottom: 20,
  },
  input: {
    padding: 10,
    borderRadius: 8,
    border: "1px solid #ccc",
  },
  textarea: {
    padding: 10,
    borderRadius: 8,
    border: "1px solid #ccc",
    minHeight: 60,
  },
  button: {
    padding: 12,
    borderRadius: 8,
    border: "none",
    background: "#333",
    color: "#fff",
    fontSize: 16,
  },
};
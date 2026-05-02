import { useState } from "react";
import type { Recipe } from "../types/recipe";

type Props = {
  onAdd: (recipe: Recipe) => void;
};

export default function RecipeForm({ onAdd }: Props) {
  const [name, setName] = useState("");
  const [ingredients, setIngredients] = useState([{ name: "", amount: "" }]);
  const [tag, setTag] = useState("");
  const [memo, setMemo] = useState("");

  const handleSubmit = () => {
    if (!name.trim()) return;

    const newRecipe: Recipe = {
      id: Date.now(),
      name,
      ingredients: ingredients
        .filter(ing => ing.name.trim()),
      tag,
      memo,
      favorite: false,
    };

    onAdd(newRecipe);

    setName("");
    setIngredients([{ name: "", amount: "" }]);
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

      {ingredients.map((ing, index) => (
        <div key={index} style={{ display: "flex", gap: 8}}>
            <input
              style={{...styles.input, flex: 2}}
              placeholder="食材"
              value={ing.name}
              onChange={e => {
                const newList = [...ingredients];
                newList[index].name = e.target.value;
                setIngredients(newList);
              }}
            />
            <input
              style={{...styles.input, flex: 1, minWidth: 80}}
              placeholder="分量"
              value={ing.amount}
              onChange={e => {
                const newList = [...ingredients];
                newList[index].amount = e.target.value;
                setIngredients(newList);
              }}
            />
        </div>
      ))}

      <button type="button" onClick={() => setIngredients([...ingredients, { name: "", amount: ""}])}>
        + 食材追加
      </button>

      <input
        style={styles.input}
        placeholder="タグ（和食 / 洋食 / 中華）"
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
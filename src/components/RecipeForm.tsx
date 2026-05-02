import { useState } from "react";
import type { Recipe } from "../types/recipe";
import styles from "./RecipeForm.module.css";

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
    <div className={styles.form}>
      <input
        className={styles.input}
        placeholder="料理名"
        value={name}
        onChange={e => setName(e.target.value)}
      />

      {ingredients.map((ing, index) => (
        <div key={index} className={styles.row}>
            <input
              className={`${styles.input} ${styles.ingredientName}`}
              placeholder="食材"
              value={ing.name}
              onChange={e => {
                const newList = [...ingredients];
                newList[index].name = e.target.value;
                setIngredients(newList);
              }}
            />
            <input
              className={`${styles.input} ${styles.ingredientAmount}`}
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

      <button type="button" className={styles.addButton} onClick={() => setIngredients([...ingredients, { name: "", amount: ""}])}>
        + 食材追加
      </button>

      <input
        className={styles.input}
        placeholder="タグ（和食 / 洋食 / 中華）"
        value={tag}
        onChange={e => setTag(e.target.value)}
      />

      <textarea
        className={styles.textarea}
        placeholder="レシピ・メモ"
        value={memo}
        onChange={e => setMemo(e.target.value)}
      />

      <button className={styles.button} onClick={handleSubmit}>
        ＋ 追加
      </button>
    </div>
  );
}
import type { Recipe } from "../types/recipe";
import { useState, useEffect } from "react";
import styles from "./RecipeCard.module.css";

type Props = {
    recipe: Recipe;
    onToggleFavorite: (id: number) => void;
    onUpdate: (recipe: Recipe) => void;
    onDelete: (id: number) => void;
};


export default function RecipeCard({ recipe, onToggleFavorite, onUpdate, onDelete }: Props) {
  const [open, setOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(recipe.name);
  const [editMemo, setEditMemo] = useState(recipe.memo);
  const [editIngredients, setEditIngredients] = useState(recipe.ingredients);

  useEffect(() => {
    setEditName(recipe.name);
    setEditMemo(recipe.memo);
    setEditIngredients(recipe.ingredients);
  }, [recipe]);

  return (
    <div className={styles.card}>
      <div className={styles.header} onClick={() => setOpen(!open)}>
        <h3>
          {open ? "▼" : "▶"} {recipe.name}
        </h3>

        <div className={styles.actions}>
          <button
            className={styles.star}
            onClick={(e) => {
              e.stopPropagation();
              onToggleFavorite(recipe.id);
            }}>
            {recipe.favorite ? "★" : "☆"}
          </button>

          <button
            className={styles.editButton}
            onClick={(e) => {
              e.stopPropagation();
              setIsEditing(!isEditing);
              setOpen(true);
            }}>
            編集
          </button>

          {!isEditing && (
            <button
              onClick={(e) => {
                e.stopPropagation();

                const ok = window.confirm("本当に削除しますか？");
                if (ok) {
                  onDelete(recipe.id);
                }
              }}>
              削除
            </button>
          )}
        </div>
      </div>

      {open && (
        <>
          {isEditing ? (
            <div className={styles.editContainer}>
              <label>
                料理名
                <input
                  className={styles.input}
                  value={editName || ""}
                  onChange={(e) => setEditName(e.target.value)}
                />
              </label>

              <p className={styles.sectionLabel}>食材：</p>

              {editIngredients.map((ing, idx) => (
                <div key={idx} className={styles.row}>
                  <input type="text"
                    className={`${styles.input} ${styles.ingredientName}`}
                    value={ing.name}
                    placeholder="食材"
                    onChange={(e) => {
                      const newList = editIngredients.map((item, i) =>
                        i === idx ? { ...item, name: e.target.value } : item
                    );
                      setEditIngredients(newList);
                    }}
                  />

                  <input type="text"
                    value={ing.amount}
                    className={`${styles.input} ${styles.ingredientAmount}`}
                    placeholder="分量"
                    onChange={(e) => {
                      const newList = editIngredients.map((item, i) =>
                        i === idx ? {...item, amount: e.target.value } : item
                      );
                      setEditIngredients(newList);
                    }}
                  />
                </div>
              ))}

              <button
                className={styles.addButton}
                onClick={() =>
                setEditIngredients([...editIngredients, { name: "", amount: ""}])
                }>
                + 食材追加
              </button>

              <label>
                レシピ
                <textarea
                  className={styles.textarea}
                  value={editMemo || ""}
                  onChange={(e) => setEditMemo(e.target.value)}
                />
              </label>

              <button
                className={styles.saveButton}
                onClick={() => {
                  onUpdate({
                    ...recipe,
                    name: editName,
                    memo: editMemo,
                    ingredients: editIngredients,
                  });
                  setIsEditing(false);
                  setOpen(false);
                }}>
                保存
              </button>
            </div>
          ) : (
            <>
              {recipe.tag && <p className={styles.tag}>#{recipe.tag}</p>}

              <div>
                <p className={styles.sectionLabel}>食材：</p>
                {recipe.ingredients.map((i, idx) => (
                    <div key={idx} className={styles.ingredientRow}>
                      <span>{i.name}</span>
                      <span className={styles.amount}>
                        {i.amount}
                      </span>
                    </div>
                ))}
              </div>
        
              <div className={styles.spacer} />
        
              {recipe.memo && (
                <div>
                  <p className={styles.sectionLabel}>レシピ：</p>
                  <p className={styles.memoText}>
                    {recipe.memo}
                  </p>
                </div>
              )}
            </>
          )}
        </>
      )}
    </div>
  );
}
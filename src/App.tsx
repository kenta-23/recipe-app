import { useEffect, useState } from 'react';

type Recipe = {
  id: number;
  name: string;
  ingredients: string[];
  tag: string;
  memo: string;
  favorite: boolean;
};

export default function App() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [name, setName] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [tag, setTag] = useState("");
  const [memo, setMemo] = useState("");

  // 初期ロード
  useEffect(() => {
    const saved = localStorage.getItem("recipes");
    if (saved) {
      setRecipes(JSON.parse(saved));
  }}, []);

  // レシピ保存
  useEffect(() => {
    localStorage.setItem("recipes", JSON.stringify(recipes));
  }, [recipes]);

  const addRecipe = () => {
    if (!name.trim()) {
      return;
    }

    const newRecipe: Recipe = {
      id: Date.now(),
      name,
      ingredients: ingredients.split(",").map(i => i.trim()).filter(Boolean),
      tag,
      memo,
      favorite: false,
    };

    setRecipes([newRecipe, ...recipes]);
    setName("");
    setIngredients("");
    setTag("");
    setMemo("");
  };

  const toggleFavorite = (id: number) => {
    setRecipes(recipes.map(r => r.id === id ? { ...r, favorite: !r.favorite } : r));
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>レシピアプリ</h1>

      {/* 入力フォーム */}
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

        <button style={styles.button} onClick={addRecipe}>
          + 追加
        </button>
      </div>

      {/* レシピ一覧 */}
      <div>
        {recipes.map(r => (
          <div key={r.id} style={styles.card}>
            <div style={styles.cardHeader}>
              <h3>{r.name}</h3>
              <button onClick={() => toggleFavorite(r.id)} style={StylePropertyMap.star}>
                {r.favorite ? "★" : "☆"}
              </button>
            </div>

            {r.tag && <p style={styles.tag}>#{r.tag}</p>}

            <p style={styles.ingredients}>
              食材： {r.ingredients.join(", ")}
            </p>

            {r.memo && <p style={styles.memo}>{r.memo}</p>}
          </div>
        ))}
      </div>
    </div>
  );
}

const styles: { [key: string]: React.CSSProperties;} = {
  container: {
    maxWidth: 480,
    margin: "0 auto",
    padding: 16,
    fontFamily: "sans-serif",
  },

  title: {
    textAlign: "center",
  },

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

  card: {
    background: "#fff",
    padding: 12,
    borderRadius: 12,
    boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
    marginBottom: 12,
  },

  cardHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },

  star: {
    fontSize: 20,
    background: "none",
    border: "none",
  },

  tag: {
    color: "#888",
    fontSize: 12,
  },

  ingredients: {
    fontSize: 14,
  },

  memo: {
    fontSize: 13,
    marginTop: 4,
  },
};

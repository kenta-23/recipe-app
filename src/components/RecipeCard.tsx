import type { Recipe } from "../types/recipe";

type Props = {
  recipe: Recipe;
  onToggleFavorite: (id: number) => void;
};

export default function RecipeCard({ recipe, onToggleFavorite }: Props) {
  return (
    <div style={styles.card}>
      <div style={styles.header}>
        <h3>{recipe.name}</h3>
        <button
          style={styles.star}
          onClick={() => onToggleFavorite(recipe.id)}
        >
          {recipe.favorite ? "★" : "☆"}
        </button>
      </div>

      {recipe.tag && <p style={styles.tag}>#{recipe.tag}</p>}

      <div>
        食材：
        {recipe.ingredients.map((i, idx) => (
            <div key={idx}>
                {i.name} {i.amount}
            </div>
        ))}
      </div>

      {recipe.memo && (
        <p style={{ whiteSpace: "pre-line"}}>
            {recipe.memo}
        </p>
      )}
    </div>
  );
}

const styles: any = {
  card: {
    background: "#fff",
    padding: 12,
    borderRadius: 12,
    boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
    marginBottom: 12,
  },
  header: {
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
};
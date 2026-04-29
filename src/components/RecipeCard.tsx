import type { Recipe } from "../types/recipe";
import { useState } from "react";


type Props = {
    recipe: Recipe;
    onToggleFavorite: (id: number) => void;
};

export default function RecipeCard({ recipe, onToggleFavorite }: Props) {
  const [open, setOpen] = useState(false);
  
  return (
    <div style={styles.card}>
      <div style={styles.header} onClick={() => setOpen(!open)}>
         <h3>
            {open ? "▼" : "▶"} {recipe.name}
         </h3>
         <button
           style={styles.star}
           onClick={(e) => {
                e.stopPropagation();
                onToggleFavorite(recipe.id);
           }}
         >
           {recipe.favorite ? "★" : "☆"}
         </button>
      </div>

      {open && (
        <>
          {recipe.tag && <p style={styles.tag}>#{recipe.tag}</p>}

          <div>
            <p style={{ marginBottom: 4}}>食材：</p>
            {recipe.ingredients.map((i, idx) => (
                <div key={idx} style={{display: "flex", justifyContent: "space-between", padding: "2px 0", width: "100%",}}>
                    <span>{i.name}</span>
                    <span style={{textAlign: "right", minWidth: 60}}>
                        {i.amount}
                    </span>
                </div>
            ))}
          </div>
    
          <div style={{ height: 12}} />
    
          {recipe.memo && (
            <div>
              <p style={{marginBottom: 4 }}>レシピ：</p>
              <p style={{ whiteSpace: "pre-line"}}>
                  {recipe.memo}
              </p>
            </div>
          )}
        </>
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
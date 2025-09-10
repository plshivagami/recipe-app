import React from "react";
import "./Recipe.css";

export default function RecipeDetail({ recipe, onBack, onDelete, onEdit }) {
  if (!recipe) return null;
  return (
    <div className="container">
      <button onClick={onBack} style={{ marginBottom: 16 }}>
        &larr; Back
      </button>
      <h1>{recipe.name}</h1>
      {recipe.image && (
        <img
          src={recipe.image}
          alt={recipe.name}
          style={{
            width: "100%",
            maxHeight: 240,
            objectFit: "cover",
            borderRadius: 8,
            marginBottom: 16,
          }}
        />
      )}
      <h3>Ingredients</h3>
      <p
        dangerouslySetInnerHTML={{
          __html: recipe.ingredients.replace(/\n/g, "<br/>"),
        }}
      />
      <h3>Steps</h3>
      <p
        dangerouslySetInnerHTML={{
          __html: recipe.steps.replace(/\n/g, "<br/>"),
        }}
      />
      <div style={{ marginTop: 16 }}>
        <button onClick={onEdit} style={{ marginRight: 8 }}>
          Edit
        </button>
        <button
          onClick={onDelete}
          style={{ background: "#e53935", color: "#fff" }}
        >
          Delete
        </button>
      </div>
    </div>
  );
}

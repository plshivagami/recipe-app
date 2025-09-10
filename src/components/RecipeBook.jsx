import React, { useState } from "react";
import "./Recipe.css";
import RecipeDetail from "./RecipeDetail";

const sampleRecipes = [
  {
    name: "Classic Baked Potato",
    ingredients: "2 large russet potatoes\nOlive oil\nSalt",
    steps:
      "1. Preheat oven to 400°F (200°C).\n2. Scrub potatoes, dry, and prick with a fork.\n3. Rub with olive oil and salt.\n4. Bake for 45-60 minutes until tender.",
    image:
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80",
  },
  {
    name: "Simple Omelette",
    ingredients: "2 eggs\n1 tbsp milk\nSalt and pepper\nButter",
    steps:
      "1. Beat eggs with milk, salt, and pepper.\n2. Melt butter in a pan.\n3. Pour in eggs and cook until set.",
    image:
      "https://images.unsplash.com/photo-1519864600265-abb23847ef2c?auto=format&fit=crop&w=400&q=80",
  },
  {
    name: "Pasta Primavera",
    ingredients:
      "200g pasta\n1 cup mixed vegetables\nOlive oil\nParmesan\nSalt & pepper",
    steps:
      "1. Cook pasta.\n2. Sauté vegetables.\n3. Mix with pasta, olive oil, and cheese.\n4. Season and serve.",
    image:
      "https://images.unsplash.com/photo-1502741338009-cac2772e18bc?auto=format&fit=crop&w=400&q=80",
  },
  {
    name: "Grilled Cheese Sandwich",
    ingredients: "2 slices bread\nButter\n2 slices cheese",
    steps:
      "1. Butter bread.\n2. Place cheese between slices.\n3. Grill until golden brown.",
    image:
      "https://images.unsplash.com/photo-1519864600265-abb23847ef2c?auto=format&fit=crop&w=400&q=80",
  },
];

export default function RecipeBook() {
  const [recipes, setRecipes] = useState(sampleRecipes);
  const [name, setName] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [steps, setSteps] = useState("");
  const [image, setImage] = useState("");
  const [selected, setSelected] = useState(null);
  const [editIndex, setEditIndex] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name && ingredients && steps) {
      const newRecipe = { name, ingredients, steps, image };
      if (editIndex !== null) {
        const updated = [...recipes];
        updated[editIndex] = newRecipe;
        setRecipes(updated);
        setEditIndex(null);
        setSelected(null);
      } else {
        setRecipes([newRecipe, ...recipes]);
      }
      setName("");
      setIngredients("");
      setSteps("");
      setImage("");
    }
  };

  const handleDelete = (i) => {
    if (window.confirm("Delete this recipe?")) {
      setRecipes(recipes.filter((_, idx) => idx !== i));
      setSelected(null);
    }
  };

  const handleEdit = (i) => {
    const r = recipes[i];
    setName(r.name);
    setIngredients(r.ingredients);
    setSteps(r.steps);
    setImage(r.image || "");
    setEditIndex(i);
    setSelected(null);
  };

  if (selected !== null) {
    return (
      <RecipeDetail
        recipe={recipes[selected]}
        onBack={() => setSelected(null)}
        onDelete={() => handleDelete(selected)}
        onEdit={() => handleEdit(selected)}
      />
    );
  }

  return (
    <div className="container">
      <h1>Recipe Book</h1>
      <form id="recipe-form" onSubmit={handleSubmit}>
        <input
          type="text"
          id="recipe-name"
          placeholder="Recipe Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <textarea
          id="recipe-ingredients"
          placeholder="Ingredients"
          value={ingredients}
          onChange={(e) => setIngredients(e.target.value)}
          required
        />
        <textarea
          id="recipe-steps"
          placeholder="Steps"
          value={steps}
          onChange={(e) => setSteps(e.target.value)}
          required
        />
        <input
          type="url"
          id="recipe-image"
          placeholder="Image URL (optional)"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />
        <button type="submit">
          {editIndex !== null ? "Update Recipe" : "Add Recipe"}
        </button>
        {editIndex !== null && (
          <button
            type="button"
            onClick={() => {
              setEditIndex(null);
              setName("");
              setIngredients("");
              setSteps("");
              setImage("");
            }}
          >
            Cancel Edit
          </button>
        )}
      </form>
      <div id="recipes-list">
        {recipes.map((r, i) => (
          <div
            className="recipe-item"
            key={i}
            onClick={() => setSelected(i)}
            style={{ cursor: "pointer" }}
          >
            {r.image && (
              <img
                src={r.image}
                alt={r.name}
                style={{
                  width: "100%",
                  maxHeight: 180,
                  objectFit: "cover",
                  borderRadius: 8,
                }}
              />
            )}
            <h2>{r.name}</h2>
            <strong>Ingredients:</strong>
            <p
              dangerouslySetInnerHTML={{
                __html: r.ingredients.replace(/\n/g, "<br/>"),
              }}
            />
            <strong>Steps:</strong>
            <p
              dangerouslySetInnerHTML={{
                __html: r.steps.replace(/\n/g, "<br/>"),
              }}
            />
            <div style={{ marginTop: 8 }}>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleEdit(i);
                }}
              >
                Edit
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleDelete(i);
                }}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

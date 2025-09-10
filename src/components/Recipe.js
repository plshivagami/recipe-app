document.getElementById("recipe-form").addEventListener("submit", function (e) {
  e.preventDefault();
  const name = document.getElementById("recipe-name").value.trim();
  const ingredients = document
    .getElementById("recipe-ingredients")
    .value.trim();
  const steps = document.getElementById("recipe-steps").value.trim();
  if (name && ingredients && steps) {
    addRecipe(name, ingredients, steps);
    this.reset();
  }
});
// Sample data
const sampleRecipes = [
  {
    name: "Classic Baked Potato",
    ingredients: "2 large russet potatoes\nOlive oil\nSalt",
    steps:
      "1. Preheat oven to 400°F (200°C).\n2. Scrub potatoes, dry, and prick with a fork.\n3. Rub with olive oil and salt.\n4. Bake for 45-60 minutes until tender.",
  },
  {
    name: "Simple Omelette",
    ingredients: "2 eggs\n1 tbsp milk\nSalt and pepper\nButter",
    steps:
      "1. Beat eggs with milk, salt, and pepper.\n2. Melt butter in a pan.\n3. Pour in eggs and cook until set.",
  },
];

window.addEventListener("DOMContentLoaded", () => {
  sampleRecipes.forEach((r) => addRecipe(r.name, r.ingredients, r.steps));
});

function addRecipe(name, ingredients, steps) {
  const list = document.getElementById("recipes-list");
  const item = document.createElement("div");
  item.className = "recipe-item";
  item.innerHTML = `
    <h2>${name}</h2>
    <strong>Ingredients:</strong>
    <p>${ingredients.replace(/\n/g, "<br>")}</p>
    <strong>Steps:</strong>
    <p>${steps.replace(/\n/g, "<br>")}</p>
  `;
  list.prepend(item);
}

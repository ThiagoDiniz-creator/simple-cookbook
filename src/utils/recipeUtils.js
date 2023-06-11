export const addRecipe = (recipe, cookbook) => [...cookbook, recipe];

export const alterRecipe = (recipe, cookbook) =>
  cookbook.map(r => (r.id === recipe.id ? recipe : r));

export const deleteRecipe = (recipeId, cookbook) =>
  cookbook.filter(({ id }) => id !== recipeId);

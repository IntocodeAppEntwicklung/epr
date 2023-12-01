import React, { createContext, useState, useEffect } from "react";
import { fetchRecipes, toggleFavorite, deleteRecipe, addRecipe } from "./api"; // Stellen Sie sicher, dass der Pfad korrekt ist

export const RecipesContext = createContext();

export const RecipesProvider = ({ children }) => {
  const [recipes, setRecipes] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  // Funktionen zum Abrufen alle Rezepte
  useEffect(() => {
    const loadRecipes = async () => {
      try {
        const fetchedRecipes = await fetchRecipes();
        setRecipes(fetchedRecipes);
      } catch (error) {
        console.error("Fehler beim Laden der Rezepte:", error);
      }
    };
    loadRecipes();
  }, []);

  // Funktionen zum Delete einen Rezept
  const handleDeleteRecipe = async (id) => {
    try {
      await deleteRecipe(id);
      setRecipes(recipes.filter((recipe) => recipe.id !== id));
    } catch (error) {
      console.error("Failed to delete recipe:", error);
    }
  };

  // Funktionen zum Aktualisieren des Zustands
  const handleToggleFavorite = async (id) => {
    try {
      const updatedRecipe = await toggleFavorite(id);
      setRecipes(
        recipes.map((recipe) => (recipe.id === id ? updatedRecipe : recipe))
      );
    } catch (error) {
      console.error("Failed to toggle favorite:", error);
    }
  };
  // Neue Rezepte hinzufügen
  const handleAddRecipe = async (recipeData) => {
    try {
      const newRecipe = await addRecipe(recipeData);
      setRecipes([...recipes, newRecipe]);
    } catch (error) {
      console.error("Failed to add recipe:", error);
    }
  };

  return (
    <RecipesContext.Provider
      value={{
        recipes,
        handleAddRecipe,
        handleDeleteRecipe,
        handleToggleFavorite,
      }}
    >
      {children}
    </RecipesContext.Provider>
  );
};

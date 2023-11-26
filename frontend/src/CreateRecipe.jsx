import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

function CreateRecipe() {
  // State für das Rezeptformular
  const [recipe, setRecipe] = useState({
    name: "",
    instructions: "",
    cookingTime: 0,
    calories: 0,
    ingredients: [{ name: "", amount: 0, unit: "" }],
  });

  // Hook für einen Erfolg nachricht zum spichern einen neuen Rezept
  const [message, setMessage] = useState("");

  // Hook für die programmgesteuerte Navigation
  const navigate = useNavigate();

  // Handler für Änderungen in den Formularfeldern
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRecipe({ ...recipe, [name]: value });
  };

  // Handler für Änderungen in den Zutaten des Formulars
  const handleIngredientChange = (index, e) => {
    const updatedIngredients = recipe.ingredients.map((ingredient, i) => {
      if (i === index) {
        return { ...ingredient, [e.target.name]: e.target.value };
      }
      return ingredient;
    });

    setRecipe({ ...recipe, ingredients: updatedIngredients });
  };

  // Handler um eine neue Zutat der Liste hinzuzufügen
  const handleAddIngredient = () => {
    setRecipe({
      ...recipe,
      ingredients: [...recipe.ingredients, { name: "", amount: 0, unit: "" }],
    });
  };

  // Handler um das Rezept zu speichern
  // hier bitte einmal ganz konkret anschauen ob die Funktion sinn macht
  const handleSave = async () => {
    try {
      // Hier würde Logik zum Speichern des Rezepts gechrieben.

      // Angenommen, das Speichern war erfolgreich:
      setMessage("Das Rezept wurde erfolgreich gespeichert.");

      // Nach einer kurze Verzögerung wird züruck zur Hauptseite navigiert.
      setTimeout(() => {
        navigate("/");
      }, 2000); // Warte 2 Sekunden, bevor navigieren.
    } catch (error) {
      // Fehlerbehandlung
      setMessage("Fehler beim Speichern des Rezepts.");
    }
  };

  // Handler um das Formular abzubrechen und zurück zu navigieren
  const handleCancel = () => {
    navigate("/");
  };

  return (
    <div className="container">
      <h1>Create Recipe</h1>
      {/* Eingabefeld für den Rezeptnamen */}
      <div className="mb-3">
        <label htmlFor="RecipeName" className="form-label">
          Name
        </label>
        <input
          type="text"
          className="form-control"
          name="name"
          value={recipe.name}
          onChange={handleInputChange}
        />
      </div>
      {/* Textfeld für die Rezeptanweisungen */}
      <div className="mb-3">
        <label htmlFor="instructions" className="form-label">
          Instructions
        </label>
        <textarea
          className="form-control"
          name="instructions"
          value={recipe.instructions}
          onChange={handleInputChange}
        />
      </div>
      {/* Eingabefelder für Zubereitungszeit und Kalorien */}
      <div className="row">
        <div className="col-md-6 mb-3">
          <label htmlFor="prepTime" className="form-label">
            Cooking time (min)
          </label>
          <input
            type="number"
            className="form-control"
            name="cookingTime"
            value={recipe.cookingTime}
            onChange={handleInputChange}
          />
        </div>
        <div className="col-md-6 mb-3">
          <label htmlFor="kcal" className="form-label">
            Kcal/100g
          </label>
          <input
            type="number"
            className="form-control"
            name="calories"
            value={recipe.calories}
            onChange={handleInputChange}
            placeholder="kcal/100g"
          />
        </div>
      </div>
      {/* Abschnitt für die Eingabe der Zutaten */}
      <h2>Ingredients</h2>
      {recipe.ingredients.map((ingredient, index) => (
        <div key={index} className="row mb-2">
          <div className="col-md-4">
            <label htmlFor="NameIngredients" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control"
              name="name"
              value={ingredient.name}
              onChange={(e) => handleIngredientChange(index, e)}
            />
          </div>
          <div className="col-md-4">
            <label htmlFor="AmountIngredients" className="form-label">
              Amount
            </label>
            <input
              type="number"
              className="form-control"
              name="amount"
              value={ingredient.amount}
              onChange={(e) => handleIngredientChange(index, e)}
              placeholder="Amount"
            />
          </div>
          <div className="col-md-4">
            <label htmlFor="UnitIngredients" className="form-label">
              Unit
            </label>
            <input
              type="text"
              className="form-control"
              name="unit"
              value={ingredient.unit}
              onChange={(e) => handleIngredientChange(index, e)}
            />
          </div>
        </div>
      ))}
      {/* Button um eine neue Zutat hinzuzufügen */}
      <div className="d-flex justify-content-center mb-3">
        <button className="btn btn-primary" onClick={handleAddIngredient}>
          +
        </button>
      </div>
      {/* Buttons um das Formular zu speichern oder abzubrechen */}
      <div className="text-end">
        <button className="btn btn-secondary me-2" onClick={handleCancel}>
          Cancel
        </button>
        <button className="btn btn-primary" onClick={handleSave}>
          Save
        </button>
        {message && (
          <div className="alert alert-success" role="alert">
            {message}
          </div>
        )}
      </div>
    </div>
  );
}

export default CreateRecipe;

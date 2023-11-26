import React from "react";
import { BsClock } from "react-icons/bs";
import { Link } from "react-router-dom";
// die beide würden für die einbindung mit dem backend gebraucht
// import { useContext } from "react";
// import { useParams } from "react-router-dom";

const RecipeDetails = () => {
  // Dummy-Daten, bitte mit der richtigen Funktion ersetzen
  const recipe = {
    title: "Chicken Stir Fry",
    ingredients: [
      { name: "Chicken breast", quantity: "400g" },
      { name: "Broccoli", quantity: "1 head" },
      { name: "Soy sauce", quantity: "3 tbsp" },
    ],
    instructions:
      "Stir-fry chicken and vegetables. Add soy sauce, garlic, and ginger. Cook until done.",
    time: "25 minutes",
    calories: "150 kcal/100g",
  };

  return (
    <div className="container py-5">
      <h1 className="display-4 mb-4">{recipe.title}</h1>
      <h2 className="h5 mb-3">Ingredients</h2>
      <ul className="">
        {recipe.ingredients.map((ingredient, index) => (
          <li key={index}>
            {ingredient.name}: {ingredient.quantity}
          </li>
        ))}
      </ul>

      <h2 className="h5 mb-3">Instructions</h2>
      <p>{recipe.instructions}</p>

      <div className="d-flex justify-content-between align-items-center mt-4">
        <p>
          <BsClock className="me-2" />
          {recipe.time}
        </p>
        <p>{recipe.calories}</p>
      </div>

      <Link to="/" className="btn btn-secondary mt-4">
        Back home
      </Link>
    </div>
  );
};

export default RecipeDetails;

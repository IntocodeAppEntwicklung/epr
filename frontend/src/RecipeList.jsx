import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { RecipesContext } from "./RecipeContext";
import { useContext } from "react";
import { BsClock, BsStar, BsStarFill, BsTrash } from "react-icons/bs";
import "bootstrap/dist/css/bootstrap.min.css";
import "./RecipeList.css";

function RecipeList() {
  const { recipes, handleToggleFavorite, handleDeleteRecipe } =
    useContext(RecipesContext);
  const [filterFavorites, setFilterFavorites, expandedId] = useState(false);
  const navigate = useNavigate();
  // Funktion, um zur Detailseite eines Rezepts zu navigieren.
  const handleReadMoreClick = (id) => {
    navigate(`/recipe-details/${id}`);
  };

  // Schaltet den Favoriten-Filter um.
  const toggleFilter = () => {
    setFilterFavorites(!filterFavorites);
  };

  const handleToggle = (id) => {
    handleToggleFavorite(id);
  };

  const handleDelete = (id) => {
    handleDeleteRecipe(id);
  };

  // Filtert die Rezepte basierend darauf, ob der Favoriten-Filter aktiv ist.
  const filteredRecipes = filterFavorites
    ? recipes.filter((recipe) => recipe.isFavorite)
    : recipes;

  return (
    <>
      <div className="container">
        {/* Zeigt eine Überschrift an, wenn der Filter aktiv ist. */}
        <h3>{filterFavorites ? "Filter an" : ""}</h3>
        <h1>My Recipes</h1>
        {/* Suchfeld und Button zum Hinzufügen neuer Rezepte */}
        <div className="row">
          <div className="col-md-9">
            <input
              type="text"
              className="form-control my-3"
              placeholder="Search recipes"
            />
          </div>
          <div className="col-md-3">
            <button
              className="btn btn-primary my-3"
              onClick={() => navigate("/add-recipe")}
            >
              New Recipe +
            </button>
          </div>
        </div>
        {/* Checkbox für den Favoriten-Filter */}
        <div className="container">
          <div className="row">
            <div className="col 12">
              <div className="form-check form-switch">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="check1"
                  name="option1"
                  value="something"
                  checked={filterFavorites}
                  onChange={toggleFilter} // Hinzufügen eines onChange Event-Handlers
                ></input>
                <label className="form-check-label" htmlFor="check1">
                  Only show favorites
                </label>
              </div>
            </div>
          </div>
        </div>
        {/* Anzeigen der Rezepte */}
        <div className="container mt-3">
          <div className="row">
            {filteredRecipes.map((recipe) => (
              <div className="col-md-4 mb-4" key={recipe.id}>
                <div className="card h-100 d-flex flex-column">
                  <div className="card-body d-flex flex-column">
                    <div className="mt-auto d-flex justify-content-between align-items-center">
                      <h5 className="card-title">{recipe.name}</h5>
                      <i className="bi bi-star-fill mr-2"></i>
                      {recipe.isFavorite ? (
                        <BsStarFill
                          className="text-warning"
                          onClick={() => handleToggle(recipe.id)}
                        />
                      ) : (
                        <BsStar onClick={() => handleToggle(recipe.id)} />
                      )}
                    </div>
                    <p className="card-text flex-grow-1 mb-3">
                      {expandedId === recipe.id
                        ? recipe.instructions
                        : `${recipe.instructions.substring(0, 100)}...`}
                    </p>
                    <div className="d-flex justify-content-between align-items-center mt-3">
                      <div className="d-flex align-items-center">
                        <BsClock className="icon-spacing" />{" "}
                        <span className="time-spacing">
                          {recipe.totalCookingTimeMinutes}
                        </span>
                      </div>
                      <div className="d-flex align-items-center">
                        {recipe.calories100g} /100g
                      </div>
                    </div>
                    <div className="d-flex justify-content-between align-items-center mt-3">
                      <button
                        className="btn btn-secondary btn-sm"
                        onClick={() => handleReadMoreClick(recipe.id)}
                      >
                        Show recipe
                      </button>
                      <BsTrash
                        className="delete-icon"
                        onClick={() => handleDelete(recipe.id)}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default RecipeList;

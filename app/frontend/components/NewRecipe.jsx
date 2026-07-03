import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"

export default function NewRecipe() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ name: "", ingredients: "", instruction: "" })

  function onChange(event) {
    setForm({ ...form, [event.target.name]: event.target.value })
  }

  function onSubmit(event) {
    event.preventDefault()
    const { name, ingredients, instruction } = form

    if (name.length === 0 || ingredients.length === 0 || instruction.length === 0) return

    const body = {
      name,
      ingredients,
      instruction: instruction.replace(/\n/g, "<br> <br>"),
    }

    const token = document.querySelector('meta[name="csrf-token"]').content
    fetch("/api/v1/recipes/create", {
      method: "POST",
      headers: {
        "X-CSRF-Token": token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
      .then((response) => {
        if (response.ok) return response.json()
        throw new Error("Network response was not ok.")
      })
      .then((response) => navigate(`/recipe/${response.id}`))
      .catch((error) => console.log(error.message))
  }

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-sm-12 col-lg-6 offset-lg-3">
          <h1 className="fw-normal mb-5">Add a new recipe to our awesome recipe collection.</h1>
          <form onSubmit={onSubmit}>
            <div className="mb-3">
              <label htmlFor="recipeName" className="form-label">
                Recipe name
              </label>
              <input
                type="text"
                name="name"
                id="recipeName"
                className="form-control"
                required
                onChange={onChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="recipeIngredients" className="form-label">
                Ingredients
              </label>
              <input
                type="text"
                name="ingredients"
                id="recipeIngredients"
                className="form-control"
                required
                onChange={onChange}
              />
              <div id="ingredientsHelp" className="form-text">
                Separate each ingredient with a comma.
              </div>
            </div>
            <label htmlFor="instruction" className="form-label">
              Preparation Instructions
            </label>
            <textarea
              className="form-control"
              id="instruction"
              name="instruction"
              rows="5"
              required
              onChange={onChange}
            />
            <button type="submit" className="btn custom-button mt-3">
              Create Recipe
            </button>
            <Link to="/recipes" className="btn btn-link mt-3">
              Back to recipes
            </Link>
          </form>
        </div>
      </div>
    </div>
  )
}

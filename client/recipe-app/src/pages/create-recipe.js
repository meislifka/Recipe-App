import { useState } from 'react'
import axios from 'axios'
import { useGetUserID } from '../hooks/useGetuserID';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import '../tailwind.css'; // Import Tailwind CSS
import '../App.css';

export const CreateRecipe = () => {

  //from the hooks folder
  const userID = useGetUserID();

  const [cookies, _] = useCookies(["access_token"]);

  const [recipe, setRecipe] = useState({
    name: "",
    ingredients: [],
    instructions: "",
    imageUrl: "",
    cookingTime: 0,
    userOwner: userID,
  });

  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    const newValue = value < 0 ? 0 : value; // Prevent negative value
    setRecipe({ ...recipe, [name]: newValue }); //... set new one to same as before but with value added to name arr
  }

  const handleIngredChange = (event, idx) => {
    const { value } = event.target;
    const ingredients = [...recipe.ingredients];
    ingredients[idx] = value;
    setRecipe({ ...recipe, ingredients }); //... set new one to same as before
  };

  const addIngredient = () => {
    // set recipe object but change ingred list ( what it was before plus empty str to end of array)
    const ingredients = [...recipe.ingredients, ""];
    setRecipe({ ...recipe, ingredients });
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post("http://localhost:3001/recipes", recipe, { headers: { autorization: cookies.accessToken } });
      alert("Recipe Created");
      navigate("/");

    } catch (err) {
      console.error(err);
    }
  }
  return (
    <div className="create-recipe">
      <h2 className='text-2xl font-bold'>Create Recipe</h2>
      <form onSubmit={onSubmit}>
        <label className="mt-3" htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          value={recipe.name}
          onChange={handleChange}
        />
        <label className="mt-3" htmlFor="ingredients"> Ingredients</label>
        {recipe.ingredients.map((ingredient, idx) => (
          <input
            className="mt-1"
            key={idx}
            type="text"
            name="ingredients"
            value={ingredient}
            onChange={(event) => handleIngredChange(event, idx)} />
        ))}
        <button className="border border-black bg-[#bab9b9]  mt-2 rounded font-bold text-black px-4 py-2 hover:bg-[#2b4f1e] hover:text-white hover:border-transparent transition duration-300 ease-in-out" type="button" onClick={addIngredient}>
          Add Ingredient
        </button>
        <label className="mt-3" htmlFor="instructions">Instructions</label>
        <textarea
          id="instructions"
          name="instructions"
          value={recipe.instructions}
          onChange={handleChange}
        ></textarea>
        <label className="mt-3" htmlFor="imageUrl">Image URL</label>
        <input
          type="text"
          id="imageUrl"
          name="imageUrl"
          value={recipe.imageUrl}
          onChange={handleChange}
        />
        <label className="mt-3" htmlFor="cookingTime">Cooking Time (mins)</label>
        <input
          type="number"
          id="cookingTime"
          name="cookingTime"
          value={recipe.cookingTime}
          onChange={handleChange}
        />
        <button className="border border-black bg-[#bab9b9] rounded font-bold text-black px-4 py-2 hover:bg-[#2b4f1e] hover:text-white hover:border-transparent transition duration-300 ease-in-out mt-3" type="submit">
          Create Recipe
        </button>
      </form>
    </div>
  );
};
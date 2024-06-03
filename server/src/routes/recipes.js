import express from 'express';
import { RecipeModel } from "../models/Recipes.js";
import { UserModel } from "../models/Users.js";
import { verifyToken } from './users.js';
import '../tailwind.css'; // Import Tailwind CSS
import '../App.css';

const router = express.Router();


router.get("/", async (req, res) => {
  try {
    const response = await RecipeModel.find({});
    res.json(response);
  } catch (err) {
    res.json(err);
  }
});

//create new recipe
router.post("/", verifyToken, async (req, res) => {
  const recipe = new RecipeModel(req.body);
  try {
    const response = await recipe.save({});
    res.json(response);
  } catch (err) {
    res.json(err);
  }
});


//save recipe route
router.put("/", verifyToken, async (req, res) => {
  try {
    //get recipe
    const recipe = await RecipeModel.findById(req.body.recipeID);

    //get user
    const user = await UserModel.findById(req.body.userID);
    user.savedRecipes.push(recipe);
    await user.save(); //save user to collection
    res.json({ savedRecipes: user.savedRecipes }); //list of saved recipes

  } catch (err) {
    res.json(err);
  }
});

//get ids saved by user given user id
router.get("/savedRecipes/ids/:userID", async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.userID)
    res.json({ savedRecipes: user?.savedRecipes });

  } catch (err) {
    res.json(err);
  }
});

//gets just saved recipes
//get ids saved by user given user id
router.get("/savedRecipes/:userID", async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.userID); //get user

    //array of recipe ids from the saved user
    const savedRecipes = await RecipeModel.find({
      _id: { $in: user.savedRecipes },
    });

    res.json({ savedRecipes });

  } catch (err) {
    res.json(err);
  }
});

export { router as RecipesRouter };

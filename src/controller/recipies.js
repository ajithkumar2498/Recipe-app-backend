import AddRecipeModel from "../models/addrecipe.js";
import cloudinary from "../utils/cloudinary.js";
import userModel from "../models/user.js";

const AddRecipe = async (req, res) => {
  // check if the user existing
  const { recipename, authorname, ingredients, procedure, recipedesc } =
    req.body;
  try {
    const user = await userModel.findById(req.params.id);
    if (!user) {
      return res
        .status(401)
        .json({ message: "Unauthorized Access: User does not exist" });
    }
    const recipeUpload = await cloudinary.uploader.upload(
      req.files.recipeimage[0].path,
      { folder: "recipes" }
    );
    const authorUpload = await cloudinary.uploader.upload(
      req.files.authorimage[0].path,
      { folder: "authors" }
    );
    const recipe = {
      recipename,
      recipedesc,
      authorname,
      recipeimage: {
        public_id: recipeUpload.public_id,
        url: recipeUpload.secure_url,
      },
      authorimage: {
        public_id: authorUpload.public_id,
        url: authorUpload.secure_url,
      },
      ingredients,
      procedure,
      createdBy: req.params.id,
    };
    let addRecipe = await AddRecipeModel.create(recipe);
    res.status(201).send({
      message: "recipe added succcessfully",
      recipe: addRecipe,
    });
  } catch (error) {
    res.status(500).send({
      message: "Internal server error",
      error: error.message,
    });
  }
};

const getAllRecipes = async (req, res) => {
  try {
    let allRecipes = await AddRecipeModel.find();
    res.status(200).send({
      message: "all recipes are here",
      recipes: allRecipes,
    });
  } catch (error) {
    res.status(500).send({
      message: "Internal server error",
      error: error.message,
    });
  }
};

const updateRecipe = async (req, res) => {
  try {
    let recipe = await AddRecipeModel.findById(req.params.id);
    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }

    if (req.body.recipename) {
      recipe.recipename = req.body.recipename;
    }

    if (req.body.authorname) {
      recipe.authorname = req.body.authorname;
    }
    if (req.body.ingredients) {
      recipe.ingredients = req.body.ingredients;
    }
    if (req.body.procedure) {
      recipe.procedure = req.body.procedure;
    }
    if (req.body.recipedesc) {
      recipe.recipedesc = req.body.recipedesc;
    }
    // Update recipe image if provided
    if (req.files.recipeimage[0].path) {
      const recipeUpload = await cloudinary.uploader.upload(
        req.files.recipeimage[0].path,
        { folder: "recipes" }
      );
      recipe.recipeimage = {
        public_id: recipeUpload.public_id,
        url: recipeUpload.secure_url,
      };
    }
    // Update author image if provided
    if (req.files.authorimage[0].path) {
      const authorUpload = await cloudinary.uploader.upload(
        req.files.authorimage[0].path,
        { folder: "authors" }
      );
      recipe.authorimage = {
        public_id: authorUpload.public_id,
        url: authorUpload.secure_url,
      };
    }
    // Save the updated recipe
    const updatedRecipe = await recipe.save();
    // Send the updated recipe as a response
    res.status(200).json({
      message: "Recipe updated successfully",
      recipe: updatedRecipe,
    });
  } catch (error) {
    res.status(500).send({
      message: "Internal server error",
      error: error.message,
    });
  }
};
const deleteRecipe = async (req, res) => {
  try {
    const recipe = await AddRecipeModel.findById(req.params.id);
    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }
    await AddRecipeModel.findByIdAndDelete(req.params.id);
    res.status(200).send({
      message: "recipe deleted Successfully",
    });
  } catch (error) {
    res.status(500).send({
      message: "Internal server error",
      error: error.message,
    });
  }
};
const getRecipesByUserId = async (req, res) => {
  try {
    // Retrieve user ID from request parameters
    const userId = req.params.id;
    // Query database for recipes created by the user
    const recipes = await AddRecipeModel.find({ createdBy: userId });
    // Check if recipes are found
    if (recipes.length === 0) {
      return res.status(404).send({ message: "No recipes found for the user" });
    }
    // Send the retrieved recipes as a response
    res.status(200).send({
      message: "users recipe fetched successful",
      recipes,
    });
  } catch (error) {
    // Handle errors
    res
      .status(500)
      .send({ message: "Internal server error", error: error.message });
  }
};

const getRecipeById = async (req, res) => {
  try {
    const recipe = await AddRecipeModel.findById(req.params.id);
    if (!recipe) {
      return res.status(404).send({ message: "Recipe not found" });
    }
    res.status(200).send({
      message: "recipe fetched successful",
      recipe,
    });
  } catch (error) {
    res
      .status(500)
      .send({ message: "Internal server error", error: error.message });
  }
};
export default {
  AddRecipe,
  getAllRecipes,
  updateRecipe,
  deleteRecipe,
  getRecipesByUserId,
  getRecipeById,
};

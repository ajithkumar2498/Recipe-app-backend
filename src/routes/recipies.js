import express from"express"
import RequestController from "../controller/recipies.js"
import multer from "multer"
import uploads from "../utils/multer.js"
const router = express.Router()
// const upload = multer({dest:'uploads/'})
// router.post('/', RequestController.AddRecipe)
router.post('/addrecipe/:id', uploads.fields([{ name: 'recipeimage', maxCount: 1 }, { name: 'authorimage', maxCount: 1 }]), RequestController.AddRecipe)
router.get('/all', RequestController.getAllRecipes)
router.put('/updaterecipe/:id', RequestController.updateRecipe)
router.delete('/deleterecipe/:id', RequestController.deleteRecipe)
router.get('/:id/recipes', RequestController.getRecipesByUserId)
router.get('/:id/rp', RequestController.getRecipeById)

export default router
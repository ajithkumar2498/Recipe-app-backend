import express from"express"
import UserRoutes from "./user.js"
import RecipeRoutes from "./recipies.js"

const router = express.Router()
router.use('/recipe',RecipeRoutes)
router.use('/user',UserRoutes)

export default router
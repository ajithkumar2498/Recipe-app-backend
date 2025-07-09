import express from"express"
import UserRoutes from "./user.js"
import RecipeRoutes from "./recipies.js"
import CommentRoutes from "./comments.js"

const router = express.Router()
router.use('/recipe',RecipeRoutes)
router.use('/user',UserRoutes)
router.use('/comment',CommentRoutes)

export default router
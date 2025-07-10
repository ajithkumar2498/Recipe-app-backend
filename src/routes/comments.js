import express from "express"
import CommentController from "../controller/comments.js"
import { Validate } from "../middleware/Validate.js"

const router = express.Router()

router.post("/:id/add-comment", Validate, CommentController.AddComment)


export default router
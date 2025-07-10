import express from "express"
import CommentController from "../controller/comments.js"

const router = express.Router()

router.post("/:id/add-comment", CommentController.AddComment)


export default router
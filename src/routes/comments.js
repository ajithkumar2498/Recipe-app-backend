import express from "express"
import CommentController from "../controller/comments.js"

const router = express.router()

router.post("/:id/comment", CommentController.AddComment)


export default router
import recipeModel from "../models/addrecipe.js"
import commentModel from "../models/comments.js"
import userModel from "../models/user.js"


const AddComment = async(req, res)=>{
    const {comment} = req.body
    const {id} = req.params
console.log("userName:", req.user.name);
try {
   if (!comment) {
      return res.status(400).send({ message: "Comment is required" });
    }

    console.log("Received recipeId:", id);

    const recipe = await recipeModel.findOne({ recipeId: id });

    if (!recipe) {
      return res.status(404).send({ message: "Recipe not found" });
    }

    const newComment = {
      recipeId: id,
      userId: req.user.id,
      userName: req.user.name,
      comment
    };

    const addedComment = await commentModel.create(newComment);

    res.status(201).send({
      message: "Comment added",
      comment: addedComment
    });
    
} catch (error) {
    console.log(error)
    res.status(500).send({
            message: "Failed to add comment" || "Internal Server Error" ,
            error:error.message
        })
}

}





export default {
    AddComment
}


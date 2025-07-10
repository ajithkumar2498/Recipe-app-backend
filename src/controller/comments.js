import recipeModel from "../models/addrecipe.js"
import commentModel from "../models/comments.js"
import userModel from "../models/user.js"


const AddComment = async(req, res)=>{
    const {comment} = req.body
    const {id} = req.params.id
try {

    const recipe = recipeModel.findById({recipeId:id})

    if(!recipe){
        return res.status(404).send({
            message:"recipe not found"
        })
    }
    const newComment = {
        recipeId:id,
        userId:req.user.id,
        userName:req.user.name,
        comment
    }
    const addComment = await commentModel.create(newComment)

    res.status(201).send({
        message:"comment added",
        comment:addComment
    })
    
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


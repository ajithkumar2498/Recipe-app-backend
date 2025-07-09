import mongoose from "./index.js"


let commentSchema = new mongoose.Schema({
    recipeId:{
        type:String,
        required:true
    },
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'users',
        required:true
    },
    comment:{
      type:String,
      required:[true, "comment is required"]
    },
    userName:{
        type:String,
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now()
    },
    createdBy:{
        type:String,
    }
},{
    collection:'comments',
    versionKey:false
})

const commentModel = mongoose.model('recipes',commentSchema)

export default commentModel

import mongoose from './index.js'
 
let AddRecipeSchema = new mongoose.Schema({
    recipeId:{
        type:String,
        default: "RP"+ Math.floor(+ new Date()/1000)
    },
    recipename:{
        type:String,
        required:[true,'recipe name is required'],
    },
    recipedesc:{
     type:String,
     required:["recipe description is required"]
    },
    authorname:{
        type:String,
        required:[true,'author name is required'],
    },
    recipeimage:{
       public_id:{
        type:String,
        required:[true,'recipe image is required'],
       },
       url:{
        type:String,
        required:true
       }
    },
    authorimage:{
        public_id:{
            type:String,
            required:[true,'author image is required'],
           },
           url:{
            type:String,
            required:true
           }
    },
    ingredients:{
        type:Array,
        required:[true,'ingredients is required'],
    },
    procedure:{
        type:String,
        required:[true,'procedure is required'],
    },
    createdAt:{
        type:Date,
        default:Date.now()
    },
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
      ref:"users",
      required:true
    }
},{
    collection:'recipes',
    versionKey:false
})

//create model
const recipeModel = mongoose.models.recipes || mongoose.model('recipes', AddRecipeSchema);

export default  recipeModel
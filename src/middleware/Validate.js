import Auth from '../utils/Auth.js'
import jwt from "jsonwebtoken"

const Validate = async (req,res,next)=>{
    try {
         
      let token = req?.headers?.authorization?.split(" ")[1]
      console.log(token)

      if(token){
          let payload = await Auth.decodeToken(token)
          if( Math.round(+new Date()/1000) < payload.exp)
               next()
          else
          res.status(402).send({message:"Token expired"})
      }else{
        res.status(402).send({
            message:"Token Not Found"
        })
      }
        
    } catch (error) {
        res.status(500).send({
            message:"Internal Server Error",
            error:error.message
        })
    }
}


export  {
    Validate
}
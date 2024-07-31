import Auth from '../utils/Auth.js'
import jwt from "jsonwebtoken"

const AdminGaurd = async (req,res,next)=>{
    try {
         
      let token = req?.headers?.authorization?.split(" ")[1]

      if(token){
          let payload = await Auth.decodeToken(token)
          if( payload.role === "admin")
               next()
          else
          res.status(402).send({message:"Access Denied"})
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
    AdminGaurd
}
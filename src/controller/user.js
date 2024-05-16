import Auth from "../utils/Auth.js"
import userModel from "../models/user.js"

const signUp = async (req,res)=>{
    try {
        let user = await userModel.findOne({email:req.body.email})
        if(!user){
            req.body.password = await Auth.hashPassword(req.body.password)
            await userModel.create(req.body)
            res.status(201).send({
             message:"User Signed up Successful"
            })
        }else{
            res.status(400).send({
                message:`user with ${req.body.email} already exist`
            })
        }  
    } catch (error) {
        res.status(500).send({
            message:"Internal Server Error",
            error:error.message
        })
    }
}


const login = async(req,res)=>{
    try {
        let user = await userModel.findOne({email:req.body.email})
        if(user)
        {
            if(await Auth.hashCompare(req.body.password,user.password))
            {
                let token = await Auth.createToken({
                    name:user.name,
                    email:user.email,
                    id:user._id,
                    role:user.role,
                })
                  
                res.status(200).send({
                    message:"Login Successful",
                    name:user.name,
                    role:user.role,
                    id:user._id,
                    token,
                    email:user.email
                })
            }
            else
            {
                res.status(400).send({
                    message:"Incorrect Password"
                })
            }
        }
        else
        {
            res.status(400).send({
                message:`User with ${req.body.email} does not exists`
            })
        }
    } catch (error) {
        res.status(500).send({
            message:error.message || "Internal Server Error"
        })
    }
}

const getAllUsers = async (req,res)=>{
    try {
      let users = await userModel.find({},{password:0})
      res.status(200).send({
        message:"data fetched Successful",
        users
      })
    } catch (error) {
        res.status(500).send({
            message:"Internal Server Error",
            error:error.message
        })
    }
}

const getUserById = async (req,res)=>{
    try {
        let user = await userModel.findOne({_id:req.params.id},{password:0})
        res.status(200).send({
          message:"data fetched Successful",
          user
        })
    } catch (error) {
        res.status(500).send({
            message:"Internal Server Error",
            error:error.message
        })
    }
}

const logout = async (req,res)=>{
    try {
        const token = req.headers.authorization;
        const blacklist = new Set();
    // Add the token to the blacklist    
        blacklist.add(token);
        res.status(200).json({ message: 'Successfully logged out' });
    } catch (error) {
        res.status(500).send({
            message:"Internal Server Error",
            error:error.message
        })
    }
}
export default {
    getAllUsers,
    getUserById,
    signUp,
    login,
    logout
}
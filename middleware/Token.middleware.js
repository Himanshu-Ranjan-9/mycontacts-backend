import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import AsyncHandler from "express-async-handler";
import { userMamodel } from "../models/user.model.js";
dotenv.config();

const asscess_token_secret_key = process.env.ACCESS_TOKEN_SECRET_KEY;

export const generateToken=AsyncHandler((id,name,email)=>{
    return jwt.sign({
        id:id,
        name:name,
        email:email
    },asscess_token_secret_key,
    {
        expiresIn: "1d",
    })
})

export const verifyToken = AsyncHandler(async(req,res,next)=>{
      const token = req.cookies.token || req.header("Authorization")?.replace("Bearer ","");
    if(!token){
        return res.status(400)
        throw new Error("Not authorized, token missing")
    }
    else if(token){
    const decode = jwt.verify(token,asscess_token_secret_key)
     if(!decode){
        return res.status(400)
        throw new Error("Not authorized, wrong token")
    }
    const newUser = await userMamodel.findById(decode.id)
     if(!newUser){
        return res.status(400)
        throw new Error("User not found")
    }

    req.user = newUser._id;
    next();
    
    }

})
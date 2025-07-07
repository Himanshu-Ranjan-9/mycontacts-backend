import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import AsyncHandler from "express-async-handler";
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
    const token = req.cookie.token;
    if(!token){
        return res.status(400)
        throw new Error("Not authorized, token missing")
    }
    const decode = jwt.verify(token,asscess_token_secret_key)
    


})
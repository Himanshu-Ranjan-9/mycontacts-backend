import AsyncHandler from "express-async-handler";
import { userMamodel } from "../models/user.model.js";
import bcrypt from "bcrypt"
import { generateToken } from "../middleware/Token.middleware.js";

export const loginUser = AsyncHandler(async(req,res)=>{
    const { email, password } = req.body;
    console.log("reqBdy-",req.body)
    const newUser = await userMamodel.findOne({email})
    if(!newUser){
        return res.status(404)
            .json({
                success:false,
                message:"user not found"
            })
    }
    const comparePass =await bcrypt.compare(password, newUser?.password)
          if(!(newUser && comparePass)){
            return res.status(404)
            .json({
                success:false,
                message:"Wrong email or password"
            })
          }
   
    if(newUser && comparePass){
        const token = await generateToken(newUser._id,newUser.name,newUser.email)

        return res.cookie("Token",token,{
            httpOnly:true,
            secure:process.env.NODE_ENV === "development",
            sameSite:"strict",
            maxAge:7*24*60*60*1000
        }).status(200)
            .json({
                success:true,
                message:"Login SuccessFull",
                token:token,
                data:newUser
            })
    }
})

export const registerUser = AsyncHandler(async(req,res)=>{
     console.log("reqBdy-",req.body)
    const { name,email,password } =req.body;
    if(!(name && email && password)){
        return res.status(400)
        .json({
            success:false,
            message:"Incomplete Information"
        })
    }

     const exstUser = await userMamodel.findOne({email})
          if(exstUser){
            return res.status(400)
            .json({
                success:false,
                message:"user allready exist with this email."
            })
          }
    const encryptedPassword = await bcrypt.hash(password, 10)
    const newUser = await userMamodel.create({ name, email, password:encryptedPassword })
    if(!newUser){
        return res.status(500)
        .json({
            success:false,
            message:"Registration Failed"
        })
    }
    newUser.__v = undefined;
    newUser.updatedAt = undefined;
    newUser.createdAt = undefined;
    newUser.password = undefined;
    res.status(200)
        .json({
            success:true,
            message:"Registration successfull",
            data:newUser
        })
})
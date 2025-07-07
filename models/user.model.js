import {mongoose,Schema} from "mongoose";

const userSchema = new Schema({
    name:{
        type: String,
        required: [true,"name is required"],
    },
    email:{
        type: String,
        required: [true,"email is required"],
        unique: [true, "email is allready taken"]
    },
    password:{
        type: String,
        required: [true,"Password is required"],
    }
},
{
    timestamps:true,
})

export const userMamodel = mongoose.model("user",userSchema)


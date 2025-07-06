import {mongoose, Schema} from "mongoose";

const contactSchema = new Schema({
    name:{
        type:String,
        required:[true,"Name is required"]  
        },
    phone:{
        type:String,
        required:[true,"Phone is required"]  
        },
    email:{
        type:String,
        required:[true,"Email is required"]  
        }
},{
    timestamps:true
})

const contacts = mongoose.model("contacts",contactSchema)
export default contacts
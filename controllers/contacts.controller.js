import AsyncHandler from "express-async-handler"
import contacts from "../models/contacts.model.js"
import mongoose, { Schema } from "mongoose";


const createContact = AsyncHandler(async (req, res) => {

    const { name, email, phone } = req.body;
    const userid=req.user;
    if (!(name && phone && email && userid)) {
        res.status(400);
        throw new Error("All fields a required")
    }
    const newcontact = await contacts.insertOne({ name, email, phone , userid});
    if(!newcontact){
         res.status(400)
        throw new Error("Contacts Not created")
    }
   return res.status(201)
    .json({
        success: true,
        message: "Contact Added"
    })
})



const getAllContacts = AsyncHandler(async (req, res) => {
  
  const userid =req.user

  const contactList = await contacts.aggregate([
    {
        $match:{
            userid: new mongoose.Types.ObjectId(userid)
        }
    },{
        $lookup:{
            from:"contacts",
            foreignField:"userId",
            localField:"_id",
            as:"contactList"
        }
    }
  ])
  
    // const data = await contacts.find().select("-__v -updatedAt -createdAt");
    if (!contactList) { 
        res.status(constant.NOT_FOUND)
        throw new Error("Contacts Not found")
    }
    res.status(200).json({
        success: true,
        message: "Contacts Fetched Succefully",
        data: contactList
    })
   
})



const getContactById = AsyncHandler(async (req, res) => {
    const { id } = req.params;
    const findContact = await contacts.findById(id)
    if (findContact) {
        res.status(200).json({
            success: true,
            message: "Contact found",
            data: findContact
        })
    } else {

        res.status(404)
        throw new Error("Contact not Found")
    }
})



const deleteContactById = AsyncHandler(async (req, res) => {
    const { id } = req.params;
    const deletedRsp = await contacts.findByIdAndDelete(id)
    if (!deletedRsp) {
        res.status(404);
        throw new Error("Contact not found");
    }
    res.status(200).json({
        success: true,
        message: "contact Deleted SuccessFully",
    })
})



const updateContactById = AsyncHandler(async (req, res) => {
    const { id } = req.params;
    const { name, phone, email } = req.body
    const newupdate = await contacts.findByIdAndUpdate(id, {
        email, phone, name
    },
        {
            new: true,
            runValidators: true

        }).select("-updatedAt -_id -__v -createdAt");
    if (!newupdate) {
        res.status(404)
            .json({
                success: false,
                message: "no contact found to delete"
            })
    }
    res.status(200)
        .json({
            success: true,
            message: "contact updated successfully",
            data: newupdate
        })
})



export {
    getAllContacts,
    getContactById,
    createContact,
    deleteContactById,
    updateContactById
}


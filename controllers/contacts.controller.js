import AsyncHandler from "express-async-handler"
import contacts from "../models/contacts.model.js"
import { constant } from "../utils/constant.js";


const createContact = AsyncHandler(async(req, res) => {
     const { name, email, phone } = req.body;
     if (!(name && phone && email)) {
         res.status(400);
         throw new Error("All fields a required")
     }
        await contacts.insertOne({ name, email, phone });
        res.status(201).json({
            message:"Contact Added"
        })
})



const getAllContacts = AsyncHandler(async(req, res) => {

   
        const data = await contacts.find().select("-__v -updatedAt -createdAt");
        
        if(data){
            res.status(200).json({
                message:"Contacts Fetched Succefully",
                data: data
            })
        }
        else{
            res.status(constant.NOT_FOUND)
            throw new Error("Contacts Not found")
        }
     
})
//testing1

const getContactById = AsyncHandler(async(req, res) => {
    const id =req.params;
    const findContact = await contacts.findById(id)
    if (findContact) {
        res.status(200).json({
            message:"Contact found",
            data:findContact
        })
    }else{
        res.status(404)
        throw new Error("Contact not Found")
    }
})

const deleteContactById = AsyncHandler(async(req, res) => {
    res.status(200).json({
        message: `Contact deleted By id: ${req.params.id}`
    })
})

const updateContactById = AsyncHandler(async(req, res) => {
    res.status(200).json({
        message: `Contact updated By id: ${req.params.id}`
    })
})

export {
    getAllContacts,
    getContactById,
    createContact,
    deleteContactById,
    updateContactById
}
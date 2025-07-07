import AsyncHandler from "express-async-handler"
import contacts from "../models/contacts.model.js"
import { constant } from "../utils/constant.js";


const createContact = AsyncHandler(async (req, res) => {
    const { name, email, phone } = req.body;
    if (!(name && phone && email)) {
        res.status(400);
        throw new Error("All fields a required")
    }
    await contacts.insertOne({ name, email, phone });
    res.status(201).json({
        success: true,
        message: "Contact Added"
    })
})



const getAllContacts = AsyncHandler(async (req, res) => {
    const data = await contacts.find().select("-__v -updatedAt -createdAt");
    if (data) {
        res.status(200).json({
            success: true,
            message: "Contacts Fetched Succefully",
            data: data
        })
    }
    else {
        res.status(constant.NOT_FOUND)
        throw new Error("Contacts Not found")
    }
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


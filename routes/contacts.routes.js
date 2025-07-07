import express from "express";
import { testing } from "../controllers/testing.controllers.js";
import { createContact, deleteContactById, getAllContacts, getContactById, updateContactById } from "../controllers/contacts.controller.js";

const router = express.Router()


router.route("/")
.get(getAllContacts)
.post(createContact);


router.route("/:id")
.get(getContactById)
.delete(deleteContactById)
.put(updateContactById);

//protected route





export default router;
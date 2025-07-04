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



// router.route("/").get(getAllContacts);
// router.route("/").post(createContact);
// router.route("/:id").get(getContactById);

// router.route("/:id").delete(deleteContactById);
// router.route("/:id").put(updateContactById);



export default router;
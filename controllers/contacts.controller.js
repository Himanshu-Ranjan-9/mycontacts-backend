const getAllContacts = (req, res) => {
    res.status(200).json({
        message: "get all Contacts"
    })
}

const getContactById = (req, res) => {
    res.status(200).json({
        message: `get contact by id: ${req.params.id}`
    })
}

const createContact = (req, res) => {
    // console.log("the content from the user is: ",req.body);   
   try {
     const { name, email, phone } = req.body;
    //  just testing
     if (!(name && phone && email)) {
         res.status(400);
         throw new Error("All fields a required")
     }
     res.status(200).json({
         message: "Contact created"
     })
   } catch (error) {
    throw new Error("All fields a required")
   }
}
const deleteContactById = (req, res) => {
    res.status(200).json({
        message: `Contact deleted By id: ${req.params.id}`
    })
}

const updateContactById = (req, res) => {
    res.status(200).json({
        message: `Contact updated By id: ${req.params.id}`
    })
}

export {
    getAllContacts,
    getContactById,
    createContact,
    deleteContactById,
    updateContactById
}
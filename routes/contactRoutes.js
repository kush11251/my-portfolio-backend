const express = require("express");
const router = express.Router();

const contactController = require("../controllers/contactController");
const authMiddleware = require("../middleware/authMiddleware");

// Public route — save contact info
router.post("/add", contactController.addContact);

// Token required — get all contact info
router.get("/all", authMiddleware, contactController.getAllContacts);

// Token required — update attended + adminMessage
router.put("/update/:id", authMiddleware, contactController.updateContactStatus);

// Token required — get one contact
router.get("/:id", authMiddleware, contactController.getOneContact);

module.exports = router;

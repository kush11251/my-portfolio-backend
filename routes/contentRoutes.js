const express = require("express");
const router = express.Router();

const {
  updateContentBlock,
  getContentBlock,
  getFullJson,
  loadBulkJson
} = require("../controllers/contentController");

const authMiddleware = require("../middleware/authMiddleware");

// UPDATE one section
router.put("/update/:key", authMiddleware, updateContentBlock);

// GET one section
router.get("/:key", authMiddleware, getContentBlock);

// Get combined full JSON
router.get("/", getFullJson);

// Load full JSON array (admin only)
router.post("/load", authMiddleware, loadBulkJson);

module.exports = router;

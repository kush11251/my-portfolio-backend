// routes/visitorRoutes.js
const express = require("express");
const router = express.Router();

const visitorController = require("../controllers/visitorController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/", visitorController.createVisitor);          // Save
router.get("/", authMiddleware, visitorController.getAllVisitors);          // Get all
router.get("/:uuid", authMiddleware, visitorController.getVisitorByUUID);   // Get by UUID
router.post("/query", authMiddleware, visitorController.queryVisitors);     // Query by params
router.delete("/delete-all/", authMiddleware, visitorController.deleteAllVisitors);   // Delete all

module.exports = router;

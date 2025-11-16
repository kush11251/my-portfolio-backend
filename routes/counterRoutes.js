const express = require("express");
const router = express.Router();

const counterController = require("../controllers/counterController");
const authMiddleware = require("../middleware/authMiddleware");

// Public: increments counter
router.get("/increment", counterController.incrementCounter);

// Public: get current count
router.get("/get", counterController.getCounter);

// Protected: reset counter
router.post("/reset", authMiddleware, counterController.resetCounter);

module.exports = router;

// controllers/visitorController.js
import Visitor from "../models/Visitor.js";

// Save visitor info + IP
export const createVisitor = async (req, res) => {
  try {
    const ipAddress =
      req.headers["x-forwarded-for"]?.split(",")[0] || req.socket.remoteAddress;
    const visitor = new Visitor({ ...req.body, ipAddress });
    await visitor.save();
    res.status(201).json(visitor);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get single visitor by UUID
export const getVisitorByUUID = async (req, res) => {
  try {
    const visitor = await Visitor.findOne({ uuid: req.params.uuid });
    if (!visitor) return res.status(404).json({ message: "Visitor not found" });
    res.json(visitor);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all visitors
export const getAllVisitors = async (req, res) => {
  try {
    const visitors = await Visitor.find().sort({ createdAt: -1 });
    const count = await Visitor.countDocuments();

    res.json({
      count,
      visitors
    });
    
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Query API — filter by any parameter
export const queryVisitors = async (req, res) => {
  try {
    const { not, ...normalQuery } = req.body;

    const mongoQuery = { ...normalQuery };

    // Handle NOT parameter
    if (not) {
      for (const key in not) {
        const value = not[key];

        // If NOT value is array → use $nin
        if (Array.isArray(value)) {
          mongoQuery[key] = { $nin: value };
        } 
        // Otherwise use $ne
        else {
          mongoQuery[key] = { $ne: value };
        }
      }
    }

    const visitors = await Visitor.find(mongoQuery);
    res.json(visitors);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// Delete all visitors (for testing/admin purposes)
export const deleteAllVisitors = async (req, res) => {
  try {
    const result = await Visitor.deleteMany({});
    res.json({
      message: "All visitor records have been deleted successfully",
      deletedCount: result.deletedCount,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
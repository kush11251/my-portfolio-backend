const Content = require("../models/ContentModel");


// 📌 1. UPDATE / UPSERT one JSON block
exports.updateContentBlock = async (req, res) => {
  try {
    const { key } = req.params;
    const { value } = req.body;

    const updated = await Content.findOneAndUpdate(
      { key },
      { value, updatedAt: new Date() },
      { new: true, upsert: true }
    );

    return res.json({
      success: true,
      message: `${key} updated successfully`,
      data: updated
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};


// 📌 2. GET one block by key
exports.getContentBlock = async (req, res) => {
  try {
    const { key } = req.params;
    const block = await Content.findOne({ key });

    return res.json({
      success: true,
      data: block
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};


// 📌 3. GET full combined JSON (same structure you provided)
exports.getFullJson = async (req, res) => {
  try {
    const all = await Content.find().select("-_id key value updatedAt");

    return res.json({
      success: true,
      "file-content": all,
      "updated-time": new Date()
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};


// 📌 4. LOAD bulk JSON array (used once or for reset)
exports.loadBulkJson = async (req, res) => {
  try {
    const jsonArray = req.body["file-content"];

    await Content.deleteMany(); // replace everything
    await Content.insertMany(jsonArray);

    return res.json({
      success: true,
      message: "Bulk content loaded successfully",
      count: jsonArray.length
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

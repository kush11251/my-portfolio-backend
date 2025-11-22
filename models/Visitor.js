const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const VisitorSchema = new mongoose.Schema({
  uuid: { type: String, default: uuidv4 },
  isMobile: Boolean,
  isTablet: Boolean,
  isDesktop: Boolean,
  browser: String,
  browser_version: String,
  device: String,
  deviceType: String,
  orientation: String,
  os: String,
  os_version: String,
  userAgent: String,
  src: String,
  ipAddress: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Visitor", VisitorSchema);

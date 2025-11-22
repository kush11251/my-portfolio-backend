const Contact = require("../models/Contact");
const { sendContactMail, sendThankYouMail } = require("../mailer/mailService.js");

// 1. Add new contact info (No token required)
exports.addContact = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    const contact = await Contact.create({
      name,
      email,
      subject,
      message
    });

    // Send email notification

    await sendContactMail(req.body);

    await sendThankYouMail(req.body);

    res.json({
      success: true,
      message: "Contact information saved successfully! Message Sent",
      data: contact
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to send message",
      error: error.message,
    });
  }
};

// 2. Get all contact information (Token required)
exports.getAllContacts = async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });

    res.json({
      success: true,
      data: contacts
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// 3. Update attended + adminMessage (Token required)
exports.updateContactStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { attended, adminMessage } = req.body;

    const updated = await Contact.findOneAndUpdate(
      { id: id },
      { 
        attended: attended,
        adminMessage: adminMessage || "" 
      },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({
        success: false,
        message: "Contact not found"
      });
    }

    res.json({
      success: true,
      message: "Contact updated successfully",
      data: updated
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// 4. Get one contact (Token required)
exports.getOneContact = async (req, res) => {
  try {
    const { id } = req.params;

    const contact = await Contact.findOne({ id: id });

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: "Contact not found"
      });
    }

    res.json({
      success: true,
      data: contact
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// 5. Delete all contact information (Token required)
exports.deleteAllContacts = async (req, res) => {
  try {
    const result = await Contact.deleteMany({});

    res.json({
      success: true,
      message: "All contact records deleted successfully",
      deletedCount: result.deletedCount,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete contacts",
      error: error.message,
    });
  }
};
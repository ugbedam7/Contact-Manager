const { uploadImage, deleteImage } = require("../helper/cloudinary");
const Contact = require("../models/contact");
const User = require("../models/user");
const addContactEmail = require("../utils/email");
const fs = require("fs");

// Add Contact
const createContact = async (req, res) => {
  const userId = req.user.id;
  let filePath = req.file ? req.file.path : null;

  try {
    const { fullname, email, phone, address, xhandle } = req.body;

    if (!fullname || !email || !phone || !address || !xhandle) {
      return res.status(400).json({
        success: false,
        error: "Please provide missing fields"
      });
    }

    // Check if the contact already exists
    const existingContact = await Contact.findOne({
      $or: [{ email }, { xhandle }]
    });

    if (existingContact) {
      const takenField = existingContact.email === email ? "Email" : "Xhandle";
      return res.status(400).json({
        success: false,
        error: `${takenField} already exists`
      });
    }

    if (!req.file) {
      return res.status(400).json({
        success: false,
        error: "No file uploaded"
      });
    }

    // Pass the path property of the file object to uploadImage
    const { url, publicId } = await uploadImage(filePath);

    const newContact = await Contact.create({
      fullname,
      email,
      phone,
      address,
      xhandle,
      owner: userId,
      imgUrl: url,
      imgId: publicId
    });

    const user = await User.findById(userId);

    if (!user) {
      console.log("User not found");
      return null;
    }

    // Send Email Notification
    await addContactEmail(user.email);

    res.status(201).json({
      success: true,
      message: "Contact Added successfully",
      newContact
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({
      success: false,
      error: `${err.message}`
    });
  } finally {
    // Ensure file is deleted even if an error occurs
    if (filePath) {
      fs.unlink(filePath, (err) => {
        if (err) console.error("Error deleting file:", err);
      });
    }
  }
};

// Get All Contacts
const getContacts = async (req, res) => {
  try {
    const contacts = await Contact.find({})
      .select("-__v -imgId -updatedAt -createdAt")
      .populate({ path: "owner", select: "fullname email" });

    res.status(200).json(contacts);
  } catch (err) {
    res.status(500).json({
      success: false,
      error: `${err.message}`
    });
  }
};

// Get All Query Contacts
const getQueryContacts = async (req, res) => {
  try {
    const searchQuery = req.query.search;
    console.log(searchQuery);
    let contacts;

    if (!searchQuery) {
      contacts = [];
      return res
        .status(400)
        .json({ success: false, error: "Search item is required" });
    }

    contacts = await Contact.find({
      name: { $regex: searchQuery, $options: "i" }
    });

    res.status(200).json(contacts);
  } catch (err) {
    res.status(500).json({
      success: false,
      error: `${err.message}`
    });
  }
};

// Get Single Contact
const getContact = async (req, res) => {
  try {
    const contactId = req.params.id;

    const contact = await Contact.findById(contactId)
      .select("-__v -imgId -updatedAt -createdAt")
      .populate({ path: "owner", select: "fullname email" });

    if (!contact)
      return res
        .status(404)
        .json({ success: false, error: "Contact not found" });

    res.status(200).json(contact);
  } catch (err) {
    res.status(500).json({
      success: false,
      error: `${err.message}`
    });
  }
};

// Update Contact
const updateContact = async (req, res) => {
  try {
    const contactId = req.params.id;
    const contact = await Contact.findById(contactId);

    if (!contact)
      return res
        .status(404)
        .json({ success: false, error: "Contact not found" });

    if (
      contact.owner._id.toString() !== req.user.id &&
      req.user.role !== "admin"
    )
      return res.status(403).json({
        success: false,
        error: "Not authorized. Access denied"
      });

    Object.assign(contact, req.body);
    const updatedContact = await contact.save();

    res.status(200).json({
      success: true,
      message: "Contact Updated",
      updatedContact
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: `${err.message}`
    });
  }
};

// Update Contact Image
const updateContactImage = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({
      success: false,
      error: "No file uploaded"
    });
  }

  const filePath = req.file.path;
  const contactId = req.params.id;

  try {
    let contact = await Contact.findById(contactId);

    if (!contact)
      return res.status(404).json({
        success: false,
        error: "Contact not found"
      });

    if (
      String(contact.owner._id) !== String(req.user.id) &&
      req.user.role !== "admin"
    )
      return res.status(403).json({
        success: false,
        error: "Not authorized. Access denied"
      });

    // Contact Image Update
    if (contact.imgId) {
      // Delete existing image from Cloudinary if exists
      const deleteResult = await deleteImage(contact.imgId);
    }
    // Upload new image
    const { url, publicId } = await uploadImage(filePath);

    // Update database
    contact.imgUrl = url;
    contact.imgId = publicId;

    contact = await contact.save({ validateModifiedOnly: true });

    if (filePath) {
      fs.unlink(filePath, (err) => {
        if (err) console.error("Error deleting file:", err);
      });
    }

    res.status(200).json({
      success: true,
      message: "Image updated",
      contact
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message
    });
  }
};

// Delete Contact
const deleteContact = async (req, res) => {
  try {
    const contactId = req.params.id;
    const contact = await Contact.findById(contactId);

    if (!contact)
      return res
        .status(404)
        .json({ success: false, error: "Contact not found" });

    if (
      contact.owner._id.toString() !== req.user.id &&
      req.user.role !== "admin"
    ) {
      return res.status(403).json({
        success: false,
        error: "Not authorized. Access denied"
      });
    }

    await contact.deleteOne();

    // Delete image from cloudinary
    await deleteImage(contact.imgId);

    res.json({
      success: true,
      message: "Contact Deleted"
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: `${err.message}`
    });
  }
};

module.exports = {
  createContact,
  getContacts,
  getQueryContacts,
  getContact,
  updateContact,
  updateContactImage,
  deleteContact
};

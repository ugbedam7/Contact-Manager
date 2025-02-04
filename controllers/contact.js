const { uploadImage } = require('../helper/cloudinary');
const Contact = require('../models/contact');
const User = require('../models/user');
const addContactEmail = require('../utils/email');

// Add Contact
const createContact = async (req, res) => {
  try {
    const userId = req.user.id;
    const { name, email, phone, address } = req.body;

    if (!name || !email || !phone || !address) {
      return res.status(400).json({
        success: false,
        error: 'Please provide missing fields'
      });
    }

    // Get the file object from the request object
    const file = req.file;

    if (!file) {
      return res.status(400).json({
        success: false,
        error: 'No file uploaded'
      });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'User not found'
      });
    }

    // Pass the path property of the file object to uploadImage
    const { url, publicId } = await uploadImage(file.path);

    const contact = await Contact.create({
      name,
      email,
      phone,
      address,
      owner: userId,
      imgUrl: url,
      imgId: publicId
    });

    // Send Email Notification
    await addContactEmail(user.email);

    res.status(201).json({
      success: true,
      message: 'Contact Added successfully',
      contact
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: `${err.message}`
    });
  }
};

// Get All Contacts
const getContacts = async (req, res) => {
  try {
    const contacts = await Contact.find({})
      .select('-__v -imgId -updatedAt -createdAt')
      .populate({ path: 'owner', select: 'fullname email' });

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
        .json({ success: false, error: 'Search item is required' });
    }

    contacts = await Contact.find({
      name: { $regex: searchQuery, $options: 'i' }
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
      .select('-__v -imgId -updatedAt -createdAt')
      .populate({ path: 'owner', select: 'fullname email' });

    if (!contact)
      return res
        .status(404)
        .json({ success: false, error: 'Contact not found' });

    if (contact.owner._id.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        error: 'Not authorized. Access denied'
      });
    }

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
        .json({ success: false, error: 'Contact not found' });

    if (
      contact.owner._id.toString() !== req.user.id &&
      req.user.role !== 'admin'
    )
      return res.status(403).json({
        success: false,
        error: 'Not authorized. Access denied'
      });

    Object.assign(contact, req.body);
    const updatedContact = await contact.save();

    res.status(200).json({
      success: true,
      message: 'Contact Updated',
      updatedContact
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: `${err.message}`
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
        .json({ success: false, error: 'Contact not found' });

    if (
      contact.owner._id.toString() !== req.user.id &&
      req.user.role !== 'admin'
    ) {
      return res.status(403).json({
        success: false,
        error: 'Not authorized. Access denied'
      });
    }

    await contact.deleteOne();

    res.json({
      success: true,
      message: 'Contact Deleted'
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
  deleteContact
};

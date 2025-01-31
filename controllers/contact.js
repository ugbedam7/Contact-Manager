const { uploadImage } = require('../helper/cloudinary');
const Contact = require('../models/contact');
const User = require('../models/user');
const addContactEmail = require('../utils/email');

// Add Contact
const addContact = async (req, res) => {
  try {
    const userId = req.user.id;
    const { name, email, phone } = req.body;

    if (!name || !email || !phone) {
      return res.status(400).json({
        success: false,
        error: 'Please provide name, email and phone'
      });
    }

    // Get the file object from the request object
    const file = req.file;

    if (!file) {
      return res.status(400).json({
        sucess: false,
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
      error: `Internal server error - ${err.message}`
    });
  }
};

// Get All Contacts
const getAllContacts = async (req, res) => {
  try {
    const contacts = await Contact.find({})
      .select('-__v -imgId -imgUrl -updatedAt -createdAt')
      .populate({ path: 'owner', select: 'fullname email' });

    res.status(200).json(contacts);
  } catch (err) {
    res.status(500).json({
      success: false,
      error: `Internal server error - ${err.message}`
    });
  }
};

// // Get Single Contact (Only owner or admin)
// app.get('/contacts/:id', checkAuth, async (req, res) => {
//   const contact = await Contact.findById(req.params.id);
//   if (!contact) return res.status(404).json({ error: 'Contact not found' });
//   if (contact.owner.toString() !== req.user.id && req.user.role !== 'admin') {
//     return res.status(403).json({ error: 'Not authorized' });
//   }
//   res.json(contact);
// });

// // Update Contact (Only owner or admin)
// app.put('/contacts/:id', checkAuth, async (req, res) => {
//   const contact = await Contact.findById(req.params.id);
//   if (!contact) return res.status(404).json({ error: 'Contact not found' });
//   if (contact.owner.toString() !== req.user.id && req.user.role !== 'admin') {
//     return res.status(403).json({ error: 'Not authorized' });
//   }
//   Object.assign(contact, req.body);
//   await contact.save();
//   res.json(contact);
// });

// // Delete Contact (Only owner or admin)
// app.delete('/contacts/:id', checkAuth, async (req, res) => {
//   const contact = await Contact.findById(req.params.id);
//   if (!contact) return res.status(404).json({ error: 'Contact not found' });
//   if (contact.owner.toString() !== req.user.id && req.user.role !== 'admin') {
//     return res.status(403).json({ error: 'Not authorized' });
//   }
//   await contact.deleteOne();
//   res.json({ message: 'Contact deleted' });
// });

module.exports = {
  addContact,
  getAllContacts
};

const { uploadImage } = require('../helper/cloudinary');
const Contact = require('../models/contact');
const addContactEmail = require('../utils/email');

// Add Contact
const addContact = async (req, res) => {
  const userId = req.user.id;

  if (!req.file || Object.keys(req.file).length === 0) {
    return res.status(400).json({ message: 'No file was uploaded.' });
  }

  // Get the file object from the request object
  const file = req.files[0];
  // Pass the path property of the file object to uploadImage
  const { url, publicId } = await uploadImage(file.path);

  try {
    const { name, email, phone } = req.body;

    const contact = await Contact.create({
      name,
      email,
      phone,
      owner: userId,
      imgUrl: url,
      ImgId: publicId
    });

    // Send Email Notification
    await addContactEmail(email);

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

// // Update Contact (Only owner or admin)
// app.put("/contacts/:id", checkAuth, async (req, res) => {
//     const contact = await Contact.findById(req.params.id);
//     if (!contact) return res.status(404).json({ error: "Contact not found" });
//     if (contact.owner.toString() !== req.user.id && req.user.role !== "admin") {
//       return res.status(403).json({ error: "Not authorized" });
//     }
//     Object.assign(contact, req.body);
//     await contact.save();
//     res.json(contact);
//   });

//   // Delete Contact (Only owner or admin)
//   app.delete("/contacts/:id", checkAuth, async (req, res) => {
//     const contact = await Contact.findById(req.params.id);
//     if (!contact) return res.status(404).json({ error: "Contact not found" });
//     if (contact.owner.toString() !== req.user.id && req.user.role !== "admin") {
//       return res.status(403).json({ error: "Not authorized" });
//     }
//     await contact.deleteOne();
//     res.json({ message: "Contact deleted" });
//   });

module.exports = {
  addContact
};

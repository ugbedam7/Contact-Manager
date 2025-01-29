const mongoose = require('mongoose');
const { Schema } = mongoose;

const ContactSchema = new Schema({
  name: String,
  email: String,
  phone: String,
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
});

const Contact = mongoose.model('Contact', ContactSchema);

module.exports = Contact;

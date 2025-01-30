const mongoose = require('mongoose');
const { Schema } = mongoose;

const ContactSchema = new Schema({
  name: String,
  email: String,
  phone: String,
  imgUrl: String,
  imgId: String,
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
});

const Contact = mongoose.model('Contact', ContactSchema);

module.exports = Contact;

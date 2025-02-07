const mongoose = require('mongoose');
const { Schema } = mongoose;

const ContactSchema = new Schema(
  {
    name: String,
    email: String,
    phone: String,
    address:String,
    xhandle:String,

    imgUrl: {
      type: String,
      required: true
    },

    imgId: {
      type: String,
      required: true
    },

    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    }
  },
  {
    timestamps: true
  }
);

const Contact = mongoose.model('Contact', ContactSchema);

module.exports = Contact;

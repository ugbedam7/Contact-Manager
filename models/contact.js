const mongoose = require("mongoose");
const { Schema } = mongoose;

const ContactSchema = new Schema(
  {
    firstname: {
      type: String,
      required: true
    },

    lastname: {
      type: String,
      required: true
    },

    email: {
      type: String,
      unique: true,
      required: true
    },

    phone: String,
    address: String,

    xhandle: {
      type: String,
      unique: true,
      required: true
    },

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
      ref: "User",
      required: true
    }
  },
  {
    timestamps: true
  }
);

const Contact = mongoose.model("Contact", ContactSchema);

module.exports = Contact;

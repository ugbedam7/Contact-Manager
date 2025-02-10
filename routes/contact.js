const express = require("express");
const { Router } = express;
const router = Router();
const {
  createContact,
  getContacts,
  getContact,
  updateContact,
  deleteContact,
  getQueryContacts,
  updateContactImage
} = require("../controllers/contact");
const { isAuthenticated } = require("../middleware/authCheck");
const { upload } = require("../middleware/upload");

router.post("/", upload.single("image"), isAuthenticated, createContact);
router.get("/", getContacts);
router.get("/", getQueryContacts);
router.get("/:id", isAuthenticated, getContact);
router.put("/:id", isAuthenticated, upload.none(), updateContact);
router.patch(
  "/:id",
  isAuthenticated,
  upload.single("image"),
  updateContactImage
);
router.delete("/:id", isAuthenticated, deleteContact);

module.exports = router;

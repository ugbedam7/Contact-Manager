const express = require('express');
const { Router } = express;
const router = Router();
const {
  addContact,
  getAllContacts,
  getContact,
  updateContact,
  deleteContact
} = require('../controllers/contact');
const { isAuthenticated } = require('../middleware/authCheck');
const { upload } = require('../middleware/upload');

router.post('/', isAuthenticated, upload.single('image'), addContact);
router.get('/', isAuthenticated, getAllContacts);
router.get('/:id', isAuthenticated, getContact);
router.put('/:id', isAuthenticated, upload.none(), updateContact);
router.delete('/:id', isAuthenticated, deleteContact);

module.exports = router;

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
const { isAuthenticated, isAdmin } = require('../middleware/authCheck');
const { upload } = require('../middleware/upload');

router.post('/', upload.single('image'), isAuthenticated, addContact);
router.get('/',  getAllContacts);
router.get('/:id', isAuthenticated, isAdmin, getContact);
router.patch('/:id', upload.none(), isAuthenticated, updateContact);
router.delete('/:id', isAuthenticated, deleteContact);

module.exports = router;

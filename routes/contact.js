const express = require('express');
const { Router } = express;
const router = Router();
const {
  createContact,
  getContacts,
  getContact,
  updateContact,
  deleteContact,
  getQueryContacts
} = require('../controllers/contact');
const { isAuthenticated } = require('../middleware/authCheck');
const { upload } = require('../middleware/upload');

router.post('/', upload.single('image'), isAuthenticated, createContact);
router.get('/', getContacts);
router.get('/', getQueryContacts);
router.get('/:id', isAuthenticated, getContact);
router.patch('/:id', upload.none(), isAuthenticated, updateContact);
router.delete('/:id', isAuthenticated, deleteContact);

module.exports = router;

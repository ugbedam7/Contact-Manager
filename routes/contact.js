const express = require('express');
const { Router } = express;
const router = Router();
const { addContact, getAllContacts } = require('../controllers/contact');
const { isAuthenticated } = require('../middleware/authCheck');
const { upload } = require('../middleware/upload');

router.post('/', isAuthenticated, upload.single('image'), addContact);
router.get('/', isAuthenticated, getAllContacts);

module.exports = router;

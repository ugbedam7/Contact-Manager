const express = require('express');
const { addContact } = require('../controllers/contact');
const { checkAuth } = require('../middleware/authCheck');
const { Router } = express;
const router = Router();

router.post('/contacts', checkAuth, addContact);

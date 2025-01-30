const express = require('express');
const { registerUser } = require('../controllers/auth');
const { Router } = express;
const router = Router();

router.post('/register', registerUser);

module.exports = router;

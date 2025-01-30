const express = require('express');
const { registerUser, loginUser } = require('../controllers/auth');
const { Router } = express;
const router = Router();

router.post('/register', registerUser);
router.post('/login', loginUser);

module.exports = router;

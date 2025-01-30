const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { hashPassword, comparePassword } = require('../utils/authHasher');

// @Desc Register a new user
// @Route POST /api/auth/register
// @Access Public
const registerUser = async (req, res) => {
  const {
    body: { fullname, email, password }
  } = req;

  if (!fullname || !email || !password) {
    return res.status(400).json({
      success: false,
      error: 'Missing required fields'
    });
  }

  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        error: `Email is already taken`
      });
    }

    // Hash the password
    const hashedPassword = await hashPassword(password);

    // Create a new user
    const user = new User({
      email,
      fullname,
      password: hashedPassword
    });

    // Save the user to the database
    const savedUser = await user.save();

    // Remove unwanted fields
    const {
      password: _,
      __v: __,
      updatedAt: ___,
      ...newUser
    } = savedUser.toObject();

    res.status(201).json({
      success: true,
      message: 'User created successfully',
      newUser
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: `Internal Server Error: ${err.message}`
    });
  }
};

// @Desc Login a user
// @Route POST /api/auth/login
// @Access Public
const loginUser = async (req, res) => {
  try {
    // Get the user credentials from the request body
    const { username, password } = req.body;

    let user = await User.findOne({ username });

    if (!user) {
      return res.status(400).json({
        success: false,
        error: 'User not found'
      });
    }

    const isPasswordValid = await comparePassword(password, user.password);

    if (!isPasswordValid) {
      return res.status(400).json({
        success: false,
        error: 'Invalid credentials'
      });
    }

    // Create bearer token
    accessToken = jwt.sign(
      {
        userId: user._id,
        username: user.username,
        role: user.role
      },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: '1h'
      }
    );

    // Modify the session data object
    req.session.auth = true;
    req.session.user = user;

    res
      .cookie('token', accessToken, {
        maxAge: 3600000, // 1 hour
        signed: true
      })
      .status(200)
      .json({
        success: true,
        message: 'User Login successfull',
        accessToken
      });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: `Internal Server Error: ${error.message}`
    });
  }
};

module.exports = {
  loginUser,
  registerUser
};

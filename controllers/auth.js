const User = require('../models/user');
const { hashPassword, comparePassword } = require('../utils/authHasher');
const { generateToken } = require('../utils/generateToken');

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
        error: `User already exists`
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
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        success: false,
        error: 'Invalid credentials'
      });
    }

    const isPasswordValid = await comparePassword(password, user.password);

    if (!isPasswordValid) {
      return res.status(400).json({
        success: false,
        error: 'Invalid credentials'
      });
    }

    // Generate a token
    const accessToken = generateToken(user._id, user.email, user.role);

    res.status(200).json({
      success: true,
      message: 'User Login successfull',
      accessToken
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: `${err.message}`
    });
  }
};

// @Desc log User Out
// @Route POST /api/auth/logout
// @Access Public
const logoutUser = async (req, res) => {
  // Invalidates the token when the user logs out
  try {
    res.cookie('token', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV !== 'development',
      sameSite: 'strict',
      expires: new Date(0)
    });

    res.status(200).json({
      success: true,
      message: 'User logged out.'
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: `${err.message}`
    });
  }
};

module.exports = {
  loginUser,
  registerUser,
  logoutUser
};

const jwt = require('jsonwebtoken');

const generateToken = (id, email, role) => {
  const accessToken = jwt.sign(
    {
      id,
      email,
      role
    },
    process.env.JWT_SECRET_KEY,
    {
      expiresIn: '1h'
    }
  );

  return accessToken;
};

module.exports = {
  generateToken
};

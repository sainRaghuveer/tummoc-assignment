require('dotenv').config();

module.exports = {
  port: process.env.PORT || 3000,
  jwt: {
    secret: process.env.JWT_SECRET || 'mysecretkey',
    options: {
      expiresIn: '1h',
    },
  },
};

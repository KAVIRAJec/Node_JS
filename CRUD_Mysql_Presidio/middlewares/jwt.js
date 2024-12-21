// middlewares/jwt.js

const jwt = require('jsonwebtoken');

const generateToken = (user) => {
  return jwt.sign(user, process.env.SECRET_KEY, { expiresIn: '1h' });
};

const verifyToken = (token) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
      if (err) {
        reject(err);
      } else {
        resolve(decoded);
      }
    });
  });
};

module.exports = { generateToken, verifyToken };

const JWT = require("jsonwebtoken");

const generateJWT = async (payload) => {
  return JWT.sign(payload, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
};

const verifyJWT = async (token) => {
  return await JWT.verify(token, process.env.JWT_SECRET);
};

module.exports = {
  generateJWT,
  verifyJWT,
};

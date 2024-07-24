const jwt = require("jsonwebtoken");
const { ERROR_CODES, ERROR_MESSAGES } = require("../utils/errors");
const JWT_SECRET = require("../utils/config");

const auth = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith("Bearer ")) {
    return res
      .status(ERROR_CODES.UNAUTHORIZED)
      .send({ message: ERROR_MESSAGES.UNAUTHORIZED });
  }

  const token = authorization.replace("Bearer ", "");

  try {
    const payload = jwt.verify(token, JWT_SECRET);
    req.user = payload;
    next();
  } catch (err) {
    return res
      .status(ERROR_CODES.UNAUTHORIZED)
      .send({ message: ERROR_MESSAGES.UNAUTHORIZED });
  }
};

module.exports = auth;

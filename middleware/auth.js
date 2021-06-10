const jwt = require("jsonwebtoken");
const config = require("config");

const { response } = require("../utilities/serverHelper");

// Middleware for verifying the token
// Passed in every private route
module.exports = function (req, res, next) {
  const token = req.header("x-auth-token");

  if (!token) {
    return response(res, 401, false, "Token not found. Access denied.");
  }

  try {
    const decoded = jwt.verify(token, config.get("jwtSecret"));

    // Add the payload from JWT to the request
    req.user = decoded.user;
    next();
  } catch (err) {
    return response(res, 401, false, "Invalid token. Access denied.");
  }
};

const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");
const jwtSecret = config.get("jwtSecret");
const auth = require("../../middleware/auth");

const { validate, response } = require("../../utilities/serverHelper");

const User = require("../../models/User");

// Register user
router.post("/signUp", async (req, res) => {
  try {
    let firstName, lastName, email, password;
    const valid = validate(req.body, { firstName, lastName, email, password });
    if (!valid.success) return response(res, 400, false, valid.message);

    let user = await User.findOne({ email: req.body.email });
    if (user) return response(res, 400, false, "User already exists.");

    // Hash the password with some salt using Bcrypt
    const salt = await bcrypt.genSalt(10);
    hashedPassword = await bcrypt.hash(req.body.password, salt);

    user = User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: hashedPassword,
    });

    await user.save();

    const payload = {
      user: {
        id: user.id,
      },
    };

    // Populate the JWT with payload and sign it
    jwt.sign(payload, jwtSecret, { expiresIn: 360000 }, (err, token) => {
      if (err) throw err;
      return response(res, 200, true, "User created successfully.", {
        token: token,
      });
    });
  } catch (err) {
    console.error(err.message);
    return response(res, 500, false, "Internal server error.");
  }
});

// User login
router.post("/signIn", async (req, res) => {
  try {
    let email, password;
    const valid = validate(req.body, { email, password });
    if (!valid.success) return response(res, 400, false, valid.message);

    let user = await User.findOne({ email: req.body.email });

    if (!user) return response(res, 404, false, "User does not exist.");

    // Check the password against the hash-saved one using Bcrypt
    const isMatched = await bcrypt.compare(req.body.password, user.password);

    if (!isMatched)
      return response(res, 400, false, "Password does not match.");

    const payload = {
      user: {
        id: user.id,
      },
    };

    // Populate the JWT with payload and sign it
    jwt.sign(payload, jwtSecret, { expiresIn: 360000 }, (err, token) => {
      if (err) throw err;
      return response(res, 200, true, "User logged in successfully.", {
        token: token,
      });
    });
  } catch (err) {
    console.error(err.message);
    return response(res, 500, false, "Internal server error.");
  }
});

// Update password
router.post("/changePassword", auth, async (req, res) => {
  try {
    let oldPassword, password;
    const valid = validate(req.body, { oldPassword, password });
    if (!valid.success) return response(res, 400, false, valid.message);

    let user = await User.findById(req.user.id);

    // Check the old password against the hash-saved one using Bcrypt
    const isMatched = await bcrypt.compare(req.body.oldPassword, user.password);

    if (!isMatched)
      return response(res, 400, false, "Old password does not match.");

    // Hash the new password with some salt using Bcrypt
    const salt = await bcrypt.genSalt(10);
    hashedPassword = await bcrypt.hash(req.body.password, salt);
    user.password = hashedPassword;

    await user.save();

    return response(res, 200, true, "Password updated successfully.", user);
  } catch (err) {
    console.error(err.message);
    return response(res, 500, false, "Internal server error.");
  }
});

module.exports = router;

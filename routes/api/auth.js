const express = require("express");
const router = express.Router();

const auth = require("../../middleware/auth");
const { response } = require("../../utilities/serverHelper");

const User = require("../../models/User");

router.get("/", auth, async (req, res) => {
  try {
    // Use the user ID added to the request from the middleware to extract user info
    const user = await User.findById(req.user.id).select("-password");

    return response(res, 200, true, null, user);
  } catch (err) {
    console.error(err.message);
    return response(res, 500, false, "Internal server error.");
  }
});

module.exports = router;

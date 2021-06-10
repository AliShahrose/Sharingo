const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

const { validate, response } = require("../utilities/serverHelper");
const {
  uploadImage,
  deleteImage,
  getDefaultImage,
} = require("../utilities/cloudinary");

// Models
const User = require("../models/User");
const Profile = require("../models/Profile");

// Create and update profile
router.post("/add", auth, async (req, res) => {
  try {
    let dateOfBirth, gender, city, country, phone;
    const valid = validate(req.body, {
      dateOfBirth,
      gender,
      city,
      country,
      phone,
    });
    if (!valid.success) return response(res, 400, false, valid.message);

    // Prepare an object with the available fields
    const profileFields = {};
    profileFields.user = req.user.id;
    profileFields.dateOfBirth = req.body.dateOfBirth;
    profileFields.gender = req.body.gender;
    profileFields.city = req.body.city;
    profileFields.country = req.body.country;
    profileFields.phone = req.body.phone;

    if (req.body.bio) profileFields.bio = req.body.bio;

    // Neatly format the list of hobbies
    if (req.body.hobbies) {
      profileFields.hobbies = req.body.hobbies
        .split(",")
        .map((hobby) => hobby.trim());
    }

    profileFields.education = {};
    if (req.body.level) profileFields.education.level = req.body.level;
    if (req.body.degree) profileFields.education.degree = req.body.degree;
    if (req.body.institute)
      profileFields.education.institute = req.body.institute;
    if (req.body.graduationDate)
      profileFields.education.graduationDate = req.body.graduationDate;

    profileFields.socialMedia = {};
    if (req.body.facebook)
      profileFields.socialMedia.facebook = req.body.facebook;
    if (req.body.twitter) profileFields.socialMedia.twitter = req.body.twitter;
    if (req.body.instagram)
      profileFields.socialMedia.instagram = req.body.instagram;
    if (req.body.linkedIn)
      profileFields.socialMedia.linkedIn = req.body.linkedIn;

    let profile = await Profile.findOne({ user: req.user.id });

    // Condition 1: Setting a new profile and sending an image
    if (!profile && req.body.image) {
      profileFields.image = {};

      // Upload the new image to Cloudinary and save the neccessary info
      const reply = await uploadImage(req.body.image, "profiles");
      profileFields.image.publicID = reply.public_id;
      profileFields.image.url = reply.secure_url;
    }
    // Condition 2: Setting a new profile and not sending an image
    else if (!profile && !req.body.image) {
      profileFields.image = {};

      // Get a default already saved in Cloudinary and save the neccessary info
      const reply = await getDefaultImage();
      profileFields.image.publicID = reply.public_id;
      profileFields.image.url = reply.secure_url;
    }
    // Condition 3: Updating an existing profile and sending an image
    else if (profile && req.body.image) {
      profileFields.image = {};

      // Delete the previously uploaded image from Cloudinary
      // If the previous image is the default one, do not delete it from Cloudinary
      if (profile.image.publicID.indexOf("default/") === -1) {
        await deleteImage(profile.image.publicID);
      }

      // Upload the new image to Cloudinary and save the neccessary info
      const reply = await uploadImage(req.body.image, "profiles");
      profileFields.image.publicID = reply.public_id;
      profileFields.image.url = reply.secure_url;
    }
    // Condition 4: Updating an existing profile and not sending an image
    // if (profile && !req.body.image) {
    //   // Do not make the image object
    // }

    // If profile exists already, update it with the object created earlier
    if (profile) {
      profile = await Profile.findOneAndUpdate(
        { user: req.user.id },
        { $set: profileFields },
        { new: true }
      );
      return response(
        res,
        200,
        true,
        "Profile updated and fetched successfully.",
        profile
      );
    }

    // Save a new profile from the object created earlier
    profile = new Profile(profileFields);
    await profile.save();

    return response(
      res,
      200,
      true,
      "Profile created and fetched successfully.",
      profile
    );
  } catch (err) {
    console.error(err.message);
    return response(res, 500, false, "Internal server error.");
  }
});

// Get all profiles
router.get("/all", auth, async (req, res) => {
  try {
    // Add name from user to profile
    const profiles = await Profile.find().populate("user", [
      "firstName",
      "lastName",
    ]);

    return response(
      res,
      200,
      true,
      "All profiles fetched successfully.",
      profiles
    );
  } catch (err) {
    console.error(err.message);
    return response(res, 500, false, "Internal server error.");
  }
});

// Get the profile of a single user
router.get("/:user_id", async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.params.user_id,
    }).populate("user", ["firstName", "lastName"]);

    if (!profile)
      return response(res, 404, false, "Profile does not exist.", profile);

    return response(res, 200, true, "Profile fetched successfully.", profile);
  } catch (err) {
    console.error(err.message);
    return response(res, 500, false, "Internal server error.");
  }
});

// Get current user profile
router.get("/", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.user.id,
    }).populate("user", ["firstName", "lastName"]);

    if (!profile) return response(res, 404, false, "Profile does not exist.");

    return response(res, 200, true, "Profile fetched successfully.", profile);
  } catch (err) {
    console.error(err.message);
    return response(res, 500, false, "Internal server error.");
  }
});

// Delete the profile and the user along with that
router.delete("/", auth, async (req, res) => {
  try {
    // Delete profile (also the image from Cloudinary)
    let profile = await Profile.findOne({ user: req.user.id });
    if (profile && profile.image.publicID.indexOf("default/") === -1) {
      await deleteImage(profile.image.publicID);
    }
    await profile.remove();

    // Delete User
    await User.findOneAndRemove({ _id: req.user.id });

    return response(res, 200, true, "User and Profile deleted successfully.");
  } catch (err) {
    console.error(err.message);
    return response(res, 500, false, "Internal server error.");
  }
});

module.exports = router;

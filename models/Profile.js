const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  dateOfBirth: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  image: {
    publicID: {
      type: String,
    },
    url: {
      type: String,
    },
  },
  bio: {
    type: String,
  },
  hobbies: {
    type: [String],
  },
  education: {
    level: {
      type: String,
    },
    degree: {
      type: String,
    },
    institute: {
      type: String,
    },
    graduationDate: {
      type: String,
    },
  },
  socialMedia: {
    facebook: {
      type: String,
    },
    twitter: {
      type: String,
    },
    instagram: {
      type: String,
    },
    linkedIn: {
      type: String,
    },
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const Profile = mongoose.model("profile", profileSchema);

module.exports = Profile;

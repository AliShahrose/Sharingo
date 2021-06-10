const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  fullName: {
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

  caption: {
    type: String,
  },
  likes: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
      },
    },
  ],
  comments: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
      },
      fullName: {
        type: String,
        required: true,
      },
      text: {
        type: String,
        required: true,
      },
      date: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  date: {
    type: Date,
    default: Date.now,
  },
});

const Post = mongoose.model("post", postSchema);

module.exports = Post;

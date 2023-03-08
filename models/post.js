const mongoose = require("mongoose");

//creating schema for
const postSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
    },
    //link post to the signed in user by object ID
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", //refer object ID of user schema
    },
  },
  {
    timestamps: true,
  }
);

const Post = mongoose.model("Post", postSchema);

module.exports = Post;

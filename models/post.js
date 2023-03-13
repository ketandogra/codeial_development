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
    //include the array of ids of all comments in this post schema itself
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Post = mongoose.model("Post", postSchema);

module.exports = Post;

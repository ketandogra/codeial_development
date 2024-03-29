const Post = require("../../../models/post");
const Comment = require("../../../models/comment");

module.exports.index = async function (req, res) {
  let posts = await Post.find({})
    .sort("-createdAt")
    .populate("user")
    .populate({ path: "comments", populate: { path: "user" } });

  return res.json(200, {
    message: "List of posts v1",
    posts: posts,
  });
};

module.exports.destroy = async function (req, res) {
  try {
    let post = await Post.findById(req.params.id);
    // .id means connecting the object id into string
    if (post.user == req.user.id) {
      post.remove();

      await Comment.deleteMany({ post: req.params.id });
      // if (req.xhr) {
      //   return res.status(200).json({
      //     data: {
      //       post_id: req.params.id,
      //     },
      //     message: "Post deleted",
      //   });
      // }

      // req.flash("success", "Post and associate comments deleted!");
      // return res.redirect("back");
      // } else {
      //   req.flash("error", "You cannot delete this post!");
      return res.status(200).json({
        message: "Post and associated comments deleted successfully!",
      });
    } else {
      return res.json(401, { message: "You can not delete this post" });
    }
  } catch (err) {
    console.log("error", err);
    return res.json(500, {
      message: "Internal Server error",
    });
  }
};

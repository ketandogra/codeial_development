const Post = require("../models/post");
const User = require("../models/user");

module.exports.home = async function (req, res) {
  // console.log(req.cookies);
  // res.cookie('user_id', 25);

  //   Post.find({ user: req.user._id }, function (err, posts) {
  //     return res.render("home", {
  //       title: "Codeial | Home",
  //       posts: posts,
  //     });
  //   });

  //populate the user object(document) from users collection for the each post
  // Post.find({})
  //   .populate("user")
  //   .populate({ path: "comments", populate: { path: "user" } })
  //   .exec(function (err, posts) {
  //     User.find({}, function (err, users) {
  // return res.render("home", {
  //   title: "Codeial | Home",
  //   posts: posts,
  //   all_users: users,
  // });
  //     });
  //   });

  //using Async  Await
  try {
    let posts = await Post.find({})
      .sort("-createdAt")
      .populate("user")
      .populate({ path: "comments", populate: { path: "user" } });

    let users = await User.find({});

    return res.render("home", {
      title: "Codeial | Home",
      posts: posts,
      all_users: users,
    });
  } catch (err) {
    console.log("Error", err);
    return;
  }
};

// module.exports.actionName = function(req, res){}

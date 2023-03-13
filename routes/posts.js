const express = require("express");
const router = express.Router();

const passport = require("passport");

const postController = require("../controllers/posts_controller");

//check whether the user is authenticated during the time of creating a post or not
router.post("/create", passport.checkAuthentication, postController.create);

// for delete posts and its associated comments
router.get(
  "/destroy/:id",
  passport.checkAuthentication,
  postController.destroy
);

module.exports = router;

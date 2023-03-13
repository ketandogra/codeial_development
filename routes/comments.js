const express = require("express");
const router = express.Router();

const passport = require("passport");

const commentsController = require("../controllers/comments_controller");

//check whether the user is authenticated during the time of creating a post or not
router.post("/create", passport.checkAuthentication, commentsController.create);

module.exports = router;

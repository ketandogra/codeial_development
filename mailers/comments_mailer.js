const nodeMailer = require("../config/nodemailer");

exports.newComment = (comment) => {
  console.log("inside newComment mailer");

  nodeMailer.transporter.sendMail({
    from: "ketandogra1367@gmail.com",
    to: comment.user.email,
  });
};

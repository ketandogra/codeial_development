const nodemailer = require("nodemailer");
const ejs = require("ejs");
const path = require("path");

// which send the email - define how is the communication will take place
let transporter = nodemailer.createTransport({
  service: "gmail",
  //gmail mailing server - created this domain
  host: "smtp.gamil.com",
  port: 587,
  secure: false,
  auth: {
    user: "dealbest92",
    pass: "im2fast4u",
  },
});

//Need to define we are using template rendering engine-- EJS

let renderTemplate = (data, relativePath) => {
  let mailHTMl;
  ejs.renderFile(
    // relative path is place from where this function is being  called
    path.join(__dirname, "../views/mailers", relativePath),
    data,
    function (err, template) {
      if (err) {
        console.log("Error in rendering template!");
        return;
      }
      mailHTML = template;
    }
  );
  return mailHTML;
};

//export two keys
module.exports = {
  transporter: transporter,
  renderTemplate: renderTemplate,
};

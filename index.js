const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();
const port = 8000;
const expressLayouts = require("express-ejs-layouts");
const db = require("./config/mongoose");
// for session encrypted cookies
const session = require("express-session");
const passport = require("passport");
const passportLocal = require("./config/passport-local-strategy");
//mongo store use to store the session cookie in the db
const MongoStore = require("connect-mongo");

//connect flash message
const flash = require("connect-flash");
const customMware = require("./config/middleware");

// Parser- middleware
app.use(express.urlencoded());
app.use(cookieParser());

app.use(express.static("./assets"));

app.use(expressLayouts);
// extract style and scripts from sub pages into the layout
app.set("layout extractStyles", true);
app.set("layout extractScripts", true);

// set up the view engine
app.set("view engine", "ejs");
app.set("views", "./views");

// set cookie details
app.use(
  session({
    name: "codeial",
    // Todo change secert befor deployement in production mode
    secret: "blahsomething",
    //if the identity not establish then donot want to store extra data in session cookie
    saveUninitialized: false,
    //when identity is established or some sort of data present in sesion cookie then do not want rewrite the session data when its not change
    resave: false,
    cookie: {
      maxAge: 1000 * 60 * 100,
    },
    //mongo store use to store the session cookie in the db
    store: MongoStore.create(
      {
        mongoUrl: "mongodb://0.0.0.0:27017/codeial",
        autoRemove: "disabled",
      },
      function (err) {
        console.log(err || "connect mongodb setup ok");
      }
    ),
  })
);

// tell app to use passport
app.use(passport.initialize());

// passport help in maintaining the session
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

app.use(flash());
app.use(customMware.setFlash);

// use express router
app.use("/", require("./routes"));

app.listen(port, function (err) {
  if (err) {
    console.log(`Error in running the server: ${err}`);
  }

  console.log(`Server is running on port: ${port}`);
});

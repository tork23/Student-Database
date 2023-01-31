// Require libraries
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const app = express();
const port = process.env.PORT || 8000;
var expressLayouts = require("express-ejs-layouts");
const studentDB = require("./config/mongoose");
const flash = require("connect-flash");
const customWare = require("./config/middleware");

// used for session cookie
const session = require("express-session");
const passport = require("passport");
const passportLocal = require("./config/passport-local-strategy");

// Require Connect-mongo
const MongoStore = require("connect-mongo");

// Use ejs
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "views")));

// mongo store is used to store the session cookie in the db
app.use(
  session({
    name: "student-database",
    // TODO change the secret before deployment in production mode
    secret: "nothing",
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 1000 * 60 * 100,
    },
    store: MongoStore.create(
      {
        // mongoURl:`mongodb+srv://Joyous:Manual@cluster0.wbtbbau.mongodb.net/?retryWrites=true&w=majority`,
        mongoUrl: "mongodb://127.0.0.1:27017/studentDB",
        autoRemove: "disabled",
      },
      function (err) {
        console.log(err || "connect-mongodb setup ok");
      }
    ),
  })
);

// Tell app to use this session cookie
app.use(passport.initialize());
app.use(passport.session());

// Use flash
app.use(flash());
app.use(customWare.setFlash);

// Tell app to use Authenticated user
app.use(passport.setAuthenticatedUser);

// Body parser
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));

// Cookie parser
app.use(cookieParser());

// Use express layouts
app.use(expressLayouts);

// Use express router
app.use("/", require("./routes/index"));

// extract style and scripts from sub pages into the layout
app.set("layout extractScripts", true);
app.set("layout extractStyles", true);

// App listening on port
app.listen(port, function (err) {
  if (err) {
    console.log(`Error in running the server:${err}`);
  } else {
    console.log(`Server is running on port:${port}`);
  }
});

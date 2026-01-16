const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const passport = require("passport");

const app = express();

app.set("view engine", "ejs");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

// routes
app.use("/", require("./routes/auth.routes"));
app.use("/", require("./routes/google.routes"));
app.use("/", require("./routes/profile.routes"));
app.use("/", require("./routes/post.routes"));
app.use("/", require("./routes/feed.routes"));
app.use("/", require("./routes/comment.routes"));
app.use("/", require("./routes/like.routes"));
app.use("/", require("./routes/user.routes"));
app.use("/", require("./routes/follow.routes"));
app.use("/", require("./routes/notification.routes"));
app.use("/", require("./routes/chat.routes"));
app.use("/", require("./routes/admin.routes"));
app.use("/", require("./routes/moderation.routes"));
app.use("/", require("./routes/ban.routes"));
app.use("/", require("./routes/api.routes"));

module.exports = app;

const userModel = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const sendMail = require("../utils/sendMail");
const passport = require("passport");
const setTokenCookie = require("../utils/setTokenCookie");


exports.home = (req, res) => res.render("index");

exports.register = async (req, res) => {
  const { email, password, username, name, age } = req.body;

  const existing = await userModel.findOne({ email });
  if (existing) return res.send("User already exists");

  const verifyToken = crypto.randomBytes(32).toString("hex");
  const hash = await bcrypt.hash(password, 10);

  const user = await userModel.create({
    name,
    username,
    email,
    age,
    password: hash,
    verifyToken,
    isVerified: false,
    profilepic: process.env.DEFAULT_PROFILE_PIC
  });

  const token = jwt.sign(
    {
      email: user.email,
      userid: user._id,
      role: user.role      // Now also save roles globally of logged in users 
    },
    process.env.JWT_SECRET
  );

  setTokenCookie(res, token);


  const link = `${process.env.BASE_URL}/verify/${verifyToken}`;
  await sendMail(email, link);

  res.render("check-email");
};

exports.loginPage = (req, res) => res.render("login");

exports.login = async (req, res) => {
  const { email, password } = req.body;
  const user = await userModel.findOne({ email });

  if (!user) return res.send("Invalid credentials");
  if (!user.isVerified) return res.send("Verify email first");

  const ok = await bcrypt.compare(password, user.password);
  if (!ok) return res.send("Invalid credentials");

  const token = jwt.sign(
    {
      email: user.email,
      userid: user._id,
      role: user.role      // Now also save roles globally of logged in users 
    },
    process.env.JWT_SECRET
  );

  setTokenCookie(res, token);
  res.redirect("/feed");
};

exports.logout = (req, res) => {
  res.clearCookie("tokenwa");
  res.redirect("/login");
};


exports.verifyEmail = async (req, res) => {
  const user = await userModel.findOne({ verifyToken: req.params.token });
  if (!user) return res.send("Invalid link");

  user.isVerified = true;
  user.verifyToken = null;
  await user.save();

  res.render("verified");
};

// ---------------- Google Auth ----------------
// start google login
exports.googleAuth = passport.authenticate("google", {
  scope: ["profile", "email"]
});

// google callback
exports.googleCallback = (req, res) => {
    const user = req.user;
    const token = jwt.sign(
    {
      email: user.email,
      userid: user._id,
      role: user.role      // Now also save roles globally of logged in users 
    },
    process.env.JWT_SECRET
  );


  setTokenCookie(res, token);
  res.redirect("/feed");
};
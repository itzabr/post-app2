const router = require("express").Router();
const passport = require("passport");
const authController = require("../controllers/auth.controller");

// start google login
router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// google callback
router.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  authController.googleCallback
);

module.exports = router;

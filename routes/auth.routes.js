const router = require("express").Router();
const ctrl = require("../controllers/auth.controller");
const passport = require("passport");

// pages
router.get("/", ctrl.home);
router.get("/login", ctrl.loginPage);

// actions
router.post("/register", ctrl.register);
router.post("/login", ctrl.login);
router.get("/logout", ctrl.logout);

// email verification
router.get("/verify/:token", ctrl.verifyEmail);


module.exports = router;

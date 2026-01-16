const router = require("express").Router();
const isLoggedIn = require("../middlewares/isLoggedIn");
const ctrl = require("../controllers/user.controller");
const authorizeRole = require("../middlewares/authorizeRole");

// view any user profile
router.get("/user/:id", isLoggedIn, ctrl.getUserProfile);

// search users
router.get("/search/users", isLoggedIn, ctrl.searchUsers);

module.exports = router;

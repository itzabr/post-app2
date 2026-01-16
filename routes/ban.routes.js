const router = require("express").Router();
const isLoggedIn = require("../middlewares/isLoggedIn");
const authorizeRole = require("../middlewares/authorizeRole");
const banCtrl = require("../controllers/ban.controller");

// Ban the user
router.post(
  "/ban/user/:id",
  isLoggedIn,
  authorizeRole("admin", "moderator"),
  banCtrl.banUser
);

// Unban the user
router.get(
  "/unban/user/:id",
  isLoggedIn,
  authorizeRole("admin", "moderator"),
  banCtrl.unbanUser
);

module.exports = router;

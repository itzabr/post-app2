const router = require("express").Router();
const isLoggedIn = require("../middlewares/isLoggedIn");
const ctrl = require("../controllers/like.controller");
const checkBan = require("../middlewares/checkBan");

// like from profile
router.get("/like/:id", isLoggedIn, checkBan, ctrl.likeProfile);

// like from feed
router.get("/flike/:id", isLoggedIn, checkBan, ctrl.likeFeed);

// show who liked
router.get("/post/:id/likes", isLoggedIn, ctrl.showLikes);

module.exports = router;

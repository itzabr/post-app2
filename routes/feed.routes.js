const router = require("express").Router();
const isLoggedIn = require("../middlewares/isLoggedIn");
const ctrl = require("../controllers/feed.controller");

// show feed
router.get("/feed", isLoggedIn, ctrl.feed);

// following feed
router.get("/feed/following", isLoggedIn, ctrl.followingFeed);

module.exports = router;

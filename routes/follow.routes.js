const router = require("express").Router();
const isLoggedIn = require("../middlewares/isLoggedIn");
const ctrl = require("../controllers/follow.controller");
const userModel = require("../models/user");

// follow / unfollow
router.get("/follow/:id", isLoggedIn, ctrl.toggleFollow);

// show followers
router.get("/followers/:id", isLoggedIn, async (req, res) => {
  const user = await userModel
    .findById(req.params.id)
    .populate("followers", "username profilepic");

  res.render("partials/followers", {
    users: user.followers
  });
});

// show following
router.get("/following/:id", isLoggedIn, async (req, res) => {
  const user = await userModel
    .findById(req.params.id)
    .populate("following", "username profilepic");

  res.render("partials/following", {
    users: user.following
  });
});

// accept request
router.get("/follow/request/accept/:id", isLoggedIn, ctrl.acceptRequest);

// reject request
router.get("/follow/request/reject/:id", isLoggedIn, ctrl.rejectRequest);

module.exports = router;

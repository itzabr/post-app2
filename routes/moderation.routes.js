const router = require("express").Router();
const isLoggedIn = require("../middlewares/isLoggedIn");
const authorizeRole = require("../middlewares/authorizeRole");
const modCtrl = require("../controllers/moderation.controller");

// delete any post
router.get(
  "/moderate/post/delete/:id",
  isLoggedIn,
  authorizeRole("admin", "moderator"),
  modCtrl.deleteAnyPost
);

// delete any comment
router.get(
  "/moderate/comment/delete/:postId/:commentId",
  isLoggedIn,
  authorizeRole("admin", "moderator"),
  modCtrl.deleteAnyComment
);

module.exports = router;

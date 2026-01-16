const router = require("express").Router();
const isLoggedIn = require("../middlewares/isLoggedIn");
const followCtrl = require("../controllers/follow.controller");
const likeCtrl = require("../controllers/like.controller");
const commentCtrl = require("../controllers/comment.controller");

router.post("/api/follow/:id", isLoggedIn, followCtrl.toggleFollowAjax);
router.post("/api/like/:id", isLoggedIn, likeCtrl.toggleLikeAjax);
router.post("/api/comment/:id", isLoggedIn, commentCtrl.addCommentAjax);

module.exports = router;

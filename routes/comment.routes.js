const router = require("express").Router();
const isLoggedIn = require("../middlewares/isLoggedIn");
const ctrl = require("../controllers/comment.controller");
const checkBan = require("../middlewares/checkBan");

// add comment
router.post("/comment/:id", isLoggedIn, checkBan, ctrl.addComment);

module.exports = router;

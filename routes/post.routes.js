const router = require("express").Router();
const isLoggedIn = require("../middlewares/isLoggedIn");
const ctrl = require("../controllers/post.controller");
const authorizeRole = require("../middlewares/authorizeRole");
const checkBan = require("../middlewares/checkBan");

// create post
router.post("/post", isLoggedIn, checkBan, ctrl.createPost);

// edit post
router.get("/edit/:id", isLoggedIn, ctrl.editPage);
router.post("/edit/:id", isLoggedIn, ctrl.updatePost);

// delete post
router.get("/delete/:id", isLoggedIn, ctrl.deletePost);

// single post (from notification)
router.get("/post/:id", isLoggedIn, ctrl.singlePost);


// moderator + admin
router.get(
  "/admin/post/delete/:id",
  isLoggedIn,
  authorizeRole("moderator", "admin"),
  ctrl.deleteAnyPost
);

module.exports = router;

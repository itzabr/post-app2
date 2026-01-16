const router = require("express").Router();
const isLoggedIn = require("../middlewares/isLoggedIn");
const upload = require("../config/multer.config");
const ctrl = require("../controllers/profile.controller");

// view profile
router.get("/profile", isLoggedIn, ctrl.profile);

// upload profile pic page
router.get("/profile/upload", isLoggedIn, ctrl.uploadPage);

// upload profile pic post logic
router.post("/upload", isLoggedIn, upload.single("image"), ctrl.uploadPic);

// The toggle button to choose between private account and public account 
router.get("/profile/privacy/toggle", isLoggedIn, ctrl.togglePrivacy);

module.exports = router;

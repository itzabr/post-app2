const router = require("express").Router();
const isLoggedIn = require("../middlewares/isLoggedIn");
const ctrl = require("../controllers/notification.controller");

// show notifications
router.get("/notifications", isLoggedIn, ctrl.showNotifications);

module.exports = router;

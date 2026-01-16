const router = require("express").Router();
const isLoggedIn = require("../middlewares/isLoggedIn");
const ctrl = require("../controllers/chat.controller");

// open chat with user
router.get("/chat/:id", isLoggedIn, ctrl.openChat);

// send message
router.post("/chat/:id", isLoggedIn, ctrl.sendMessage);

// list all chats
router.get("/chats", isLoggedIn, ctrl.chatList);

module.exports = router;

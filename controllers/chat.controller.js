const Message = require("../models/message");
const userModel = require("../models/user");
const Notification = require("../models/notification");

exports.openChat = async (req, res) => {
  const otherUserId = req.params.id;
  const myId = req.user.userid;
  const otherUser = await userModel.findById(otherUserId);
  const me=await userModel.findById(myId);
  // if other user is private
  if (otherUser.isPrivate && !otherUser.following.includes(me._id)) {
    return res.send("You cannot message this user.");
  }

  const messages = await Message.find({
    $or: [
      { from: myId, to: otherUserId },
      { from: otherUserId, to: myId }
    ]
  }).sort({ createdAt: 1 });

  

  res.render("chat", { messages, otherUser, currentUser: myId });
};

exports.sendMessage = async (req, res) => {
  const otherUserId = req.params.id;

  await Message.create({
    from: req.user.userid,
    to: otherUserId,
    text: req.body.text
  });

  await Notification.create({
    user: otherUserId,
    from: req.user.userid,
    type: "message",
    message: "sent you a message"
  });

  res.redirect("/chat/" + otherUserId);
};

exports.chatList = async (req, res) => {
  const myId = req.user.userid;

  const messages = await Message.find({
    $or: [{ from: myId }, { to: myId }]
  }).populate("from to");

  const usersMap = {};

  messages.forEach(m => {
    if (m.from._id.toString() !== myId) usersMap[m.from._id] = m.from;
    if (m.to._id.toString() !== myId) usersMap[m.to._id] = m.to;
  });

  res.render("chats", { chatUsers: Object.values(usersMap) });
};

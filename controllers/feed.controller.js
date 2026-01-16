const postModel = require("../models/post");
const userModel = require("../models/user");
const Notification = require("../models/notification");


exports.feed = async (req, res) => {

  // logged in user
  const me = await userModel.findById(req.user.userid);

  // unread notifications
  const unreadCount = await Notification.countDocuments({
    user: req.user.userid,
    isRead: false
  });

  /*
    LOGIC:
    1. I can always see:
       - my own posts
    2. I can see:
       - posts of PUBLIC users
    3. I can see:
       - posts of PRIVATE users ONLY if I follow them
  */

  // users whose posts I can see
  const allowedUserIds = new Set();

  // always include myself
  allowedUserIds.add(me._id.toString());

  // 1️⃣ get all public users
  const publicUsers = await userModel.find({ isPrivate: false }).select("_id");
  publicUsers.forEach(u => allowedUserIds.add(u._id.toString()));

  // 2️⃣ add private users I follow
  me.following.forEach(id => allowedUserIds.add(id.toString()));

  // 3️⃣ fetch posts only from allowed users
  const posts = await postModel
    .find({ user: { $in: Array.from(allowedUserIds) } })
    .populate("user")
    .populate("comments.user")
    .sort({ date: -1 });

  res.render("feed", {
    posts,
    currentUser: me,
    user: me,
    unreadCount,
    isFollowingFeed: false
  });
};

// ---------------- FOLLOWING FEED ----------------
exports.followingFeed = async (req, res) => {

  // 1. get logged in user
  const user = await userModel.findById(req.user.userid);

  // 2. get ids of users I follow
  const followingIds = user.following;

  // 3. count notifications
  const unreadCount = await Notification.countDocuments({
    user: req.user.userid,
    isRead: false
  });

  // 4. get posts only from following users
  const posts = await postModel
    .find({ user: { $in: followingIds } })   // 👈 MAGIC LINE
    .populate("user")
    .populate("comments.user")
    .sort({ date: -1 });

  res.render("feed", {
    posts,
    currentUser: user,
    user,
    unreadCount,
    isFollowingFeed: true   // flag for UI
  });
};

const Notification = require("../models/notification");

exports.showNotifications = async (req, res) => {
  await Notification.updateMany(
    { user: req.user.userid, isRead: false },
    { $set: { isRead: true } }
  );

  const notifications = await Notification
    .find({ user: req.user.userid })
    .populate("from")
    .populate("post")
    .sort({ createdAt: -1 });

  res.render("notifications", { notifications });
};

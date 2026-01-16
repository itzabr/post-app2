const userModel = require("../models/user");
const Notification = require("../models/notification");

// ban user
exports.banUser = async (req, res) => {
  const { days, reason } = req.body;
  const targetUserId = req.params.id;

  const until = new Date();
  until.setDate(until.getDate() + Number(days));

  const user = await userModel.findByIdAndUpdate(
    targetUserId,
    {
      isBanned: true,
      banUntil: until,
      banReason: reason
    },
    { new: true }
  );

  // notify user
  await Notification.create({
    user: user._id,
    from: req.user.userid,
    type: "ban",
    message: `You are banned for ${days} days. Reason: ${reason}`
  });

  res.redirect(req.get("Referrer"));
};

// unban user manually
exports.unbanUser = async (req, res) => {
  const targetUserId = req.params.id;

  await userModel.findByIdAndUpdate(targetUserId, {
    isBanned: false,
    banUntil: null,
    banReason: ""
  });

  await Notification.create({
    user: targetUserId,
    from: req.user.userid,
    type: "ban",
    message: "Your ban has been removed by admin"
  });

  res.redirect(req.get("Referrer"));
};

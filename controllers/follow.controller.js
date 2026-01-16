const userModel = require("../models/user");
const Notification = require("../models/notification");

// follow / request / unfollow
exports.toggleFollow = async (req, res) => {

  const targetUser = await userModel.findById(req.params.id); // profile owner
  const currentUser = await userModel.findById(req.user.userid); // me

  if (!targetUser || !currentUser) {
    return res.send("User not found");
  }

  // already following → unfollow
  if (targetUser.followers.includes(currentUser._id)) {

    targetUser.followers.pull(currentUser._id);
    currentUser.following.pull(targetUser._id);

    await targetUser.save();
    await currentUser.save();

    return res.redirect(req.get("Referrer"));
  }

  // -------- PRIVATE ACCOUNT --------
  if (targetUser.isPrivate) {

    // already requested
    if (targetUser.followRequests.includes(currentUser._id)) {
      return res.redirect(req.get("Referrer"));
    }

    // add to follow requests
    targetUser.followRequests.push(currentUser._id);
    await targetUser.save();

    // notify
    await Notification.create({
      user: targetUser._id,
      from: currentUser._id,
      type: "follow-request",
      message: "sent you a follow request"
    });

    return res.redirect(req.get("Referrer"));
  }

  // -------- PUBLIC ACCOUNT --------
  targetUser.followers.push(currentUser._id);
  currentUser.following.push(targetUser._id);

  await Notification.create({
    user: targetUser._id,
    from: currentUser._id,
    type: "follow",
    message: "started following you"
  });

  await targetUser.save();
  await currentUser.save();

  res.redirect(req.get("Referrer"));
};


// accept follow request
exports.acceptRequest = async (req, res) => {

  const me = await userModel.findById(req.user.userid);
  const requester = await userModel.findById(req.params.id);

  if (!me.followRequests.includes(requester._id)) {
    return res.redirect(req.get("Referrer"));
  }

  // remove from requests
  me.followRequests.pull(requester._id);

  // add to followers
  me.followers.push(requester._id);
  requester.following.push(me._id);

  await me.save();
  await requester.save();

    // 🧹 remove follow-request notification
    await Notification.deleteMany({
      user: me._id,
      from: requester._id,
      type: "follow-request"
    });

  // notify requester
  await Notification.create({
    user: requester._id,
    from: me._id,
    type: "follow-accepted",
    message: "accepted your follow request"
  });

  res.redirect(req.get("Referrer"));
};

// reject follow request
exports.rejectRequest = async (req, res) => {

  const me = await userModel.findById(req.user.userid);

  me.followRequests.pull(req.params.id);
  await me.save();

   // 🧹 remove follow-request notification
  await Notification.deleteMany({
    user: me._id,
    from: req.params.id,
    type: "follow-request"
  });
  
  res.redirect(req.get("Referrer"));
};


// Ajax in follow and unfollow
exports.toggleFollowAjax = async (req, res) => {

  const targetUser = await userModel.findById(req.params.id);
  const currentUser = await userModel.findById(req.user.userid);

  if (!targetUser || !currentUser) {
    return res.json({ success: false });
  }

  // ---------------- UNFOLLOW ----------------
  if (targetUser.followers.includes(currentUser._id)) {

    targetUser.followers.pull(currentUser._id);
    currentUser.following.pull(targetUser._id);

    await targetUser.save();
    await currentUser.save();

    return res.json({
      success: true,
      status: "unfollowed"
    });
  }

  // ---------------- PRIVATE ACCOUNT ----------------
  if (targetUser.isPrivate) {

    // already requested
    if (targetUser.followRequests.includes(currentUser._id)) {
      return res.json({
        success: true,
        status: "requested"
      });
    }

    // add request
    targetUser.followRequests.push(currentUser._id);
    await targetUser.save();

    // 🔔 notification for follow request
    await Notification.create({
      user: targetUser._id,
      from: currentUser._id,
      type: "follow-request",
      message: "sent you a follow request"
    });

    return res.json({
      success: true,
      status: "requested"
    });
  }

  // ---------------- PUBLIC ACCOUNT ----------------
  targetUser.followers.push(currentUser._id);
  currentUser.following.push(targetUser._id);

  await targetUser.save();
  await currentUser.save();

  // 🔔 notification for follow
  await Notification.create({
    user: targetUser._id,
    from: currentUser._id,
    type: "follow",
    message: "started following you"
  });

  return res.json({
    success: true,
    status: "followed"
  });
};

const userModel = require("../models/user");

exports.getUserProfile = async (req, res) => {

  const profileUser = await userModel
    .findById(req.params.id)
    .populate({
      path: "posts",
      populate: [
        { path: "user" },
        { path: "comments.user" }
      ]
    });

  if (!profileUser) {
    return res.redirect("/feed");
  }

  const me = await userModel.findById(req.user.userid);

  const isOwner = profileUser._id.toString() === me._id.toString();
  const isFollower = profileUser.followers.includes(me._id);

  // 🔒 PRIVATE ACCOUNT RULE
  if (profileUser.isPrivate && !isOwner && !isFollower) {

    // show locked profile page
    return res.render("private-profile", {
      profileUser,
      currentUser: me
    });
  }

  // normal profile
  res.render("userprofile", {
    profileUser,
    currentUser: me
  });
};


// ------------------ Search users ------------------
exports.searchUsers = async (req, res) => {
  try {
    const query = req.query.q;

    if (!query) return res.json([]);

    const users = await userModel.find({
      username: { $regex: "^" + query, $options: "i" }
    }).select("username profilepic");

    res.json(users);
  } catch (err) {
    console.error(err);
    res.json([]);
  }
};

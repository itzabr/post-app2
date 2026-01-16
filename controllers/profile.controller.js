const userModel = require("../models/user");

exports.profile = async (req, res) => {
  const user = await userModel
    .findOne({ email: req.user.email })
    .populate({
      path: "posts",
      populate: {
        path: "comments.user",
      }
    }).populate("followRequests", "username profilepic");

  res.render("profile", { user });
};

exports.uploadPage = (req, res) => {
  res.render("profileupload");
};

exports.uploadPic = async (req, res) => {
  const user = await userModel.findOne({ email: req.user.email });
  user.profilepic = req.file.path;
  await user.save();
  res.redirect("/profile");
};

exports.togglePrivacy = async (req, res) => {
  const user = await userModel.findById(req.user.userid);
  user.isPrivate = !user.isPrivate;
  await user.save();
  res.redirect("/profile");
};


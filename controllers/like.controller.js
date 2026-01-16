const postModel = require("../models/post");
const Notification = require("../models/notification");

exports.likeProfile = async (req, res) => {
  const post = await postModel.findById(req.params.id).populate("user");

  if (!post.likes.includes(req.user.userid)) {
    post.likes.push(req.user.userid);

    if (post.user.toString() !== req.user.userid) {
      await Notification.create({
        user: post.user,
        from: req.user.userid,
        type: "like",
        post: post._id,
        message: "liked your post"
      });
    }
  } else {
    post.likes.pull(req.user.userid);
  }

  await post.save();
  res.redirect("/profile");
};

exports.likeFeed = async (req, res) => {
  const post = await postModel.findById(req.params.id);

  const already = post.likes.includes(req.user.userid);

  if (!already) {
    post.likes.push(req.user.userid);

    if (post.user.toString() !== req.user.userid) {
      await Notification.create({
        user: post.user,
        from: req.user.userid,
        type: "like",
        post: post._id,
        message: "liked your post"
      });
    }
  } else {
    post.likes.pull(req.user.userid);
  }

  await post.save();
  res.redirect(req.get("Referrer") || "/feed");
};

exports.showLikes = async (req, res) => {
  const post = await postModel
    .findById(req.params.id)
    .populate("likes", "username profilepic");

  res.json(post ? post.likes : []);
};


// Toglle Like function Ajax Based 
exports.toggleLikeAjax = async (req, res) => {

  const post = await postModel.findById(req.params.id);
  const userId = req.user.userid;

  if (!post) {
    return res.json({ success: false });
  }

  const alreadyLiked = post.likes.includes(userId);

  // unlike
  if (alreadyLiked) {
    post.likes.pull(userId);
    await post.save();

    return res.json({
      success: true,
      status: "unliked",
      likesCount: post.likes.length
    });
  }

  // like
  post.likes.push(userId);
  await post.save();

  return res.json({
    success: true,
    status: "liked",
    likesCount: post.likes.length
  });
};


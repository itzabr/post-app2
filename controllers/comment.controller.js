const postModel = require("../models/post");
const Notification = require("../models/notification");

exports.addComment = async (req, res) => {
  const post = await postModel.findById(req.params.id).populate("user");
  if (!post) return res.send("Post not found");

  post.comments.push({
    user: req.user.userid,
    text: req.body.text
  });

  await post.save();

  if (post.user._id.toString() !== req.user.userid) {
    await Notification.create({
      user: post.user._id,
      from: req.user.userid,
      type: "comment",
      post: post._id,
      message: "commented on your post"
    });
  }

  res.redirect(req.get("Referrer") || "/feed");
};

// Ajax Comment 
exports.addCommentAjax = async (req, res) => {

  const post = await postModel
    .findById(req.params.id)
    .populate("user");

  if (!post) {
    return res.json({ success: false });
  }

  // 1️⃣ push new comment
  post.comments.push({
    user: req.user.userid,
    text: req.body.text
  });

  await post.save();

  // 2️⃣ notify post owner
  if (post.user._id.toString() !== req.user.userid) {
    await Notification.create({
      user: post.user._id,
      from: req.user.userid,
      type: "comment",
      post: post._id,
      message: "commented on your post"
    });
  }

  // 3️⃣ populate ALL comment users properly
  await post.populate("comments.user");

  // 4️⃣ get the last comment (now populated)
  const newComment = post.comments[post.comments.length - 1];

  return res.json({
    success: true,
    comment: {
      username: newComment.user.username,
      text: newComment.text
    }
  });
};

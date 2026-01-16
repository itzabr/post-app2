const Post = require("../models/post");
const Notification = require("../models/notification");
const mongoose=require("mongoose")
// ---------------- DELETE ANY POST ----------------
exports.deleteAnyPost = async (req, res) => {
  const postId = req.params.id;
  const admin = req.user; // admin/moderator

  // ✅ safety check
  if (!mongoose.Types.ObjectId.isValid(postId)) {
    console.log("Invalid post id:", postId);
    return res.redirect("back");
  }

  const post = await Post.findById(postId).populate("user");
  if (!post) return res.redirect("back");

  // delete post
  await Post.findByIdAndDelete(postId);

  // notify post owner
  await Notification.create({
    user: post.user._id,          // who receives
    from: admin.userid,          // admin/moderator
    type: "moderation",
    message: `Your post was deleted by ${admin.role} (${admin.email})`
  });

  res.redirect(req.get("Referrer"));
};

// ---------------- DELETE ANY COMMENT ----------------
exports.deleteAnyComment = async (req, res) => {
  const { postId, commentId } = req.params;
  const admin = req.user;

  const post = await Post.findById(postId).populate("comments.user");
  if (!post) return res.redirect("back");

  const comment = post.comments.id(commentId);
  if (!comment) return res.redirect("back");

  const commentOwner = comment.user;

  // remove comment
  post.comments.pull(commentId);
  await post.save();

  // notify comment owner
  await Notification.create({
    user: commentOwner,
    from: admin.userid,
    type: "moderation",
    message: `Your comment was deleted by ${admin.role} (${admin.email})`
  });

  res.redirect(req.get("Referrer"));
};

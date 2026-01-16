const postModel = require("../models/post");
const userModel = require("../models/user");

exports.createPost = async (req, res) => {
  const user = await userModel.findOne({ email: req.user.email });

  const post = await postModel.create({
    user: user._id,
    content: req.body.content
  });

  user.posts.push(post._id);
  await user.save();

  res.redirect(req.get("Referrer") || "/feed");
};

exports.editPage = async (req, res) => {
  const post = await postModel.findById(req.params.id);
  if (post.user.toString() !== req.user.userid)
    return res.send("Not authorized");

  res.render("edit", { post });
};

exports.updatePost = async (req, res) => {
  const post = await postModel.findById(req.params.id);
  if (post.user.toString() !== req.user.userid)
    return res.send("Not authorized");

  post.content = req.body.content;
  await post.save();
  res.redirect("/profile");
};

exports.deletePost = async (req, res) => {
  const post = await postModel.findById(req.params.id);
  if (!post) return res.redirect("/profile");

  if (post.user.toString() !== req.user.userid)
    return res.redirect("/profile");

  await postModel.findByIdAndDelete(req.params.id);
  await userModel.findByIdAndUpdate(post.user, {
    $pull: { posts: req.params.id }
  });

  res.redirect("/profile");
};

exports.singlePost = async (req, res) => {
  const post = await postModel
    .findById(req.params.id)
    .populate("user")
    .populate("comments.user");

  if (!post) return res.send("Post not found");

  res.render("singlePost", { post, currentUser: req.user });
};


// moderator / admin delete any post
exports.deleteAnyPost = async (req, res) => {
  await postModel.findByIdAndDelete(req.params.id);
  res.redirect("/feed");
};
const userModel = require("../models/user");
const Notification = require("../models/notification");

// show all users
exports.getAllUsers = async (req, res) => {
  const users = await userModel.find().select("username email role");
  res.render("admin-users", { users });// Render the admin-users page
};

// change role + Notfy the user by notification 
exports.changeUserRole = async (req, res) => {
  const { role } = req.body;
  const userId = req.params.id;
  // 1. update role
  const updatedUser = await userModel.findByIdAndUpdate(
    userId,
    { role },
    { new: true }
  );
  
  // 2. create notification for that user
  await Notification.create({
    user: updatedUser._id,        // who receives
    from: req.user.userid,       // admin
    type: "role-change",
    message: `Admin changed your role to ${role}`
  });

  res.redirect("/admin/users");
};

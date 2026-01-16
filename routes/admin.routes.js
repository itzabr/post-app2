const router = require("express").Router();
const isLoggedIn = require("../middlewares/isLoggedIn");
const authorizeRole = require("../middlewares/authorizeRole");
const adminCtrl = require("../controllers/admin.controller");

// only ADMIN can access
router.get(
  "/admin/users",
  isLoggedIn,
  authorizeRole("admin"),
  adminCtrl.getAllUsers // See all users 
);

// only ADMIN can change roles
router.post(
  "/admin/user/:id/role",
  isLoggedIn,
  authorizeRole("admin"),
  adminCtrl.changeUserRole
);

module.exports = router;

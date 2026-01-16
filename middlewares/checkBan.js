const userModel = require("../models/user");

module.exports = async function checkBan(req, res, next) {
  const userId = req.user.userid;

  const user = await userModel.findById(userId);

  if (!user) return res.redirect("/login");

  // if not banned → allow
  if (!user.isBanned) return next();

  // if ban expired → auto unban
  if (user.banUntil && new Date() > user.banUntil) {
    user.isBanned = false;
    user.banUntil = null;
    user.banReason = "";
    await user.save();
    return next();
  }
   // 🔴 still banned → alert + stay on same page
  const backUrl = req.get("Referrer") || "/";
  // still banned
   return res.send(`
    <script>
      alert("You are temporarily banned. Reason: ${user.banReason}");
      window.location.href = "${backUrl}";
    </script>
  `);

};

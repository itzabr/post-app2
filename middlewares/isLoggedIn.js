const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  if (!req.cookies.tokenwa) {
    return res.redirect("/login");
  }

  try {
    const data = jwt.verify(req.cookies.tokenwa, process.env.JWT_SECRET);
    req.user = data;
    next();
  } catch {
    return res.redirect("/login");
  }
};

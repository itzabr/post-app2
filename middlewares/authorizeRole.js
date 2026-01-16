module.exports = function authorizeRole(...allowedRoles) {
    // This ... makes allowedRoles as an array , the all input parameters are stored in this
  return (req, res, next) => {

    if (!req.user) {
      return res.status(401).send("Not authenticated");
    }

    if (!allowedRoles.includes(req.user.role)) {
        // this checks is the current user role is allowed to access this 
      return res.status(403).send("Access denied");
    }

    next();
  };
};

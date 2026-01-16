module.exports = function setTokenCookie(res, token) {
  const isProd = process.env.NODE_ENV === "production";

  res.cookie("tokenwa", token, {
    httpOnly: true,                 // JS cannot access cookie
    secure: isProd,                // only over HTTPS in prod
    sameSite: isProd ? "none" : "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
  });
};

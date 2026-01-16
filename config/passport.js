const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const userModel = require("../models/user");

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL:
  process.env.NODE_ENV === "production"
    ? "https://postapp-nakf.onrender.com/auth/google/callback"
    : "http://localhost:3000/auth/google/callback"

}, async (accessToken, refreshToken, profile, done) => {

  try {
    // 1. Check if user already exists
    let user = await userModel.findOne({ email: profile.emails[0].value });

    // 2. If not, create new user
    if (!user) {
      user = await userModel.create({
        name: profile.displayName,
        email: profile.emails[0].value,
        username: profile.emails[0].value.split("@")[0],
        password: "",           // no password for google users
        profilepic: profile.photos?.[0]?.value || DEFAULT_PROFILE_PIC,
        isVerified: true        // google already verified email
      });
    }

    // 3. Send user to passport
    done(null, user);

  } catch (err) {
    done(err, null);
  }
}));

// store user id in session
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// get user back from session
passport.deserializeUser(async (id, done) => {
  const user = await userModel.findById(id);
  done(null, user);
});

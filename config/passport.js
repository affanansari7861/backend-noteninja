const passport = require("passport");
require("dotenv").config();
const bcrypt = require("bcryptjs");

const User = require("../models/user");
const { NotFoundError, CustomApiError } = require("../errors/custom-error");

const GoogleStrategy = require("passport-google-oauth20").Strategy;
const LocalStrategy = require("passport-local").Strategy;
const GTIHUBSTRATEGY = require("passport-github2").Strategy;

passport.serializeUser((user, done) => {
  done(null, user._id);
});
passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id);
  done(null, user);
});
//LOCAL STRATEGY
passport.use(
  new LocalStrategy(
    { passReqToCallback: true },
    async (req, usname, passs, done) => {
      if (req.type === "login") return login(req, done, usname);
      const salt = await bcrypt.genSalt(10);
      const password = await bcrypt.hash(req.body.password, salt);
      const user = await User.create({ ...req.body, password });
      if (!user)
        return done(new CustomApiError("something went wrong", 401), false);
      done(null, user);
    }
  )
);

const login = async (req, done, username) => {
  const USER = req.body;
  const user = await User.findOne({ username: USER.username });
  if (!user)
    return done(new NotFoundError(`no user with username ${username}`), false);
  done(null, user);
};

// GOOGLE STRATEGY
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/redirect",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        console.log("loging with google");
        const user = await User.find({ googleId: profile.id });
        if (user[0]) return done(null, user[0]);

        const newUser = await User.create({
          googleId: profile.id,
          fullname: profile.displayName,
          username: `${profile.name.givenName}${profile.name.familyName}`,
          email: profile._json.email,
          uploads: [],
        });

        if (!newUser) return done(null, false);
        done(null, newUser);
      } catch (error) {
        console.log(error);
      }
    }
  )
);

passport.use(
  new GTIHUBSTRATEGY(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: "/auth/github/redirect",
    },
    async (accessToken, refreshToken, profile, done) => {
      const user = await User.find({ email: profile._json.email });
      if (user[0]) return done(null, user[0]);

      const newUser = await User.create({
        githubId: profile.id,
        fullname: profile.username,
        username: profile.username,
        uploads: [],
      });
      done(null, newUser);
    }
  )
);
// callbackURL: "/auth/google/redirect",

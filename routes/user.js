const express = require("express");
const { login, getUser, register } = require("../controllers/user");
const authUser = require("../middlewares/auth");
const router = express.Router();
const passport = require("passport");

router
  .route("/login")
  .post(
    (req, res, next) => {
      req.type = "login";
      next();
    },
    passport.authenticate("local"),
    login
  )
  .get(authUser, getUser)
  .delete((req, res) => {
    req.logOut({ keepSessionInfo: false }, (done) => null);
    res.status(201).json({ message: "logged out succesfully" });
  });
router.route("/register").post(passport.authenticate("local"), register);
router.route("/get").get(authUser, (req, res) => {
  res.status(200).json(req.user);
});

//GOOGLE ROUTES
router.route("/google").get(
  passport.authenticate("google", {
    scope: ["profile", "email"],
    failureRedirect: "https://note-ninja.netlify.app/user",
  })
);
router
  .route("/github")
  .get(passport.authenticate("github", { scope: ["user:email"] }));

router.route("/google/redirect").get(
  (req, res, next) => {
    log("reached callback");
    next();
  },
  passport.authenticate("google", {
    successRedirect: "http://localhost:5173",
  })
);
router.route("/github/redirect").get(
  passport.authenticate("github", {
    successRedirect: "http://localhost:5173",
  })
);
module.exports = router;

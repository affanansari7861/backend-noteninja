const express = require("express");
const { login, getUser, register } = require("../controllers/user");
const authUser = require("../middlewares/auth");
const router = express.Router();

router.route("/login").post(login).get(authUser, getUser);
router.route("/register").post(register);
module.exports = router;

const authUser = require("../middlewares/auth");
const express = require("express");

const router = express.Router();
const { getNotes, postComment } = require("../controllers/notes");
router.route("/").get(getNotes);
router.route("/comment").post(authUser, postComment);

module.exports = router;

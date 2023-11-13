const express = require("express");
const authUser = require("../middlewares/auth");

const router = express.Router();
const { getUploads, uploadNote } = require("../controllers/uploads");
router.route("/").get(authUser, getUploads).post(authUser, uploadNote);

module.exports = router;

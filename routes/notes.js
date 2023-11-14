const express = require("express");

const router = express.Router();
const { getNotes } = require("../controllers/notes");
router.route("/").get(getNotes);

module.exports = router;

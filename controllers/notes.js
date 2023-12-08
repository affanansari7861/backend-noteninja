const Upload = require("../models/upload");

const getNotes = async (req, res) => {
  const uploads = await Upload.find({});
  res.status(200).json(uploads);
};
const postComment = async (req, res) => {
  console.log(req.body);
  res.json(req.body);
};
module.exports = { getNotes, postComment };

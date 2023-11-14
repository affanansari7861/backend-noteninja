const Upload = require("../models/upload");

const getNotes = async (req, res) => {
  const uploads = await Upload.find({});
  res.status(200).json(uploads);
};
module.exports = { getNotes };

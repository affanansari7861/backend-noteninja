const Upload = require("../models/upload");
const User = require("../models/user");
const { uploadToDrive } = require("../utility/upload");

const getUploads = async (req, res) => {
  console.log("getting uploads...");
  const user = await User.findById(req.user._id);
  const uploads = await Upload.find({ uploader: req.user.username });
  res.status(200).json(uploads);
};

const uploadNote = async (req, res) => {
  try {
    // authorize().then(listFiles).catch(console.error);
    console.log("uplaoding...");
    const filedata = await uploadToDrive(req.files.file);
    const uploadedData = await Upload.create({
      ...req.body,
      ...filedata,
      uploader: req.user.username,
    });
    const user = await User.findById(req.user._id);
    await user.uploads.push(filedata.fileId);
    await user.save();
    console.log(user);

    res.status(201).json(uploadedData);
  } catch (error) {
    console.log(error);
  }
};

module.exports = { getUploads, uploadNote };

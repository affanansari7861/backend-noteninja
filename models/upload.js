const mongoose = require("mongoose");

const uploadSchema = new mongoose.Schema({
  fileId: {
    type: String,
    required: [true, "please provide file url"],
  },
  webViewLink: {
    type: String,
    required: [true, "please provide file url"],
  },
  webContentLink: {
    type: String,
    required: [true, "please provide file url"],
  },
  uploader: {
    type: String,
    required: [true, "please provide uploader username"],
  },
  subject: {
    type: String,
    required: [true, "please provide subject"],
  },
  unit: {
    type: String,
    required: [true, "please provide unit number "],
  },
  year: {
    type: String,
    required: [true, "please provide year"],
  },
  course: {
    type: String,
    required: [true, "please provide your course"],
  },
  comments: {
    // {comment:St}
  },
});

module.exports = mongoose.model("uploads", uploadSchema);

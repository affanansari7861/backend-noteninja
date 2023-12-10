const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  fullname: {
    type: String,
    required: [true, "please provide your full name"],
  },
  username: {
    type: String,
    required: [true, "please provide username"],
    unique: [true, "username is already taken"],
  },
  googleId: String,
  githubId: String,
  password: String,
  email: {
    type: String,
    unique: [true, "email is already registered with another acccount"],
  },
  uploads: [String],
});

module.exports = mongoose.model("newUsers", userSchema);

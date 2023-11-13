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
  password: String,
  email: {
    type: String,
    required: [true, "please enter your email"],
    unique: [true, "email is already registered with another acccount"],
  },
  uploads: [String],
});

module.exports = mongoose.model("user", userSchema);

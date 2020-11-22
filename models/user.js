const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  first_name: String,
  last_name: String,
  age: Number,
  username: {
    type: String,
    unique: true,
    required: true
  }
});

const User = mongoose.model("User", userSchema);

module.exports = User;

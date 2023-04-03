const mongoose = require("mongoose");

const userScheama = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    minLength: 4,
  },
  lastName: String,
  email: {
    type: String,
    match: /[^\s@]+@[^\s@]+\.[^\s@]+/,
    unique: true,
  },
  age: Number,
});

const userModel = mongoose.model("user", userScheama);

module.exports = userModel;

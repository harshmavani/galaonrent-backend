const mongoose = require("mongoose");
const Properties = require("./Properties");

const UserSchema = mongoose.Schema({
  person_name: {
    type: String,
    required: true,
  },
  Property_belongsto: {
    type: String,
    required: true,
  },
  Phone_number: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  City: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  is_admin: {
    type: Boolean,
    required: true,
    default: false
  },
  user_type: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now
  },
});

module.exports = mongoose.model("Users", UserSchema);

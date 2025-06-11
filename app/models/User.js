const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  Phone_number: {
    type: String,
    required: true,
  },
  resident_address: {
    type: String,
    required: true,
  },
  Pincode: {
    type: String,
    required: true,
  },
  State: {
    type: String,
    required: true,
  },
  City: {
    type: String,
    required: true,
  },
  Country: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  user_type: {
    type: String,
    required: true,
    default: "user"
  },
  // contact_information: {
  //   type: Array,
  // },
  // shipping_address: {
  //   type: Array,
  // }
});

module.exports = mongoose.model("Users", UserSchema);

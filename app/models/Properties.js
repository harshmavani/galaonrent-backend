const mongoose = require("mongoose");

const ProductSchema = mongoose.Schema({
  name: {
    type: String,
    // required: true,
  },
  image: {
    type: Array,
    // required: true,
  },
  category: {
    type: String,
    required: true,
    default:"Customize",
    unique: false
  },
  rating: {
    type: String,
    // required: true,
  },
  affilateLink: {
    type: String,
  },
  availableCustomise: {
    type: Boolean,
    required: true,
    default:false
  },
  review: {
    type: String,
    // required: true,
  },
  // sub_category: {
  //   type: String,
  //   required: true,
  // },
  // tags: {
  //   type: String,
  // },
  // brand: {
  //   type: String,
  // },
  // gst: {
  //   type: String,
  // },
  // slug: {
  //   type: String,
  // },
  description: {
    type: String,
    // required: true,
  },
  sort_description: {
    type: String,
    // required: true,
  },
  discount_key: {
    type: String,
  },
  new_price: {
    type: String,
    // required: true,
  },
  old_price: {
    type: String,
    // required: true,
  },
  // quantity: {
  //   type: Number,
  //   required: true,
  // },
  is_publish: {
    type: Boolean,
    default:true,
    required: true,
  },
  sku_id: {
    type: String,
    required: true,
  },
  // hsn_code: {
  //   type: String,
  //   required: true,
  // },
  is_new: {
    type: String,
  },
  discount: {
    type: Number,
    // required: true,
  },
  measurements: {
    type: Array,
    // required: true,
  },
  additional_info: {
    type: Array,
    // required: true,
  },
  items: {
    type: Array,
    // required: true,
  },
  expires_date: {
    type: Date,
    // default: Date.now
    // required: true,
  },
  date: {
    type: Date,
    default: Date.now
    // required: true,
  },
});

module.exports = mongoose.model("Products", ProductSchema);

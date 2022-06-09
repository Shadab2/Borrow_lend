const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    upi: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },
    borrowers: {
      type: Array,
      default: [],
    },
    lenders: {
      type: Array,
      default: [],
    },
    mobileNo: {
      type: Number,
      required: true,
      unique: true,
      match: /^(\()?\d{3}(\))?(-|\s)?\d{3}(-|\s)\d{4}$/,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("UserBL", UserSchema);

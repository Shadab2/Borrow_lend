const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema(
  {
    borrowedFrom: {
      type: String,
      required: true,
    },
    borrowedTo: {
      type: String,
      required: true,
    },
    reason: {
      type: String,
      required: true,
    },
    duration: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    completed: {
      type: Boolean,
      default: false,
    },
    upi: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Transaction", transactionSchema);

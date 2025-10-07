const mongoose = require("mongoose");

const PaymentSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "MainUser",
      required: true,
    },
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String },
    amount: { type: Number, required: true, min: 0 },
    currency: { type: String, default: "INR" },
    status: {
      type: String,
      enum: ["pending", "success", "failed"],
      default: "pending",
    },
    transactionId: { type: String, unique: true, sparse: true },
    paymentType: {
      type: String,
      enum: ["api_access", "data_backup", "full_access"],
      default: "api_access",
    },
    planDetails: {
      type: String,
      enum: ["data_backup_lifetime", "api_reset_temporary", "full_access_temporary"],
      default: "api_reset_temporary",
    },
    meta: { type: Object },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Payment", PaymentSchema);

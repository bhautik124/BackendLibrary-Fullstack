const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    apis: [
      {
        feature: String,
        url: String,
        apiKey: String,
        token: String,
        isActive: {
          type: Boolean,
          default: true,
        },
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    apiUsageCount: {
      type: Number,
      default: 0,
    },
    freeApiLimit: {
      type: Number,
      default: 10,
    },
    isPayment: {
      type: Boolean,
      default: false,
    },
    dataBackupAccess: {
      type: Boolean,
      default: false,
    },
    dataBackupLifetime: {
      type: Boolean,
      default: false,
    },
    paymentHistory: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Payment",
      },
    ],
    lastPaymentDate: {
      type: Date,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("MainUser", userSchema);

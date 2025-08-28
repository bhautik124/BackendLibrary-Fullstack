const mongoose = require("mongoose");

const emailOtpAuthSchema = mongoose.Schema(
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
    otp: {
      code: String,
      expiresAt: Date,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("emailOtpAuth", emailOtpAuthSchema);

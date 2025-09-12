// const mongoose = require("mongoose");

// const emailOtpAuthSchema = mongoose.Schema(
//   {
//     userName: {
//       type: String,
//       required: true,
//     },
//     email: {
//       type: String,
//       required: true,
//     },
//     password: {
//       type: String,
//       required: true,
//     },
//     otp: {
//       code: String,
//       expiresAt: Date,
//     },
//   },
//   { timestamps: true }
// );

// module.exports = mongoose.model("emailOtpAuth", emailOtpAuthSchema);

const mongoose = require("mongoose");

const emailOtpAuthSchema = new mongoose.Schema(
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

function getEmailOtpAuthModel(userIdentifier) {
  // userIdentifier can be email or userId
  const safeName = userIdentifier;
  const modelName = `emailOtpAuthCreatedBy_${safeName}`;
  return (
    mongoose.models[modelName] || mongoose.model(modelName, emailOtpAuthSchema)
  );
}

module.exports = getEmailOtpAuthModel;

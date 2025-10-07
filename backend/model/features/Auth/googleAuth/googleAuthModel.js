// const mongoose = require("mongoose");

// const googleAuthSchema = new mongoose.Schema(
//   {
//     userName: {
//       type: String,
//     },
//     email: {
//       type: String,
//       required: true,
//       unique: true,
//     },
//     isGoogleUser: {
//       type: Boolean,
//       default: true,
//     },
//   },
//   { timestamps: true }
// );

// module.exports = mongoose.model("GoogleAuth", googleAuthSchema);

const mongoose = require("mongoose");

const googleAuthSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    isGoogleUser: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

function getGoogleAuthModel(userIdentifier) {
  // userIdentifier can be email or userId
  const safeName = userIdentifier;
  const modelName = `googleAuthCreatedBy_${safeName}`;
  return (
    mongoose.models[modelName] || mongoose.model(modelName, googleAuthSchema)
  );
}

module.exports = getGoogleAuthModel;

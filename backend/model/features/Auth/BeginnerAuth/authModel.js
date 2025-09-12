// const mongoose = require("mongoose");

// const authSchema = mongoose.Schema(
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
//   },
//   { timeStamps: true }
// );

// module.exports = mongoose.model("BeginnerAuth", authSchema);

const mongoose = require("mongoose");

const beginnerAuthSchema = new mongoose.Schema(
  {
    userName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

function getBeginnerAuthModel(userIdentifier) {
  // userIdentifier can be email or userId
  const safeName = userIdentifier;
  const modelName = `beginnerAuthCreatedBy_${safeName}`;
  return (
    mongoose.models[modelName] || mongoose.model(modelName, beginnerAuthSchema)
  );
}

module.exports = getBeginnerAuthModel;

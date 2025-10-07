// const mongoose = require("mongoose");

// const roleBasedAuthSchema = mongoose.Schema(
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
//     role: {
//       type: String,
//       enum: ["admin", "user"],
//       required: true,
//     },
//   },
//   { timeStamps: true }
// );

// module.exports = mongoose.model("RoleBasedAuth", roleBasedAuthSchema);

const mongoose = require("mongoose");

const roleBasedAuthModel = new mongoose.Schema(
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
    role: {
      type: String,
      enum: ["admin", "user"],
      required: true,
    },
  },
  { timeStamps: true }
);

function getRoleBasedAuthModel(userIdentifier) {
  // userIdentifier can be email or userId
  const safeName = userIdentifier;
  const modelName = `rolebaseAuthCreatedBy_${safeName}`;
  return (
    mongoose.models[modelName] || mongoose.model(modelName, roleBasedAuthModel)
  );
}

module.exports = getRoleBasedAuthModel;

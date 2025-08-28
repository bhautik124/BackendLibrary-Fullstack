const mongoose = require("mongoose");

const roleBasedAuthSchema = mongoose.Schema(
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

module.exports = mongoose.model("RoleBasedAuth", roleBasedAuthSchema);

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
      },
    ],
  },
  { timeStamps: true }
);

module.exports = mongoose.model("MainUser", userSchema);

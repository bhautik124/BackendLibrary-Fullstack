const mongoose = require("mongoose");

const modelStorageSchema = new mongoose.Schema({
  modelName: {
    type: String,
    required: true,
    unique: true,
  },
  fields: [
    {
      name: { type: String, required: true },
      type: { type: String, required: true },
    },
  ],
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

module.exports = mongoose.model("ModelStorage", modelStorageSchema);

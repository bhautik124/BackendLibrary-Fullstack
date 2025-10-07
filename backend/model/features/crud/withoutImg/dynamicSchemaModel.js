const mongoose = require("mongoose");

// function to create schema dynamically
const createDynamicSchema = (fields) => {
  const schemaDefinition = {};

  const typeMap = {
    String: String,
    Number: Number,
    Boolean: Boolean,
    Date: Date,
  };

  for (const field of fields) {
    const fieldType = typeMap[field.type];
    if (!fieldType) {
      throw new Error(`Invalid field type: ${field.type}`);
    }

    schemaDefinition[field.name] = { type: fieldType };
  }

  return new mongoose.Schema(schemaDefinition, { timestamps: true });
};

// in-memory cache to store dynamic models
const dynamicModels = {};

const getDynamicModel = (collectionName, fields) => {
  if (!dynamicModels[collectionName]) {
    const schema = createDynamicSchema(fields);
    dynamicModels[collectionName] = mongoose.model(collectionName, schema);
  }
  return dynamicModels[collectionName];
};

module.exports = getDynamicModel;

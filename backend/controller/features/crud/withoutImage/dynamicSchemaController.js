const getDynamicModel = require("../../../../model/features/crud/withoutImg/dynamicSchemaModel");
const ModelStorage = require("../../../../model/features/crud/withoutImg/getDynamicCreatedDataModel");
const ModelStorageWithImg = require("../../../../model/features/crud/withImage/getDynamicCreatedDataWithImgModel");
const { nanoid } = require("nanoid");
const mongoose = require("mongoose");

module.exports.createCollectionNameAndFields = async (req, res) => {
  try {
    const userId = req.user._id;
    let { collectionName, fields } = req.body;

    // Parse fields if provided as a string
    if (typeof fields === "string") fields = JSON.parse(fields);

    // Check if collection already exists
    const existingModel1 = await ModelStorage.findOne({
      modelName: collectionName,
    });

    const existingModel2 = await ModelStorageWithImg.findOne({
      modelName: collectionName,
    });

    let withoutImg;
    if (existingModel1) {
      withoutImg = "withoutImg";
    }

    let withImg;
    if (existingModel2) {
      withImg = "with img";
    }

    if (existingModel1 || existingModel2) {
      const createdBySameUserWithOutImg =
        existingModel1 && String(existingModel1.createdBy) === String(userId);

      const createdBySameUserWithImg =
        existingModel2 && String(existingModel2.createdBy) === String(userId);

      if (createdBySameUserWithOutImg) {
        // Same user trying to create model in same category - allow adding new fields
        if (!fields || !Array.isArray(fields) || fields.length === 0) {
          return res.status(200).json({
            message: `Model "${collectionName}" already exists with existing fields.`,
            existingFields: existingModel1.fields,
            modelType: "withoutImg"
          });
        }

        // Filter out fields that already exist
        const existingFieldNames = existingModel1.fields.map(field => field.name.toLowerCase());
        const newFields = fields.filter(field => 
          !existingFieldNames.includes(field.name.toLowerCase())
        );

        if (newFields.length === 0) {
          return res.status(200).json({
            message: `All provided fields already exist in model "${collectionName}".`,
            existingFields: existingModel1.fields,
            modelType: "withoutImg"
          });
        }

        // Add new fields to existing model
        const updatedFields = [...existingModel1.fields, ...newFields];
        await ModelStorage.findByIdAndUpdate(existingModel1._id, {
          fields: updatedFields
        });

        return res.status(200).json({
          message: `Successfully added ${newFields.length} new field(s) to existing model "${collectionName}".`,
          addedFields: newFields,
          allFields: updatedFields,
          modelType: "withoutImg"
        });
      } else if (createdBySameUserWithImg) {
        return res.status(400).json({
          message: `You already created a "${collectionName}" collection with image support. Cannot create without image version. Try using a different name or use the with-image API.`,
          existingModelType: "withImg"
        });
      } else {
        // Suggest alternative names if another user created it
        const suggestion1 = `${collectionName}_${nanoid(6)}`;
        const suggestion2 = `${collectionName}_${nanoid(6)}`;
        return res.status(400).json({
          message: `Collection "${collectionName}" already exists`,
          suggestions: [suggestion1, suggestion2],
        });
      }
    }

    // Create new collection metadata with optional fields
    await ModelStorage.create({
      modelName: collectionName,
      fields:
        fields && Array.isArray(fields) && fields.length > 0 ? fields : [],
      createdBy: userId,
    });

    res.status(201).json({
      message: `Collection "${collectionName}" created successfully`,
      fields:
        fields && Array.isArray(fields) && fields.length > 0 ? fields : [],
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      message: "Error while creating the collection name",
      error: error.message,
    });
  }
};

module.exports.createDocument = async (req, res) => {
  try {
    const { collectionName, data } = req.body;
    const userId = req.user._id;

    // Parse data if provided as a string
    if (typeof data === "string") data = JSON.parse(data);

    // Check if the collection exists
    const existingModel = await ModelStorage.findOne({
      modelName: collectionName,
    });

    // If collection doesn't exist, return error
    if (!existingModel) {
      return res.status(404).json({
        message: `Collection "${collectionName}" does not exist.`,
      });
    }

    // Check if the collection was created by the same user
    const createdBySameUser =
      String(existingModel.createdBy) === String(userId);
    if (!createdBySameUser) {
      return res.status(403).json({
        message: `This model "${collectionName}" is not created by you.`,
      });
    }

    // If no data provided, return with existing fields
    if (
      !data ||
      (Array.isArray(data) && data.length === 0) ||
      (typeof data === "object" &&
        !Array.isArray(data) &&
        Object.keys(data).length === 0)
    ) {
      return res.status(200).json({
        message: `No data provided to add to "${collectionName}".`,
        data: [],
        fields: existingModel.fields,
      });
    }

    // Add new data to the existing model
    const Model = getDynamicModel(collectionName, existingModel.fields);
    const doc = await Model.create(Array.isArray(data) ? data : [data]);
    res.status(201).json({
      message: `Data added successfully to "${collectionName}"`,
      data: doc,
      fields: existingModel.fields,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports.getAllDocuments = async (req, res) => {
  try {
    const { collectionName } = req.body;
    const userId = req.user._id;

    // Step 1: Check if model belongs to current user
    const modelExists = await ModelStorage.findOne({
      modelName: collectionName,
      createdBy: userId.toString(),
    });

    if (!modelExists) {
      return res.status(403).json({
        error: `Model '${collectionName}' does not belong to you or does not exist.`,
      });
    }

    // Step 2: Fetch documents
    const Model = getDynamicModel(collectionName, modelExists.fields);
    const docs = await Model.find();

    res.status(200).json(docs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports.updateDocument = async (req, res) => {
  try {
    const { collectionName, id, data } = req.body;
    const userId = req.user._id;

    // Step 1: Check if model belongs to current user
    const modelExists = await ModelStorage.findOne({
      modelName: collectionName,
      createdBy: userId,
    });

    if (!modelExists) {
      return res.status(403).json({
        error: `Model '${collectionName}' does not belong to you or does not exist.`,
      });
    }

    // Step 2: Get model and try update
    const Model = getDynamicModel(collectionName, modelExists.fields);
    const updated = await Model.findByIdAndUpdate(id, data, { new: true });

    if (!updated) {
      return res.status(404).json({
        error: `Document with id '${id}' not found in model '${collectionName}'.`,
      });
    }

    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports.deleteSpecificDocumentFromModel = async (req, res) => {
  try {
    const { collectionName, id } = req.body;
    const userId = req.user._id;

    // Step 1: Ownership check
    const modelExists = await ModelStorage.findOne({
      modelName: collectionName,
      createdBy: userId,
    });

    if (!modelExists) {
      return res.status(403).json({
        error: `Model '${collectionName}' does not belong to you or does not exist.`,
      });
    }

    // Step 2: Try deleting the document
    const Model = getDynamicModel(collectionName, modelExists.fields);
    const deleted = await Model.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({
        error: `Document with id '${id}' not found in model '${collectionName}'.`,
      });
    }

    res.status(200).json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports.deleteWholeModel = async (req, res) => {
  try {
    const userId = req.user._id;
    const { collectionName } = req.body;

    // Step 1: Ownership check
    const findUserCreatedModel = await ModelStorage.findOne({
      modelName: collectionName,
      createdBy: userId,
    });

    if (!findUserCreatedModel) {
      return res.status(403).json({
        error: `Model '${collectionName}' does not belong to you or does not exist.`,
      });
    }

    // Step 2: Delete all documents from the model's collection
    const Model = getDynamicModel(collectionName, findUserCreatedModel.fields);
    await Model.deleteMany();

    // Step 3: Remove model info from ModelStorage
    await ModelStorage.deleteOne({
      modelName: collectionName,
      createdBy: userId,
    });

    // Step 4: Drop actual MongoDB collection
    const collectionExists = await mongoose.connection.db
      .listCollections({ name: collectionName })
      .hasNext();

    if (collectionExists) {
      await mongoose.connection.db.dropCollection(collectionName);
    }

    // Step 5: Remove from in-memory cache (optional but clean)
    delete require.cache[
      require.resolve(
        "../../../../model/features/crud/withoutImg/dynamicSchemaModel"
      )
    ];

    res.status(200).json({
      message: `Model '${collectionName}' and all its data deleted successfully.`,
    });
  } catch (err) {
    console.error("Delete model error:", err.message);
    res.status(500).json({ error: err.message });
  }
};

module.exports.getAllModels = async (req, res) => {
  try {
    const userId = req.user._id;

    const models = await ModelStorage.find(
      { createdBy: userId },
      { _id: 0, modelName: 1, fields: 1 }
    );

    // const modelName = models.map((model) => model.modelName);

    res.status(200).json({ models });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to fetch models", error: err.message });
  }
};

module.exports.getAllModelsWithData = async (req, res) => {
  try {
    const userId = req.user._id;

    // Step 1: Get all models for the user
    const models = await ModelStorage.find({ createdBy: userId });

    const result = [];

    // Step 2: Loop through each model and fetch its documents
    for (const model of models) {
      const Model = getDynamicModel(model.modelName, model.fields);
      const data = await Model.find();

      result.push({
        modelName: model.modelName,
        fields: model.fields,
        data: data,
      });
    }

    res.status(200).json({ models: result });
  } catch (err) {
    console.error("Error fetching all models with data:", err.message);
    res.status(500).json({ error: err.message });
  }
};

// New function to add fields to existing model
module.exports.addFieldsToExistingModel = async (req, res) => {
  try {
    const userId = req.user._id;
    let { collectionName, fields } = req.body;

    // Parse fields if provided as a string
    if (typeof fields === "string") fields = JSON.parse(fields);

    if (!collectionName) {
      return res.status(400).json({
        message: "Collection name is required"
      });
    }

    if (!fields || !Array.isArray(fields) || fields.length === 0) {
      return res.status(400).json({
        message: "Fields array is required and cannot be empty"
      });
    }

    // Check if model exists and belongs to user
    const existingModel = await ModelStorage.findOne({
      modelName: collectionName,
      createdBy: userId
    });

    if (!existingModel) {
      return res.status(404).json({
        message: `Model "${collectionName}" not found or doesn't belong to you`
      });
    }

    // Filter out fields that already exist
    const existingFieldNames = existingModel.fields.map(field => field.name.toLowerCase());
    const newFields = fields.filter(field => 
      !existingFieldNames.includes(field.name.toLowerCase())
    );

    if (newFields.length === 0) {
      return res.status(200).json({
        message: `All provided fields already exist in model "${collectionName}".`,
        existingFields: existingModel.fields
      });
    }

    // Add new fields to existing model
    const updatedFields = [...existingModel.fields, ...newFields];
    await ModelStorage.findByIdAndUpdate(existingModel._id, {
      fields: updatedFields
    });

    res.status(200).json({
      message: `Successfully added ${newFields.length} new field(s) to model "${collectionName}".`,
      addedFields: newFields,
      allFields: updatedFields
    });

  } catch (err) {
    console.error("Error adding fields to existing model:", err.message);
    res.status(500).json({ error: err.message });
  }
};

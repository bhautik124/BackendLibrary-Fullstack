const ModelStorageWithImg = require("../../../../model/features/crud/withImage/getDynamicCreatedDataWithImgModel");
const ModelStorage = require("../../../../model/features/crud/withoutImg/getDynamicCreatedDataModel");
const getDynamicModel = require("../../../../model/features/crud/withImage/dynamicSchemaWithImgModel");
const { uploadBuffer } = require("../../../../helper/cloudinaryHelperForUser");
const { nanoid } = require("nanoid");
const { deleteImg } = require("../../../../helper/cloudinaryHelperForUser");
const mongoose = require("mongoose");

module.exports.createCollectionNameAndFieldsWithImg = async (req, res) => {
  try {
    const userId = req.user._id;
    let { collectionName, fields } = req.body;

    // Parse fields if provided as a string
    if (typeof fields === "string") fields = JSON.parse(fields);

    // Check if collection already exists
    const existingModel1 = await ModelStorageWithImg.findOne({
      modelName: collectionName,
    });

    const existingModel2 = await ModelStorage.findOne({
      modelName: collectionName,
    });

    let withImg;
    if (existingModel1) {
      withImg = "with img";
    }

    let withoutImg;
    if (existingModel2) {
      withoutImg = "withoutImg";
    }

    if (existingModel1 || existingModel2) {
      const createdBySameUserInWithImg =
        existingModel1 && String(existingModel1.createdBy) === String(userId);

      const createdBySameUserInWithoutImg =
        existingModel2 && String(existingModel2.createdBy) === String(userId);

      if (createdBySameUserInWithImg) {
        // Same user trying to create model in same category - allow adding new fields
        if (!fields || !Array.isArray(fields) || fields.length === 0) {
          return res.status(200).json({
            message: `Model "${collectionName}" already exists with existing fields.`,
            existingFields: existingModel1.fields,
            modelType: "withImg"
          });
        }

        // Filter out fields that already exist (excluding imgUrl and publicId which are auto-added)
        const existingFieldNames = existingModel1.fields.map(field => field.name.toLowerCase());
        const newFields = fields.filter(field => 
          !existingFieldNames.includes(field.name.toLowerCase()) &&
          field.name.toLowerCase() !== 'imgurl' &&
          field.name.toLowerCase() !== 'publicid'
        );

        if (newFields.length === 0) {
          return res.status(200).json({
            message: `All provided fields already exist in model "${collectionName}".`,
            existingFields: existingModel1.fields,
            modelType: "withImg"
          });
        }

        // Add new fields to existing model
        const updatedFields = [...existingModel1.fields, ...newFields];
        await ModelStorageWithImg.findByIdAndUpdate(existingModel1._id, {
          fields: updatedFields
        });

        return res.status(200).json({
          message: `Successfully added ${newFields.length} new field(s) to existing model "${collectionName}".`,
          addedFields: newFields,
          allFields: updatedFields,
          modelType: "withImg"
        });
      } else if (createdBySameUserInWithoutImg) {
        return res.status(400).json({
          message: `You already created a "${collectionName}" collection without image support. Cannot create with image version. Try using a different name or use the without-image API.`,
          existingModelType: "withoutImg"
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
    await ModelStorageWithImg.create({
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
    let { collectionName, data } = req.body;
    const userId = req.user._id;

    // Parse data if provided as a string
    if (typeof data === "string") data = JSON.parse(data);

    // Handle multiple images
    const files = req.files || [];

    // Check if the collection exists
    const existingModel = await ModelStorageWithImg.findOne({
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

    // Add data with images to the existing model
    const Model = getDynamicModel(collectionName, existingModel.fields);
    const finalData = [];
    for (let i = 0; i < data.length; i++) {
      let imgUrl = null,
        publicId = null;
      if (files[i]) {
        const upload = await uploadBuffer(files[i].buffer);
        imgUrl = upload.imgUrl;
        publicId = upload.publicId;
      }
      finalData.push({ ...data[i], imgUrl, publicId });
    }

    const doc = await Model.create(finalData);
    res.status(201).json({
      message: `Data added successfully to "${collectionName}"`,
      data: doc,
      fields: existingModel.fields,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports.updateDocumentWithImg = async (req, res) => {
  try {
    let { collectionName, id, data } = req.body;
    const userId = req.user._id;

    if (typeof data === "string") {
      try {
        data = JSON.parse(data);
      } catch {
        return res.status(400).json({ error: "Invalid JSON in 'data'" });
      }
    }
    if (!data || typeof data !== "object") data = {};

    // Model meta from DB
    const modelMeta = await ModelStorageWithImg.findOne({
      modelName: collectionName,
      createdBy: userId,
    });
    if (!modelMeta) return res.status(404).json({ message: "Model not found" });

    const fields = modelMeta.fields;
    const Model = getDynamicModel(collectionName, fields);

    const existingDoc = await Model.findById(id);
    if (!existingDoc)
      return res.status(404).json({ message: "Document not found" });

    // Image update
    if (req.file) {
      const upload = await uploadBuffer(req.file.buffer);
      data.imgUrl = upload.imgUrl;
      data.publicId = upload.publicId;

      if (existingDoc.publicId) {
        await deleteImg(existingDoc.publicId);
      }
    }

    const updatedDoc = await Model.findByIdAndUpdate(id, data, { new: true });

    res.status(200).json({
      message: "Document updated successfully",
      updated: updatedDoc,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports.deleteSpecificDocumentWithImg = async (req, res) => {
  try {
    const { collectionName, id } = req.body;
    const userId = req.user._id;

    const modelMeta = await ModelStorageWithImg.findOne({
      modelName: collectionName,
      createdBy: userId,
    });
    if (!modelMeta) return res.status(404).json({ message: "Model not found" });

    const fields = modelMeta.fields;
    const Model = getDynamicModel(collectionName, fields);

    const existingDoc = await Model.findById(id);
    if (!existingDoc)
      return res.status(404).json({ message: "Document not found" });

    if (existingDoc.publicId) {
      await deleteImg(existingDoc.publicId);
    }

    await Model.findByIdAndDelete(id);

    res
      .status(200)
      .json({ message: "Document and image deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports.deleteWholeModelWithImg = async (req, res) => {
  try {
    const userId = req.user._id;
    const { collectionName } = req.body;

    const modelMeta = await ModelStorageWithImg.findOne({
      modelName: collectionName,
      createdBy: userId,
    });
    if (!modelMeta) {
      return res.status(403).json({
        error: `Model '${collectionName}' does not belong to you or does not exist.`,
      });
    }

    const fields = modelMeta.fields;
    const Model = getDynamicModel(collectionName, fields);

    const allDocs = await Model.find();
    for (let doc of allDocs) {
      if (doc.publicId) {
        await deleteImg(doc.publicId);
      }
    }

    await Model.deleteMany();
    await ModelStorageWithImg.deleteOne({
      modelName: collectionName,
      createdBy: userId,
    });

    const collectionExists = await mongoose.connection.db
      .listCollections({ name: collectionName })
      .hasNext();
    if (collectionExists) {
      await mongoose.connection.db.dropCollection(collectionName);
    }

    if (mongoose.models[collectionName]) {
      delete mongoose.models[collectionName];
    }

    res.status(200).json({
      message: `Model '${collectionName}' and all its data/images deleted successfully.`,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports.getAllDocuments = async (req, res) => {
  try {
    const { collectionName } = req.body;
    const userId = req.user._id;

    const modelMeta = await ModelStorageWithImg.findOne({
      modelName: collectionName,
      createdBy: userId,
    });
    if (!modelMeta) return res.status(404).json({ message: "Model not found" });

    res.status(200).json({
      message: "Model fields fetched successfully",
      modelName: collectionName,
      fields: modelMeta.fields,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports.getAllModelsWithImg = async (req, res) => {
  try {
    const userId = req.user._id;
    const models = await ModelStorageWithImg.find(
      { createdBy: userId },
      { _id: 0, modelName: 1, fields: 1, imgUrl: 1, createdBy: 1, publicId: 1 }
    );

    res.status(200).json({
      message: "All models fetched successfully",
      models,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports.getAllModelsWithData = async (req, res) => {
  try {
    const userId = req.user._id;

    // Step 1: Get all models with images for the user
    const models = await ModelStorageWithImg.find({ createdBy: userId });

    const result = [];

    // Step 2: Loop through each model and fetch its documents
    for (const model of models) {
      const Model = getDynamicModel(model.modelName, model.fields);
      const data = await Model.find();

      result.push({
        modelName: model.modelName,
        fields: model.fields,
        data: data, // including imgUrl, publicId, etc.
      });
    }

    res.status(200).json({
      message: "All models with image data fetched successfully",
      models: result,
    });
  } catch (err) {
    console.error("Error fetching all models with image data:", err.message);
    res.status(500).json({ error: err.message });
  }
};

// New function to add fields to existing model with image support
module.exports.addFieldsToExistingModelWithImg = async (req, res) => {
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
    const existingModel = await ModelStorageWithImg.findOne({
      modelName: collectionName,
      createdBy: userId
    });

    if (!existingModel) {
      return res.status(404).json({
        message: `Model "${collectionName}" not found or doesn't belong to you`
      });
    }

    // Filter out fields that already exist (excluding imgUrl and publicId which are auto-added)
    const existingFieldNames = existingModel.fields.map(field => field.name.toLowerCase());
    const newFields = fields.filter(field => 
      !existingFieldNames.includes(field.name.toLowerCase()) &&
      field.name.toLowerCase() !== 'imgurl' &&
      field.name.toLowerCase() !== 'publicid'
    );

    if (newFields.length === 0) {
      return res.status(200).json({
        message: `All provided fields already exist in model "${collectionName}".`,
        existingFields: existingModel.fields
      });
    }

    // Add new fields to existing model
    const updatedFields = [...existingModel.fields, ...newFields];
    await ModelStorageWithImg.findByIdAndUpdate(existingModel._id, {
      fields: updatedFields
    });

    res.status(200).json({
      message: `Successfully added ${newFields.length} new field(s) to model "${collectionName}".`,
      addedFields: newFields,
      allFields: updatedFields
    });

  } catch (err) {
    console.error("Error adding fields to existing model with image:", err.message);
    res.status(500).json({ error: err.message });
  }
};

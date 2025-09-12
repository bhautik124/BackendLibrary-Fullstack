const mongoose = require("mongoose");
const getDynamicModel = require("../../../model/features/crud/withoutImg/dynamicSchemaModel");
const getDynamicModelWithImg = require("../../../model/features/crud/withImage/dynamicSchemaWithImgModel");
const ModelStorageWithImg = require("../../../model/features/crud/withImage/getDynamicCreatedDataWithImgModel");
const ModelStorage = require("../../../model/features/crud/withoutImg/getDynamicCreatedDataModel");
const path = require("path");
const fs = require("fs");
const userModel = require("../../../model/user model/userModel");
const getBeginnerAuthModel = require("../../../model/features/Auth/BeginnerAuth/authModel");
const getEmailOtpAuthModel = require("../../../model/features/Auth/emailOtpAuth/emailOtpAuthModel");
const getGoogleAuthModel = require("../../../model/features/Auth/googleAuth/googleAuthModel");
const getRoleBasedAuthModel = require("../../../model/features/Auth/roleBasedAuth/roleBasedAuthModel");

module.exports.getBackupOfData = async (req, res) => {
  try {
    let backupData = [];

    //First: Normal Models
    const allModels = await ModelStorage.find();

    for (const modelDef of allModels) {
      const DynamicModel = getDynamicModel(modelDef.modelName, modelDef.fields);
      const records = await DynamicModel.find();

      backupData.push({
        modelName: modelDef.modelName,
        fields: modelDef.fields,
        type: "Without Image",
        data: records,
      });
    }

    //Second: Models With Image
    const allImgModels = await ModelStorageWithImg.find();

    for (const modelDef of allImgModels) {
      const DynamicModel = getDynamicModelWithImg(
        modelDef.modelName,
        modelDef.fields
      );
      const records = await DynamicModel.find();

      backupData.push({
        modelName: modelDef.modelName,
        fields: modelDef.fields,
        type: "With Image",
        imgUrl: modelDef.imgUrl,
        publicId: modelDef.publicId,
        data: records,
      });
    }

    //Third: Begginer Auth User Data
    const UserBeginnerAuth = getBeginnerAuthModel(req.user.email);
    const userRecords1 = await UserBeginnerAuth.find();

    if (userRecords1.length > 0) {
      backupData.push({
        modelName: `BeginnerAuth_${req.user.email}`,
        type: "Beginner Auth",
        data: userRecords1,
      });
    }

    //Fourth: EmailOTP Auth User Data
    const UserEmailOTPAuth = getEmailOtpAuthModel(req.user.email);
    const userRecords2 = await UserEmailOTPAuth.find();

    if (userRecords2.length > 0) {
      backupData.push({
        modelName: `emailOtpAuthCreatedBy_${req.user.email}`,
        type: "EmailOTP Auth",
        data: userRecords2,
      });
    }

    //Fifth: Google Auth User Data
    const UserGoogleAuth = getGoogleAuthModel(req.user.email);
    const userRecords3 = await UserGoogleAuth.find();

    if (userRecords3.length > 0) {
      backupData.push({
        modelName: `googleAuthCreatedBy_${req.user.email}`,
        type: "Google Auth",
        data: userRecords3,
      });
    }
    //Sixth: RoleBased Auth User Data
    const UserRoleBasedAuth = getRoleBasedAuthModel(req.user.email);
    const userRecords4 = await UserRoleBasedAuth.find();

    if (userRecords4.length > 0) {
      backupData.push({
        modelName: `rolebaseAuthCreatedBy_${req.user.email}`,
        type: "RoleBased Auth",
        data: userRecords4,
      });
    }

    //JSON File Creation
    const jsonString = JSON.stringify(backupData, null, 2);

    const filePath = path.join(__dirname, "backup.json");
    fs.writeFileSync(filePath, jsonString);

    res.download(filePath, "backup.json", (err) => {
      if (err) console.error(err);
      fs.unlinkSync(filePath);
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to generate backup" });
  }
};

module.exports.getAllUserData = async (req, res) => {
  try {
    const data = await userModel.find();
    res.status(200).json({
      message: "user data fetched successfully",
      data,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      message: "error while fetching user data",
    });
  }
};

module.exports.getLoginUserData = async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    res.status(200).json({
      data: user,
    });
  } catch (error) {
    console.log(error.message);
    res.status(401).json({
      message: "error while getting login user data",
    });
  }
};

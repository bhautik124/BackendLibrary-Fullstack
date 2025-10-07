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

    // Get user's used features from their APIs
    const userId = req.user._id;
    const user = await userModel.findById(userId);
    
    if (!user) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    // Extract used features from user's APIs
    const usedFeatures = user.apis.map(api => api.feature);
    
    // Helper function to check if user has used a specific feature group
    const hasUsedBeginnerAuth = usedFeatures.some(feature => 
      ['register', 'login', 'logout'].includes(feature)
    );
    
    const hasUsedEmailOtpAuth = usedFeatures.some(feature => 
      ['email-otp-register', 'email-otp-login', 'email-otp-logout', 'email-otp-send', 'email-otp-credential-verify'].includes(feature)
    );
    
    const hasUsedGoogleAuth = usedFeatures.some(feature => 
      ['google-auth', 'google-auth-logout'].includes(feature)
    );
    
    const hasUsedRoleBasedAuth = usedFeatures.some(feature => 
      ['role-based-register', 'role-based-login', 'role-based-logout'].includes(feature)
    );

    const hasUsedCrudWithoutImage = usedFeatures.some(feature => 
      ['crud-creation', 'crud-update', 'crud-delete', 'crud-delete-wholemodel', 'crud-get-data-of-model', 'crud-get-all-models'].includes(feature)
    );

    const hasUsedCrudWithImage = usedFeatures.some(feature => 
      ['crud-with-image-create-model', 'crud-with-image-update', 'crud-with-image-delete', 'crud-with-image-get-all-fields', 'crud-with-image-get-all-model'].includes(feature)
    );

    //First: Normal Models (only if user has used CRUD without image)
    if (hasUsedCrudWithoutImage) {
      const allModels = await ModelStorage.find({ createdBy: userId });

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
    }

    //Second: Models With Image (only if user has used CRUD with image)
    if (hasUsedCrudWithImage) {
      const allImgModels = await ModelStorageWithImg.find({ createdBy: userId });

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
    }

    //Third: Beginner Auth User Data (only if user has used beginner auth)
    if (hasUsedBeginnerAuth) {
      const UserBeginnerAuth = getBeginnerAuthModel(req.user.email);
      const userRecords1 = await UserBeginnerAuth.find();

      if (userRecords1.length > 0) {
        backupData.push({
          modelName: `BeginnerAuth_${req.user.email}`,
          type: "Beginner Auth",
          data: userRecords1,
        });
      }
    }

    //Fourth: EmailOTP Auth User Data (only if user has used email OTP auth)
    if (hasUsedEmailOtpAuth) {
      const UserEmailOTPAuth = getEmailOtpAuthModel(req.user.email);
      const userRecords2 = await UserEmailOTPAuth.find();

      if (userRecords2.length > 0) {
        backupData.push({
          modelName: `emailOtpAuthCreatedBy_${req.user.email}`,
          type: "EmailOTP Auth",
          data: userRecords2,
        });
      }
    }

    //Fifth: Google Auth User Data (only if user has used Google auth)
    if (hasUsedGoogleAuth) {
      const UserGoogleAuth = getGoogleAuthModel(req.user.email);
      const userRecords3 = await UserGoogleAuth.find();

      if (userRecords3.length > 0) {
        backupData.push({
          modelName: `googleAuthCreatedBy_${req.user.email}`,
          type: "Google Auth",
          data: userRecords3,
        });
      }
    }
    
    //Sixth: RoleBased Auth User Data (only if user has used role-based auth)
    if (hasUsedRoleBasedAuth) {
      const UserRoleBasedAuth = getRoleBasedAuthModel(req.user.email);
      const userRecords4 = await UserRoleBasedAuth.find();

      if (userRecords4.length > 0) {
        backupData.push({
          modelName: `rolebaseAuthCreatedBy_${req.user.email}`,
          type: "RoleBased Auth",
          data: userRecords4,
        });
      }
    }

    // Add metadata to backup
    const finalBackupData = {
      metadata: {
        userName: req.user.userName,
        email: req.user.email,
        backupDate: new Date(),
        totalModels: backupData.length,
        backupVersion: "1.0"
      },
      data: backupData
    };

    //JSON File Creation
    const jsonString = JSON.stringify(finalBackupData, null, 2);
    
    const fileName = `backup_${req.user.userName}_${Date.now()}.json`;
    const filePath = path.join(__dirname, fileName);
    fs.writeFileSync(filePath, jsonString);

    res.download(filePath, fileName, (err) => {
      if (err) console.error(err);
      fs.unlinkSync(filePath);
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ 
      success: false,
      error: "Failed to generate backup" 
    });
  }
};

module.exports.getBackupInfo = async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await userModel.findById(userId);
    
    if (!user) {
      return res.status(401).json({ 
        success: false,
        error: "Unauthorized" 
      });
    }

    // Extract used features from user's APIs
    const usedFeatures = user.apis.map(api => api.feature);
    
    // Helper function to check if user has used a specific feature group
    const hasUsedBeginnerAuth = usedFeatures.some(feature => 
      ['register', 'login', 'logout'].includes(feature)
    );
    
    const hasUsedEmailOtpAuth = usedFeatures.some(feature => 
      ['email-otp-register', 'email-otp-login', 'email-otp-logout', 'email-otp-send', 'email-otp-credential-verify'].includes(feature)
    );
    
    const hasUsedGoogleAuth = usedFeatures.some(feature => 
      ['google-auth', 'google-auth-logout'].includes(feature)
    );
    
    const hasUsedRoleBasedAuth = usedFeatures.some(feature => 
      ['role-based-register', 'role-based-login', 'role-based-logout'].includes(feature)
    );

    const hasUsedCrudWithoutImage = usedFeatures.some(feature => 
      ['crud-creation', 'crud-update', 'crud-delete', 'crud-delete-wholemodel', 'crud-get-data-of-model', 'crud-get-all-models'].includes(feature)
    );

    const hasUsedCrudWithImage = usedFeatures.some(feature => 
      ['crud-with-image-create-model', 'crud-with-image-update', 'crud-with-image-delete', 'crud-with-image-get-all-fields', 'crud-with-image-get-all-model'].includes(feature)
    );

    let modelCounts = {
      crudModels: 0,
      crudWithImageModels: 0,
      authModels: 0
    };

    // Count CRUD models
    if (hasUsedCrudWithoutImage) {
      const allModels = await ModelStorage.find({ createdBy: userId });
      modelCounts.crudModels = allModels.length;
    }

    // Count CRUD with Image models
    if (hasUsedCrudWithImage) {
      const allImgModels = await ModelStorageWithImg.find({ createdBy: userId });
      modelCounts.crudWithImageModels = allImgModels.length;
    }

    const backupInfo = {
      userName: user.userName,
      email: user.email,
      totalApis: user.apis.length,
      paymentStatus: user.isPayment,
      accountCreated: user.createdAt,
      featuresUsed: {
        beginnerAuth: hasUsedBeginnerAuth,
        emailOtpAuth: hasUsedEmailOtpAuth,
        googleAuth: hasUsedGoogleAuth,
        roleBasedAuth: hasUsedRoleBasedAuth,
        crudWithoutImage: hasUsedCrudWithoutImage,
        crudWithImage: hasUsedCrudWithImage
      },
      modelCounts,
      totalModelsToBackup: modelCounts.crudModels + modelCounts.crudWithImageModels + 
        (hasUsedBeginnerAuth ? 1 : 0) + 
        (hasUsedEmailOtpAuth ? 1 : 0) + 
        (hasUsedGoogleAuth ? 1 : 0) + 
        (hasUsedRoleBasedAuth ? 1 : 0)
    };

    return res.json({
      success: true,
      message: "Backup information retrieved successfully",
      backupInfo
    });

  } catch (error) {
    console.error("Backup info error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error while retrieving backup info"
    });
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

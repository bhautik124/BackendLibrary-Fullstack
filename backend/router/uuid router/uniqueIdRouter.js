// const express = require("express");
// const router = express.Router();
// const { default: ShortUniqueId } = require("short-unique-id");
// const uid = new ShortUniqueId({ length: 7 });
// const userModel = require("../../model/user model/userModel");
// const isAuth = require("../../middleware/forUserMiddleware/isAuth");

// router.post("/generate-key", isAuth, async (req, res) => {
//   //find that user and push api to the user database
//   const userId = req.user._id;
//   const user = await userModel.findById(userId);
//   if (!user) return res.status(401).json({ error: "Unauthorized" });

//   if (user.role === "admin")
//     return res.status(401).json({ error: "this feature is only for users" });

//   //select any one feature
//   let { feature } = req.body;
//   if (!feature) return res.status(400).json({ error: "feature is required" });

//   if (!Array.isArray(feature)) {
//     feature = [feature]; //convert in arr
//   }

//   const availableFeature = [
//     //beginner auth
//     "register",
//     "login",
//     "logout",

//     //role based auth
//     "role-based-register",
//     "role-based-login",
//     "role-based-logout",

//     //email otp auth
//     "email-otp-register",
//     "email-otp-login",
//     "email-otp-logout",
//     "email-otp-send",
//     "email-otp-credential-verify",

//     //google auth
//     "google-auth",
//     "google-auth-logout",

//     //without image crud
//     "crud-creation",
//     "crud-update",
//     "crud-delete",
//     "crud-get-data-of-model",
//     "crud-get-all-models",

//     //with image crud
//     "crud-with-image-create-model",
//     "crud-with-image-update",
//     "crud-with-image-delete",
//     "crud-with-image-get-all-fields",
//     "crud-with-image-get-all-model",
//   ];
//   const allFeaturesValid = feature.every((f) => availableFeature.includes(f));
//   if (!allFeaturesValid) {
//     return res.status(401).json({
//       error: "This feature is under development",
//     });
//   }

//   const newId = uid.rnd();
//   const base = `https://backendlibraryy-fullstack-backend.onrender.com/api/${newId}`;

//   const newApi = feature.map((f) => ({
//     feature: f,
//     url: `${base}/${f}`,
//   }));

//   // Save to DB
//   user.apis.push(...newApi);
//   await user.save();

//   res.status(201).json({
//     message: "API generated successfully",
//     api: newApi,
//   });
// });

// module.exports = router;

const express = require("express");
const router = express.Router();
const { default: ShortUniqueId } = require("short-unique-id");
const uid = new ShortUniqueId({ length: 7 });
const jwt = require("jsonwebtoken");
const userModel = require("../../model/user model/userModel");
const isAuth = require("../../middleware/forUserMiddleware/isAuth");
const checkApiLimit = require("../../middleware/checkApiLimit/checkApiLimit");

router.post("/generate-key", isAuth, checkApiLimit, async (req, res) => {
  const userId = req.user._id;
  const user = await userModel.findById(userId);
  if (!user) return res.status(401).json({ error: "Unauthorized" });

  if (user.role === "admin")
    return res.status(401).json({ error: "this feature is only for users" });

  let { feature } = req.body;
  if (!feature) return res.status(400).json({ error: "feature is required" });

  if (!Array.isArray(feature)) feature = [feature];

  const availableFeature = [
    //beginner auth
    "register",
    "login",
    "logout",

    //role based auth
    "role-based-register",
    "role-based-login",
    "role-based-logout",

    //email otp auth
    "email-otp-register",
    "email-otp-login",
    "email-otp-logout",
    "email-otp-send",
    "email-otp-credential-verify",

    //google auth
    "google-auth",
    "google-auth-logout",

    //without image crud
    "crud-creation",
    "crud-update",
    "crud-delete",
    "crud-delete-wholemodel",
    "crud-get-data-of-model",
    "crud-get-all-models",
    "crud-get-all-models-with-data",

    //with image crud
    "crud-with-image-create-model",
    "crud-with-image-update",
    "crud-with-image-delete",
    "crud-with-image-whole-modeldelete",
    "crud-with-image-get-all-fields",
    "crud-with-image-get-all-model",
    "crud-with-image-get-all-model-with-data",
  ];

  const allFeaturesValid = feature.every((f) => availableFeature.includes(f));
  if (!allFeaturesValid) {
    return res.status(401).json({ error: "This feature is under development" });
  }

  const newId = uid.rnd(); // apiKey
  const base = `https://backendlibraryy-fullstack-backend.onrender.com/api/${newId}`;

  const newApi = feature.map((f) => {
    let token = null;

    // Only generate token if it's a CRUD feature
    if (f.startsWith("crud-")) {
      token = jwt.sign(
        {
          userId: user._id,
          apiKey: newId,
          feature: f,
        },
        process.env.JWT_SECRET_KEY,
        { expiresIn: "30d" }
      );
    }

    return {
      feature: f,
      url: `${base}/${f}`,
      apiKey: newId,
      token: token, // null for non-CRUD APIs
    };
  });

  user.apis.push(...newApi);
  await user.save();

  // Refresh user data to get updated apiUsageCount
  const updatedUser = await userModel.findById(userId);
  
  res.status(201).json({
    message: "API generated successfully",
    api: newApi,
    usageInfo: {
      apiUsageCount: updatedUser.apiUsageCount,
      freeApiLimit: updatedUser.freeApiLimit,
      remainingApis: Math.max(0, updatedUser.freeApiLimit - updatedUser.apiUsageCount),
      isPayment: updatedUser.isPayment,
      warningMessage: updatedUser.apiUsageCount >= updatedUser.freeApiLimit - 2 ? 
        `Warning: Only ${Math.max(0, updatedUser.freeApiLimit - updatedUser.apiUsageCount)} APIs remaining. Consider making payment for unlimited access.` : 
        null
    }
  });
});

module.exports = router;

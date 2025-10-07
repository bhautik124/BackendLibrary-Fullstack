const express = require("express");
const { verifyGoogleToken, logoutUser } = require("../../../../controller/features/Auth/googleAuth/googleAuthController");
const checkApiActive = require("../../../../middleware/forAdminGiveAccessApi/apiUseAcessMiddleware");
const router = express.Router();

router.post("/:uuid/google-auth", checkApiActive , verifyGoogleToken);
router.post("/:uuid/google-auth-logout", checkApiActive , logoutUser);

module.exports = router;

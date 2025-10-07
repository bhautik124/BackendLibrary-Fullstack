const express = require("express");
const {
  registerUser,
  sendOtp,
  loginUser,
  logoutUser,
  verifyUserPassword,
} = require("../../../../controller/features/Auth/emailOtpAuth/emailOtpAuthController");
const checkApiActive = require("../../../../middleware/forAdminGiveAccessApi/apiUseAcessMiddleware");

const router = express.Router();

router.post("/:uuid/email-otp-register", checkApiActive, registerUser);
router.post("/:uuid/email-otp-send", sendOtp);
router.post("/:uuid/email-otp-login", checkApiActive, loginUser);
router.post("/:uuid/email-otp-logout", checkApiActive, logoutUser);
router.post("/:uuid/email-otp-credential-verify", verifyUserPassword);

module.exports = router;

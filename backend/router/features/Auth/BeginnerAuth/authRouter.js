const express = require("express");
const {
  registerUser,
  loginUser,
  logoutUser,
} = require("../../../../controller/features/Auth/BeginnerAuth/authController");
const checkApiActive = require("../../../../middleware/forAdminGiveAccessApi/apiUseAcessMiddleware");
const router = express.Router();

router.post("/:uuid/register", checkApiActive, registerUser);
router.post("/:uuid/login", checkApiActive, loginUser);
router.post("/:uuid/logout", checkApiActive, logoutUser);

module.exports = router;

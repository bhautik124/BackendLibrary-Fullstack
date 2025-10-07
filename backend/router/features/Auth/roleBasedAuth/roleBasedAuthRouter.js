const express = require("express");
const {
  registerUser,
  loginUser,
  logoutUser,
} = require("../../../../controller/features/Auth/roleBasedAuth/roleBasedAuthController");
const checkApiActive = require("../../../../middleware/forAdminGiveAccessApi/apiUseAcessMiddleware");
const router = express.Router();

router.post("/:uuid/role-based-register", checkApiActive, registerUser);
router.post("/:uuid/role-based-login", checkApiActive, loginUser);
router.post("/:uuid/role-based-logout", checkApiActive, logoutUser);

module.exports = router;

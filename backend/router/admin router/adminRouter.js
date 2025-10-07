const express = require("express");
const router = express.Router();

const {
  loginUser,
  logoutUser,
  registerUser,
  getAllUsers,
  getGeneratedApi,
  manageApiAccess,
} = require("../../controller/admin controller/adminController");
const isAuthAdmin = require("../../middleware/forAdminMiddleware/isAuthForAdmin");

router.post("/auth/register", registerUser);
router.post("/auth/login", loginUser);
router.post("/auth/logout", logoutUser);
router.put("/api-access", isAuthAdmin, manageApiAccess);

module.exports = router;

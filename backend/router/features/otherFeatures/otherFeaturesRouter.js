const express = require("express");
const router = express.Router();

const isAuth = require("../../../middleware/forAdminMiddleware/isAuthForAdmin");
const isAuthForUser = require("../../../middleware/forUserMiddleware/isAuth");
const checkPaymentForDataBackup = require("../../../middleware/checkPayment/checkPaymentForDataBackup");

const {
  getBackupOfData,
  getBackupInfo,
  getAllUserData,
  getLoginUserData,
} = require("../../../controller/features/otherFeatures/otherFeaturesController");

router.get("/crud-get-backup-info", isAuthForUser, getBackupInfo);
router.get("/crud-get-backup", isAuthForUser, checkPaymentForDataBackup, getBackupOfData);
router.get("/get-login-user-data", isAuthForUser, getLoginUserData);
router.get("/get-all-user-data", isAuth, getAllUserData);
//for admin protected route
router.get("/check-auth", isAuth, (req, res) => {
  res.json({ sucess: true, user: req.user });
});
//for user protected route
router.get("/user-check-auth", isAuthForUser, (req, res) => {
  res.json({ sucess: true, user: req.user });
});

module.exports = router;

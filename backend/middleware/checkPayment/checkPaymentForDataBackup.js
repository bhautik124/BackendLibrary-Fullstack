const userModel = require("../../model/user model/userModel");

const checkPaymentForDataBackup = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const user = await userModel.findById(userId);

    if (!user) {
      return res.status(404).json({ 
        success: false,
        message: "User not found" 
      });
    }

    // Check if user has data backup access
    // Either through 99 INR lifetime plan OR 199 INR full access plan
    const hasDataBackupAccess = user.dataBackupAccess || user.isPayment;

    if (!hasDataBackupAccess) {
      return res.status(403).json({
        success: false,
        message: "Payment required to download data backup. Choose 99 INR for lifetime backup access or 199 INR for full access.",
        requiresPayment: true,
        paymentOptions: {
          dataBackupOnly: {
            amount: 99,
            type: "data_backup",
            description: "Lifetime data backup access"
          },
          fullAccess: {
            amount: 199,
            type: "full_access", 
            description: "API limit reset + Data backup access"
          }
        }
      });
    }

    next();
  } catch (error) {
    console.error("Payment check error:", error);
    res.status(500).json({ 
      success: false,
      message: "Server error while checking payment status" 
    });
  }
};

module.exports = checkPaymentForDataBackup;
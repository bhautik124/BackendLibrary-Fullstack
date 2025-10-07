const User = require("../model/user model/userModel");

// Helper function to check if user needs payment
const checkUserPaymentStatus = async (userId) => {
  try {
    const user = await User.findById(userId);
    if (!user) return { needsPayment: true, reason: "User not found" };

    // If user has already paid, no payment needed
    if (user.isPayment) {
      return { needsPayment: false, reason: "Payment already made" };
    }

    // Check if free API limit is exceeded
    if (user.apiUsageCount >= user.freeApiLimit) {
      return { 
        needsPayment: true, 
        reason: "Free API limit exceeded",
        apiUsageCount: user.apiUsageCount,
        freeApiLimit: user.freeApiLimit
      };
    }

    return { 
      needsPayment: false, 
      reason: "Within free limit",
      apiUsageCount: user.apiUsageCount,
      freeApiLimit: user.freeApiLimit,
      remainingApis: user.freeApiLimit - user.apiUsageCount
    };

  } catch (error) {
    console.error("Payment status check error:", error);
    return { needsPayment: true, reason: "Server error" };
  }
};

// Helper function to reset user API count after payment
const resetUserApiCount = async (userId) => {
  try {
    await User.findByIdAndUpdate(userId, {
      apiUsageCount: 0,
      isPayment: true,
      lastPaymentDate: new Date()
    });
    return { success: true };
  } catch (error) {
    console.error("Reset API count error:", error);
    return { success: false, error: error.message };
  }
};

module.exports = {
  checkUserPaymentStatus,
  resetUserApiCount
};
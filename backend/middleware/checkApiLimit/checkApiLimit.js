const userModel = require("../../model/user model/userModel");

const checkApiLimit = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const user = await userModel.findById(userId);

    if (!user) {
      return res.status(404).json({ 
        success: false,
        message: "User not found" 
      });
    }

    // Check if API limit exceeded (for both paid and free users)
    if (user.apiUsageCount >= user.freeApiLimit) {
      // If user had temporary payment and limit is exhausted, reset payment status
      if (user.isPayment && user.apiUsageCount >= user.freeApiLimit) {
        user.isPayment = false; // Reset temporary payment status
        await user.save();
      }

      return res.status(403).json({
        success: false,
        message: `Your API limit of ${user.freeApiLimit} has been exhausted. Please make payment to reset your limit and get ${user.freeApiLimit} more APIs.`,
        apiUsageCount: user.apiUsageCount,
        freeApiLimit: user.freeApiLimit,
        requiresPayment: true,
        paymentOptions: {
          fullAccess: {
            amount: 199,
            type: "full_access",
            description: "Reset API limit + Data backup access"
          }
        },
        note: user.apiUsageCount === user.freeApiLimit ? 
          "Your payment limit has been used. Pay again to reset limit and get more APIs." : 
          "Free limit exceeded. Make payment to continue."
      });
    }

    // Always increment usage count for every API generation
    user.apiUsageCount += 1;
    await user.save();

    req.user = user; // Update user object with latest data
    next();
  } catch (error) {
    console.error("API limit check error:", error);
    res.status(500).json({ 
      success: false,
      message: "Server error while checking API limits" 
    });
  }
};

module.exports = checkApiLimit;
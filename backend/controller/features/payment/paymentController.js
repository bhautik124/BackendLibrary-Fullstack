// File: controllers/paymentController.js
const Payment = require("../../../model/features/payment/paymentModel");
const User = require("../../../model/user model/userModel");
const { v4: uuidv4 } = require("uuid");
const { resetUserApiCount } = require("../../../helper/paymentHelper");

// Create a new payment for authenticated user
exports.createPayment = async (req, res) => {
  try {
    const { phone, amount, currency, paymentType } = req.body;
    const userId = req.user._id;
    const user = req.user;

    if (amount == null) {
      return res.status(400).json({ 
        success: false,
        message: "Amount is required" 
      });
    }

    // Set default amount and plan details based on payment type
    let finalAmount, planDetails, finalPaymentType;
    
    if (paymentType === "data_backup") {
      finalAmount = amount || 99;
      planDetails = "data_backup_lifetime";
      finalPaymentType = "data_backup";
    } else if (paymentType === "full_access" || paymentType === "api_access") {
      finalAmount = amount || 199;
      planDetails = "full_access_temporary";
      finalPaymentType = "full_access";
    } else {
      finalAmount = amount || 199;
      planDetails = "api_reset_temporary";
      finalPaymentType = "api_access";
    }

    const transactionId = `FP_${Date.now()}_${uuidv4().slice(0, 8)}`;

    const payment = new Payment({
      userId: userId,
      name: user.userName,
      email: user.email,
      phone,
      amount: finalAmount,
      currency: currency || "INR",
      status: "pending",
      transactionId,
      paymentType: finalPaymentType,
      planDetails: planDetails,
    });

    await payment.save();

    // Return minimal info client needs to simulate payment
    return res.status(201).json({
      success: true,
      message: "Payment created (fake). Use /payments/:id/success to mark success",
      paymentId: payment._id,
      transactionId: payment.transactionId,
      status: payment.status,
      amount: payment.amount,
      paymentType: payment.paymentType,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ 
      success: false,
      message: "Server error" 
    });
  }
};

// Mark a payment as success (simulates post-payment webhook)
exports.markPaymentSuccess = async (req, res) => {
  try {
    const { id } = req.params; // payment _id
    const userId = req.user._id;
    
    const payment = await Payment.findOne({ _id: id, userId: userId });
    if (!payment) {
      return res.status(404).json({ 
        success: false,
        message: "Payment not found or unauthorized" 
      });
    }
    
    if (payment.status === "success") {
      return res.status(400).json({ 
        success: false,
        message: "Payment already successful" 
      });
    }

    // Mark payment as success
    payment.status = "success";
    await payment.save();

    // Update user payment status based on plan
    const user = await User.findById(userId);
    user.lastPaymentDate = new Date();
    user.paymentHistory.push(payment._id);
    
    if (payment.planDetails === "data_backup_lifetime") {
      // 99 INR - Only data backup access (lifetime)
      user.dataBackupAccess = true;
      user.dataBackupLifetime = true;
      // Don't reset API count or set isPayment for API access
    } else if (payment.planDetails === "full_access_temporary") {
      // 199 INR - Full access (API reset + data backup)
      user.isPayment = true;
      user.dataBackupAccess = true;
      user.apiUsageCount = 0; // Reset API count to 0
      // Note: dataBackupLifetime remains false for temporary access
    } else if (payment.planDetails === "api_reset_temporary") {
      // API access only (if this option exists)
      user.isPayment = true;
      user.apiUsageCount = 0;
    }
    
    await user.save();

    return res.json({ 
      success: true,
      message: "Payment marked successful", 
      payment,
      userPaymentStatus: user.isPayment
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ 
      success: false,
      message: "Server error" 
    });
  }
};

// Mark a payment as failed (optional)
exports.markPaymentFailed = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user._id;
    
    const payment = await Payment.findOne({ _id: id, userId: userId });
    if (!payment) {
      return res.status(404).json({ 
        success: false,
        message: "Payment not found or unauthorized" 
      });
    }
    
    if (payment.status === "success") {
      return res.status(400).json({ 
        success: false,
        message: "Cannot fail a completed payment" 
      });
    }

    payment.status = "failed";
    await payment.save();
    
    return res.json({ 
      success: true,
      message: "Payment marked failed", 
      payment 
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ 
      success: false,
      message: "Server error" 
    });
  }
};

// Get payment by id (user can only see their own payments)
exports.getPayment = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user._id;
    
    const payment = await Payment.findOne({ _id: id, userId: userId });
    if (!payment) {
      return res.status(404).json({ 
        success: false,
        message: "Payment not found or unauthorized" 
      });
    }
    
    return res.json({ 
      success: true,
      payment 
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ 
      success: false,
      message: "Server error" 
    });
  }
};

// List user's payments (with simple pagination)
exports.listPayments = async (req, res) => {
  try {
    const userId = req.user._id;
    const page = parseInt(req.query.page) || 1;
    const limit = Math.min(parseInt(req.query.limit) || 20, 100);
    const skip = (page - 1) * limit;

    const [payments, total] = await Promise.all([
      Payment.find({ userId })
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit),
      Payment.countDocuments({ userId }),
    ]);

    return res.json({ 
      success: true,
      page, 
      limit, 
      total, 
      payments 
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ 
      success: false,
      message: "Server error" 
    });
  }
};

// Get user payment status and API usage info
exports.getUserPaymentStatus = async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await User.findById(userId)
      .select("isPayment apiUsageCount freeApiLimit lastPaymentDate dataBackupAccess dataBackupLifetime")
      .populate("paymentHistory", "amount status paymentType planDetails createdAt");

    return res.json({
      success: true,
      paymentStatus: {
        // API Access Status
        isPayment: user.isPayment,
        apiUsageCount: user.apiUsageCount,
        freeApiLimit: user.freeApiLimit,
        remainingFreeApis: Math.max(0, user.freeApiLimit - user.apiUsageCount),
        needsApiPayment: !user.isPayment && user.apiUsageCount >= user.freeApiLimit,
        
        // Data Backup Status  
        dataBackupAccess: user.dataBackupAccess,
        dataBackupLifetime: user.dataBackupLifetime,
        hasAnyBackupAccess: user.dataBackupAccess || user.isPayment,
        
        // General
        lastPaymentDate: user.lastPaymentDate,
        paymentHistory: user.paymentHistory,
        
        // Payment Options
        availablePlans: {
          dataBackupOnly: {
            amount: 99,
            type: "data_backup", 
            description: "Lifetime data backup access only",
            available: !user.dataBackupLifetime && !user.isPayment
          },
          fullAccess: {
            amount: 199,
            type: "full_access",
            description: "API limit reset + Data backup access",
            available: !user.isPayment || user.apiUsageCount >= user.freeApiLimit
          }
        }
      }
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ 
      success: false,
      message: "Server error" 
    });
  }
};

// Check if payment is required for specific action
exports.checkPaymentRequired = async (req, res) => {
  try {
    const userId = req.user._id;
    const { action } = req.query; // 'api_generation' or 'data_backup'
    const user = await User.findById(userId).select("isPayment apiUsageCount freeApiLimit dataBackupAccess dataBackupLifetime");

    let requiresPayment = false;
    let reason = "";
    let availableOptions = {};

    if (action === "api_generation") {
      if (!user.isPayment && user.apiUsageCount >= user.freeApiLimit) {
        requiresPayment = true;
        reason = "Free API limit exceeded. Need 199 INR plan for API access.";
        availableOptions = {
          fullAccess: {
            amount: 199,
            type: "full_access",
            description: "Reset API limit + Data backup access"
          }
        };
      }
    } else if (action === "data_backup") {
      const hasBackupAccess = user.dataBackupAccess || user.isPayment;
      if (!hasBackupAccess) {
        requiresPayment = true;
        reason = "Payment required for data backup";
        availableOptions = {};
        
        // Only show data backup plan if user doesn't have it and hasn't paid for full access
        if (!user.dataBackupLifetime && !user.isPayment) {
          availableOptions.dataBackupOnly = {
            amount: 99,
            type: "data_backup",
            description: "Lifetime data backup access only"
          };
        }
        
        // Always show full access for data backup
        availableOptions.fullAccess = {
          amount: 199,
          type: "full_access", 
          description: "API limit reset + Data backup access"
        };
      }
    }

    return res.json({
      success: true,
      requiresPayment,
      reason,
      availableOptions,
      userStatus: {
        isPayment: user.isPayment,
        apiUsageCount: user.apiUsageCount,
        freeApiLimit: user.freeApiLimit,
        remainingFreeApis: Math.max(0, user.freeApiLimit - user.apiUsageCount),
        dataBackupAccess: user.dataBackupAccess,
        dataBackupLifetime: user.dataBackupLifetime
      }
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ 
      success: false,
      message: "Server error" 
    });
  }
};

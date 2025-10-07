const express = require("express");
const router = express.Router();
const paymentController = require("../../../controller/features/payment/paymentController");
const auth = require("../../../middleware/forUserMiddleware/isAuth");

// All payment routes require authentication
router.use(auth);

// Create payment (fake)
router.post("/create", paymentController.createPayment);

// Mark success (simulates payment gateway callback)
router.post("/:id/success", paymentController.markPaymentSuccess);

// Mark failed (optional)
router.post("/:id/failed", paymentController.markPaymentFailed);

// Get user payment status
router.get("/status", paymentController.getUserPaymentStatus);

// Check if payment is required for specific action
router.get("/check-required", paymentController.checkPaymentRequired);

// Get one payment
router.get("/:id", paymentController.getPayment);

// List user's payments
router.get("/", paymentController.listPayments);

module.exports = router;

// Payment Service for handling payment-related API calls
class PaymentService {
  static BASE_URL = "https://backendlibraryy-fullstack-backend.onrender.com/api";

  // Check if payment is required for specific action
  static async checkPaymentRequired(action) {
    try {
      const response = await fetch(
        `${this.BASE_URL}/payment/check-required?action=${action}`,
        {
          method: "GET",
          credentials: "include",
        }
      );
      return await response.json();
    } catch (error) {
      console.error("Error checking payment requirement:", error);
      return { success: false, error: error.message };
    }
  }

  // Get user payment status
  static async getPaymentStatus() {
    try {
      const response = await fetch(`${this.BASE_URL}/payment/status`, {
        method: "GET",
        credentials: "include",
      });
      return await response.json();
    } catch (error) {
      console.error("Error fetching payment status:", error);
      return { success: false, error: error.message };
    }
  }

  // Create payment
  static async createPayment(paymentData) {
    try {
      const response = await fetch(`${this.BASE_URL}/payment/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(paymentData),
      });
      return await response.json();
    } catch (error) {
      console.error("Error creating payment:", error);
      return { success: false, error: error.message };
    }
  }

  // Mark payment as successful (for testing)
  static async markPaymentSuccess(paymentId) {
    try {
      const response = await fetch(
        `${this.BASE_URL}/payment/${paymentId}/success`,
        {
          method: "POST",
          credentials: "include",
        }
      );
      return await response.json();
    } catch (error) {
      console.error("Error marking payment as successful:", error);
      return { success: false, error: error.message };
    }
  }

  // Enhanced API generation with payment check
  static async generateAPIWithPaymentCheck(features) {
    try {
      // First check if payment is required
      const paymentCheck = await this.checkPaymentRequired("api_generation");
      
      if (paymentCheck.requiresPayment) {
        return {
          success: false,
          requiresPayment: true,
          paymentData: paymentCheck,
        };
      }

      // If no payment required, proceed with API generation
      const response = await fetch(`${this.BASE_URL}/generate-key`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ feature: features }),
      });

      const result = await response.json();
      
      if (!response.ok) {
        // If API limit exceeded, return payment requirement
        if (result.requiresPayment) {
          return {
            success: false,
            requiresPayment: true,
            paymentData: result,
          };
        }
        throw new Error(result.message || "API generation failed");
      }

      return {
        success: true,
        data: result,
      };
    } catch (error) {
      console.error("Error generating API:", error);
      return { success: false, error: error.message };
    }
  }
}

export default PaymentService;
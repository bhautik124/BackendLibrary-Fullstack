import React, { useState } from "react";
import PaymentService from "./PaymentService";

const PaymentModal = ({ 
  isOpen, 
  onClose, 
  paymentData, 
  onPaymentSuccess,
  title = "Payment Required" 
}) => {
  const [loading, setLoading] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [paymentStep, setPaymentStep] = useState("select"); // "select", "processing", "success"

  if (!isOpen) return null;

  const handlePlanSelect = (planType) => {
    setSelectedPlan(planType);
  };

  const handlePayment = async () => {
    if (!selectedPlan) return;

    setLoading(true);
    setPaymentStep("processing");

    try {
      // Create payment
      const paymentRequest = {
        paymentType: selectedPlan.type,
        amount: selectedPlan.amount,
        phone: "9876543210", // You can add a form for this
      };

      const createResult = await PaymentService.createPayment(paymentRequest);
      
      if (createResult.success) {
        // Simulate payment success (in real app, this would be handled by payment gateway)
        setTimeout(async () => {
          const successResult = await PaymentService.markPaymentSuccess(
            createResult.paymentId
          );
          
          if (successResult.success) {
            setPaymentStep("success");
            setTimeout(() => {
              onPaymentSuccess?.(successResult);
              onClose();
              setPaymentStep("select");
              setSelectedPlan(null);
            }, 2000);
          } else {
            alert("Payment processing failed. Please try again.");
            setPaymentStep("select");
          }
          setLoading(false);
        }, 3000);
      } else {
        alert("Failed to create payment. Please try again.");
        setPaymentStep("select");
        setLoading(false);
      }
    } catch (error) {
      console.error("Payment error:", error);
      alert("Payment failed. Please try again.");
      setPaymentStep("select");
      setLoading(false);
    }
  };

  const availablePlans = paymentData?.availableOptions || paymentData?.paymentOptions || {};

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-stone-950 border border-stone-700 rounded-2xl p-6 max-w-md w-full">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-zinc-300">{title}</h3>
          {paymentStep !== "processing" && (
            <button
              onClick={onClose}
              className="text-stone-400 hover:text-white text-2xl"
            >
              ×
            </button>
          )}
        </div>

        {paymentStep === "select" && (
          <div className="space-y-4">
            {paymentData?.message && (
              <div className="bg-red-900 border border-red-600 rounded-lg p-3">
                <p className="text-red-200 text-sm">{paymentData.message}</p>
              </div>
            )}

            {paymentData?.reason && (
              <div className="bg-yellow-900 border border-yellow-600 rounded-lg p-3">
                <p className="text-yellow-200 text-sm">{paymentData.reason}</p>
              </div>
            )}

            <div className="space-y-3">
              {availablePlans.dataBackupOnly && availablePlans.dataBackupOnly.amount && (
                <div 
                  className={`border rounded-lg p-4 cursor-pointer transition-all ${
                    selectedPlan?.type === "data_backup" 
                      ? "border-blue-500 bg-blue-900 bg-opacity-20" 
                      : "border-stone-600 hover:border-blue-400"
                  }`}
                  onClick={() => handlePlanSelect(availablePlans.dataBackupOnly)}
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-bold text-blue-400">₹99 - Data Backup Only</p>
                      <p className="text-sm text-stone-400">
                        {availablePlans.dataBackupOnly.description}
                      </p>
                    </div>
                    <div className={`w-4 h-4 rounded-full border-2 ${
                      selectedPlan?.type === "data_backup"
                        ? "border-blue-500 bg-blue-500"
                        : "border-stone-500"
                    }`}></div>
                  </div>
                </div>
              )}

              {availablePlans.fullAccess && availablePlans.fullAccess.amount && (
                <div 
                  className={`border rounded-lg p-4 cursor-pointer transition-all ${
                    selectedPlan?.type === "full_access" 
                      ? "border-green-500 bg-green-900 bg-opacity-20" 
                      : "border-stone-600 hover:border-green-400"
                  }`}
                  onClick={() => handlePlanSelect(availablePlans.fullAccess)}
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-bold text-green-400">₹199 - Full Access</p>
                      <p className="text-sm text-stone-400">
                        {availablePlans.fullAccess.description}
                      </p>
                    </div>
                    <div className={`w-4 h-4 rounded-full border-2 ${
                      selectedPlan?.type === "full_access"
                        ? "border-green-500 bg-green-500"
                        : "border-stone-500"
                    }`}></div>
                  </div>
                </div>
              )}
            </div>

            {paymentData?.userStatus && (
              <div className="bg-stone-800 rounded-lg p-3">
                <p className="text-stone-300 text-sm font-bold mb-2">Current Status:</p>
                <div className="text-xs text-stone-400 space-y-1">
                  <p>API Usage: {paymentData.userStatus.apiUsageCount}/{paymentData.userStatus.freeApiLimit}</p>
                  <p>Remaining: {paymentData.userStatus.remainingFreeApis}</p>
                  {paymentData.userStatus.dataBackupAccess && (
                    <p className="text-green-400">✓ Data Backup Access Available</p>
                  )}
                </div>
              </div>
            )}

            <button
              onClick={handlePayment}
              disabled={!selectedPlan || loading}
              className={`w-full py-3 rounded-lg font-bold transition-all ${
                selectedPlan && !loading
                  ? "bg-blue-600 hover:bg-blue-700 text-white"
                  : "bg-stone-700 text-stone-400 cursor-not-allowed"
              }`}
            >
              {selectedPlan 
                ? `Pay ₹${selectedPlan.amount}` 
                : "Select a plan to continue"
              }
            </button>
          </div>
        )}

        {paymentStep === "processing" && (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
            <p className="text-zinc-300">Processing your payment...</p>
            <p className="text-sm text-stone-400 mt-2">Please wait, this may take a few seconds.</p>
          </div>
        )}

        {paymentStep === "success" && (
          <div className="text-center py-8">
            <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-white text-2xl">✓</span>
            </div>
            <p className="text-green-400 font-bold">Payment Successful!</p>
            <p className="text-sm text-stone-400 mt-2">Redirecting...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentModal;
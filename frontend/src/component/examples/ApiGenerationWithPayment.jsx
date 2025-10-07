import React, { useState } from "react";
import PaymentService from "../../payment/PaymentService";
import PaymentModal from "../../payment/PaymentModal";

// Example component showing how to integrate payment with API generation
// You can use this pattern in your existing API generation components

const ApiGenerationWithPayment = ({ features, onApiGenerated }) => {
  const [loading, setLoading] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [paymentData, setPaymentData] = useState(null);
  const [generatedApi, setGeneratedApi] = useState(null);

  const handleGenerateApi = async () => {
    setLoading(true);
    
    try {
      const result = await PaymentService.generateAPIWithPaymentCheck(features);
      
      if (result.requiresPayment) {
        // Show payment modal
        setPaymentData(result.paymentData);
        setShowPaymentModal(true);
      } else if (result.success) {
        // API generated successfully
        setGeneratedApi(result.data);
        onApiGenerated?.(result.data);
      } else {
        // Other error
        alert(result.error || "Failed to generate API");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handlePaymentSuccess = async () => {
    setShowPaymentModal(false);
    // Retry API generation after successful payment
    setTimeout(() => {
      handleGenerateApi();
    }, 1000);
  };

  return (
    <div className="space-y-4">
      {/* Generate API Button */}
      <button
        onClick={handleGenerateApi}
        disabled={loading}
        className={`px-6 py-3 rounded-lg font-medium transition-all ${
          loading
            ? "bg-stone-700 text-stone-400 cursor-not-allowed"
            : "bg-blue-600 hover:bg-blue-700 text-white"
        }`}
      >
        {loading ? "Generating..." : "Generate API"}
      </button>

      {/* Generated API Display */}
      {generatedApi && (
        <div className="bg-stone-900 border border-stone-700 rounded-lg p-4">
          <h3 className="text-lg font-bold text-zinc-300 mb-3">Generated API</h3>
          {generatedApi.api && generatedApi.api.map((api, index) => (
            <div key={index} className="mb-3 last:mb-0">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                <div>
                  <p className="text-sm font-bold text-blue-400">{api.feature}</p>
                  <p className="text-xs text-stone-400 break-all">{api.url}</p>
                  <p className="text-xs text-stone-400">API Key: {api.apiKey}</p>
                </div>
                <button
                  onClick={() => navigator.clipboard.writeText(api.url)}
                  className="bg-stone-700 hover:bg-stone-600 px-3 py-1 rounded text-sm"
                >
                  Copy URL
                </button>
              </div>
            </div>
          ))}
          
          {/* Usage Info */}
          {generatedApi.usageInfo && (
            <div className="mt-4 p-3 bg-stone-800 rounded border border-stone-600">
              <p className="text-sm text-stone-300">
                <span className="font-bold">API Usage:</span> {generatedApi.usageInfo.apiUsageCount}/{generatedApi.usageInfo.freeApiLimit}
              </p>
              <p className="text-sm text-stone-300">
                <span className="font-bold">Remaining:</span> {generatedApi.usageInfo.remainingApis}
              </p>
              {generatedApi.usageInfo.warningMessage && (
                <p className="text-sm text-yellow-400 mt-2">
                  ⚠️ {generatedApi.usageInfo.warningMessage}
                </p>
              )}
            </div>
          )}
        </div>
      )}

      {/* Payment Modal */}
      <PaymentModal
        isOpen={showPaymentModal}
        onClose={() => setShowPaymentModal(false)}
        paymentData={paymentData}
        onPaymentSuccess={handlePaymentSuccess}
        title="API Generation - Payment Required"
      />
    </div>
  );
};

// Example usage in your existing components:
/*
// In your existing BeginnerRegister.jsx, replace the API generation logic with:

import ApiGenerationWithPayment from "../../../examples/ApiGenerationWithPayment";

// Then in your component:
const handleApiGenerated = (apiData) => {
  setapi(apiData.api);
  setApiURL(apiData.api[0]?.url || "");
  setHandleSawApi(true);
};

// Replace your "Generate API" button section with:
<ApiGenerationWithPayment 
  features={["register"]}
  onApiGenerated={handleApiGenerated}
/>
*/

export default ApiGenerationWithPayment;
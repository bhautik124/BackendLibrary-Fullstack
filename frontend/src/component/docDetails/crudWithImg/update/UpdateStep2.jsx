import React, { useState } from "react";
import { FaCopy } from "react-icons/fa";
import { LuStepForward } from "react-icons/lu";
import CopyToast from "../../copyCodeToast/CopyToast";
import useApiGenerateCheckAuth from "../../../userLoginPage/protectedRoute/ForApiGenereateCheckAuth";
import { Navigate } from "react-router-dom";
import axios from "axios";
import PaymentService from "../../../payment/PaymentService";
import PaymentModal from "../../../payment/PaymentModal";
import UpdateStep3 from "./UpdateStep3";

const UpdateStep2 = () => {
  const isAuth = useApiGenerateCheckAuth(); // Use the custom hook
  const [copiedApi, setCopiedApi] = useState(false);
  const [copiedToken, setCopiedToken] = useState(false);
  const [copiedApikey, setCopiedApikey] = useState(false);
  const [handleSawApi, setHandleSawApi] = useState(false);
  const [handleSawTokenAndApikey, sethandleSawTokenAndApikey] = useState(false);
  const [apiSawLoading, setApiSawLoading] = useState(false);
  const [tokenAndApikeySawLoading, setTokenAndApikeySawLoading] =
    useState(false);
  const [apiURL, setApiURL] = useState("");
  const [token, settoken] = useState("");
  const [apikey, setapikey] = useState("");
  const [error, setError] = useState(null);
  const [redirectToLogin, setRedirectToLogin] = useState(false);
  
  // Payment related states
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [paymentData, setPaymentData] = useState(null);

  const maskSensitiveData = (data) => {
    if (!data || data.length < 10) return data;
    return `${data.slice(0, 6)}*****${data.slice(-4)}`;
  };

  const handleCopyApi = () => {
    if (apiURL) {
      navigator.clipboard.writeText(apiURL);
      setCopiedApi(true);
      setTimeout(() => setCopiedApi(false), 2000);
    }
  };

  const handleCopyToken = () => {
    if (token) {
      navigator.clipboard.writeText(token);
      setCopiedToken(true);
      setTimeout(() => setCopiedToken(false), 2000);
    }
  };

  const handleCopyApikey = () => {
    if (apikey) {
      navigator.clipboard.writeText(apikey);
      setCopiedApikey(true);
      setTimeout(() => setCopiedApikey(false), 2000);
    }
  };

  const SawApi = async () => {
    if (isAuth === null) {
      setError("Authentication check is still loading. Please try again.");
      return;
    }

    if (!isAuth) {
      setRedirectToLogin(true); // Trigger redirect to login page
      return;
    }

    setApiSawLoading(true);
    setHandleSawApi(true);
    setError(null);

    try {
      const result = await PaymentService.generateAPIWithPaymentCheck("crud-with-image-update");
      
      if (result.requiresPayment) {
        setPaymentData(result.paymentData);
        setShowPaymentModal(true);
        setApiSawLoading(false);
        return;
      }

      if (result.success) {
        const { api } = result.data;
        if (api && api.length > 0 && api[0].url) {
          setApiURL(api[0].url); // Set only the URL from the response
        } else {
          setError("No API URL returned from the server.");
        }
      } else {
        setError(result.error || "Failed to generate API key.");
      }
    } catch (err) {
      console.error(err);
      setError("Failed to generate API key.");
    } finally {
      setApiSawLoading(false);
    }
  };

  const SawTokenAndApikey = async () => {
    if (isAuth === null) {
      setError("Authentication check is still loading. Please try again.");
      return;
    }

    if (!isAuth) {
      setRedirectToLogin(true); // Trigger redirect to login page
      return;
    }

    setTokenAndApikeySawLoading(true);
    sethandleSawTokenAndApikey(true);
    setError(null);

    try {
      const result = await PaymentService.generateAPIWithPaymentCheck("crud-with-image-update");
      
      if (result.requiresPayment) {
        setPaymentData(result.paymentData);
        setShowPaymentModal(true);
        setTokenAndApikeySawLoading(false);
        return;
      }

      if (result.success) {
        const { api } = result.data;
        if (api && api.length > 0 && api[0].token && api[0].apiKey) {
          settoken(api[0].token);
          setapikey(api[0].apiKey);
        } else {
          setError("No token or API key returned from the server.");
        }
      } else {
        setError(result.error || "Failed to generate token and API key.");
      }
    } catch (err) {
      console.error(err);
      setError("Failed to generate token and API key.");
    } finally {
      setTokenAndApikeySawLoading(false);
    }
  };

  // Payment handlers
  const handlePaymentSuccess = () => {
    setShowPaymentModal(false);
    // Retry the API generation after successful payment
    if (apiSawLoading) {
      SawApi();
    } else if (tokenAndApikeySawLoading) {
      SawTokenAndApikey();
    }
  };

  const handlePaymentClose = () => {
    setShowPaymentModal(false);
    setPaymentData(null);
  };

  // Redirect to login if needed
  if (redirectToLogin) {
    return <Navigate to="/user-login" />;
  }

  return (
    <div>
      <div className="mb-3 mt-8">
        <div className="flex items-center gap-2">
          <LuStepForward className="text-xl sm:text-2xl text-zinc-100" />
          <h2 className="text-zinc-100 text-xl sm:text-2xl font-semibold">
            STEP 2 – Update Data as Needed
          </h2>
        </div>
      </div>

      <div className="mt-8 p-4 sm:p-6 max-w-6xl mx-auto border border-stone-700 rounded-md shadow">
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-3">
          <div className="flex items-center gap-3">
            <LuStepForward className="text-xl sm:text-xl" />
            <p className="text-base sm:text-lg">
              Generate your{" "}
              <code className="bg-stone-800 text-zinc-200 px-2 py-1 rounded text-xs sm:text-sm font-mono">
                CRUD Update with Images
              </code>{" "}
              API endpoint to update data in the selected model.
            </p>
          </div>

          <button
            onClick={SawApi}
            className="text-sm sm:text-base md:text-lg font-bold border border-stone-700 bg-stone-800 hover:bg-stone-700 transition rounded-full px-3 py-1 sm:py-0 w-fit self-center"
          >
            Generate
          </button>
        </div>

        {handleSawApi && (
          <div className="mt-6 flex justify-center">
            <div className="w-full sm:w-fit max-w-full text-sm sm:text-lg inline-flex items-center gap-2 sm:gap-4 border border-stone-700 rounded-md px-3 sm:px-4 py-2 justify-center overflow-x-auto">
              {apiSawLoading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-t-transparent border-white rounded-full animate-spin"></div>
                  <p>Generating your new API. Please wait...</p>
                </div>
              ) : error ? (
                <p className="text-red-500">{error}</p>
              ) : (
                <>
                  <p className="whitespace-nowrap overflow-x-auto max-w-[80vw] sm:max-w-none">
                    {apiURL || "No API URL generated."}
                  </p>
                  {apiURL && (
                    <FaCopy
                      onClick={handleCopyApi}
                      className="cursor-pointer hover:text-zinc-300 active:scale-95 transition-transform flex-shrink-0"
                    />
                  )}
                </>
              )}
            </div>
          </div>
        )}

        <div className="mt-7">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-3">
            <div className="flex items-center gap-3">
              <LuStepForward className="text-xl sm:text-xl" />
              <p className="text-base sm:text-lg">
                Generate the token and API key for authentication.
              </p>
            </div>
            <button
              onClick={SawTokenAndApikey}
              className="text-sm sm:text-base md:text-lg font-bold border border-stone-700 bg-stone-800 hover:bg-stone-700 transition rounded-full px-3 py-1 sm:py-0 w-fit self-center"
            >
              Generate
            </button>
          </div>
        </div>

        {handleSawTokenAndApikey && (
          <div className="mt-6 flex justify-center">
            <div className="w-full sm:w-fit max-w-full text-sm sm:text-lg flex flex-col gap-3 border border-stone-700 rounded-md px-4 py-3 sm:px-6 sm:py-4 overflow-x-auto bg-black/20">
              {tokenAndApikeySawLoading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-t-transparent border-white rounded-full animate-spin"></div>
                  <p>Generating your token and API key. Please wait...</p>
                </div>
              ) : error ? (
                <p className="text-red-500">{error}</p>
              ) : (
                <>
                  <div className="flex items-center justify-between gap-4">
                    <p className="text-white whitespace-nowrap overflow-auto">
                      Token:
                      <span className="text-stone-400 ml-2">
                        {token
                          ? maskSensitiveData(token)
                          : "No token generated."}
                      </span>
                    </p>
                    {token && (
                      <FaCopy
                        onClick={handleCopyToken}
                        className="cursor-pointer hover:text-zinc-300 active:scale-95 transition-transform flex-shrink-0"
                      />
                    )}
                  </div>
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-white whitespace-nowrap overflow-auto">
                      API Key:
                      <span className="text-stone-400 ml-2">
                        {apikey || "No API key generated."}
                      </span>
                    </p>
                    {apikey && (
                      <FaCopy
                        onClick={handleCopyApikey}
                        className="cursor-pointer hover:text-zinc-300 active:scale-95 transition-transform flex-shrink-0"
                      />
                    )}
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </div>

      <CopyToast show={copiedApi} />
      <CopyToast show={copiedToken} />
      <CopyToast show={copiedApikey} />
      
      {/* Payment Modal */}
      <PaymentModal
        isOpen={showPaymentModal}
        onClose={handlePaymentClose}
        paymentData={paymentData}
        onPaymentSuccess={handlePaymentSuccess}
        title="Payment Required - CRUD Update with Images API"
      />

      <UpdateStep3 />
    </div>
  );
};

export default UpdateStep2;

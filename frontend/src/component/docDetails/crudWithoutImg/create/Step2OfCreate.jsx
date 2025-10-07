import React, { useState } from "react";
import { FaCopy } from "react-icons/fa";
import { LuStepForward } from "react-icons/lu";
import CopyToast from "../../copyCodeToast/CopyToast";
import Step3OfCreate from "./Step3OfCreate";
import useApiGenerateCheckAuth from "../../../userLoginPage/protectedRoute/ForApiGenereateCheckAuth";
import { Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchDataWithoutImg } from "../../../../store/action/FetchDataWithoutImg";

const Step2OfCreate = () => {
  const isAuth = useApiGenerateCheckAuth();
  const [copiedApi, setCopiedApi] = useState(false);
  const [copiedToken, setCopiedToken] = useState(false);
  const [copiedApikey, setCopiedApikey] = useState(false);
  const [handleShowData, setHandleShowData] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [redirectToLogin, setRedirectToLogin] = useState(false);

  // Redux store
  const dispatch = useDispatch();
  const { url, apiKey, token } = useSelector((state) => state.withoutImg);

  const maskSensitiveData = (data) => {
    if (!data || data.length < 10) return data;
    return `${data.slice(0, 6)}*****${data.slice(-4)}`;
  };

  const handleCopyApi = () => {
    if (url) {
      navigator.clipboard.writeText(url);
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
    if (apiKey) {
      navigator.clipboard.writeText(apiKey);
      setCopiedApikey(true);
      setTimeout(() => setCopiedApikey(false), 2000);
    }
  };

  const generateAllData = async () => {
    if (isAuth === null) {
      setError("Authentication check is still loading. Please try again.");
      return;
    }

    if (!isAuth) {
      setRedirectToLogin(true);
      return;
    }

    setIsLoading(true);
    setHandleShowData(true);
    setError(null);

    try {
      const response = await dispatch(fetchDataWithoutImg());
      if (
        !response.api?.[0]?.url ||
        !response.api?.[0]?.token ||
        !response.api?.[0]?.apiKey
      ) {
        setError("Failed to generate API URL, token, or API key.");
      }
    } catch (err) {
      console.error(err);
      const errorMessage = err.message || "Failed to generate data.";
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  if (redirectToLogin) {
    return <Navigate to="/user-login" />;
  }

  return (
    <div>
      <div className="mb-3 mt-4 sm:mt-8">
        <div className="flex items-center gap-2">
          <LuStepForward className="text-lg sm:text-2xl text-zinc-100" />
          <h2 className="text-zinc-100 text-lg sm:text-2xl font-semibold">
            STEP 2 – Fetch All Created Models
          </h2>
        </div>
      </div>

      <div className="mt-4 sm:mt-8 p-3 sm:p-4 md:p-6 max-w-full sm:max-w-4xl md:max-w-6xl mx-auto border border-stone-700 rounded-md shadow">
        <h2 className="text-xl sm:text-2xl font-black text-zinc-200 mb-3 sm:mb-4">
          Generate API, Token, and API Key
        </h2>

        <div className="mt-4 sm:mt-8">
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-3">
            <div className="flex items-center gap-2 sm:gap-3">
              <LuStepForward className="text-lg sm:text-xl" />
              <p className="text-sm sm:text-lg">
                Generate your{" "}
                <code className="bg-stone-800 text-zinc-200 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded text-xs sm:text-sm font-mono">
                  CRUD Get All Models
                </code>{" "}
                API endpoint, token, and API key.
              </p>
            </div>
            <button
              onClick={generateAllData}
              className="text-sm sm:text-base md:text-lg font-bold border border-stone-700 bg-stone-800 hover:bg-stone-700 transition rounded-full px-2 sm:px-3 py-0.5 sm:py-1 w-fit self-center"
            >
              Generate
            </button>
          </div>
        </div>

        {handleShowData && (
          <div className="mt-4 sm:mt-6 flex justify-center">
            <div className="w-full sm:w-fit max-w-full text-xs sm:text-base md:text-lg flex flex-col gap-2 sm:gap-3 border border-stone-700 rounded-md px-3 sm:px-4 md:px-6 py-2 sm:py-3 md:py-4 overflow-x-auto bg-black/20">
              {isLoading ? (
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <div className="w-3 sm:w-4 h-3 sm:h-4 border-2 border-t-transparent border-white rounded-full animate-spin"></div>
                  <p>Generating your API, token, and API key. Please wait...</p>
                </div>
              ) : error ? (
                <p className="text-red-500">{error}</p>
              ) : (
                <>
                  <div className="flex items-center justify-between gap-2 sm:gap-4">
                    <p className="text-white whitespace-nowrap overflow-auto max-w-[80vw] sm:max-w-none">
                      API URL:{" "}
                      <span className="text-stone-400 ml-1 sm:ml-2">
                        {url || "No API URL generated."}
                      </span>
                    </p>
                    {url && (
                      <FaCopy
                        onClick={handleCopyApi}
                        className="cursor-pointer hover:text-zinc-300 active:scale-95 transition-transform flex-shrink-0"
                      />
                    )}
                  </div>
                  <div className="flex items-center justify-between gap-2 sm:gap-4">
                    <p className="text-white whitespace-nowrap overflow-auto">
                      Token:{" "}
                      <span className="text-stone-400 ml-1 sm:ml-2">
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
                  <div className="flex items-center justify-between gap-2 sm:gap-4">
                    <p className="text-white whitespace-nowrap overflow-auto">
                      API Key:{" "}
                      <span className="text-stone-400 ml-1 sm:ml-2">
                        {apiKey
                          ? maskSensitiveData(apiKey)
                          : "No API key generated."}
                      </span>
                    </p>
                    {apiKey && (
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
      <Step3OfCreate />
    </div>
  );
};

export default Step2OfCreate;

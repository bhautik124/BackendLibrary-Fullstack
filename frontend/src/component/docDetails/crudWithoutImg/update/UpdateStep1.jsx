import React, { useState } from "react";
import { FaCopy } from "react-icons/fa";
import { GoGoal } from "react-icons/go";
import { FaRegQuestionCircle } from "react-icons/fa";
import { LuStepForward } from "react-icons/lu";
import CopyToast from "../../copyCodeToast/CopyToast";
import UpdateStep2 from "./UpdateStep2";
import useApiGenerateCheckAuth from "../../../userLoginPage/protectedRoute/ForApiGenereateCheckAuth";
import { Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchDataWithoutImg } from "../../../../store/action/FetchDataWithoutImg";

const UpdateStep1 = () => {
  const isAuth = useApiGenerateCheckAuth();
  const [handleShowData, setHandleShowData] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [copiedApi, setCopiedApi] = useState(false);
  const [copiedToken, setCopiedToken] = useState(false);
  const [copiedApikey, setCopiedApikey] = useState(false);
  const [error, setError] = useState(null);
  const [redirectToLogin, setRedirectToLogin] = useState(false);

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
      const errorMessage =
        err.response?.data?.error || "Failed to generate data.";
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  if (redirectToLogin) {
    return <Navigate to="/user-login" />;
  }

  return (
    <div className="pb-40 px-4 sm:px-6 lg:px-8">
      <h1 className="text-zinc-100 text-2xl sm:text-4xl font-bold">
        CRUD Update Process – (2 Steps)
      </h1>

      <div className="mt-5">
        <div className="flex items-center gap-2 mb-3">
          <GoGoal className="text-xl sm:text-2xl text-zinc-100" />
          <h2 className="text-xl sm:text-2xl font-bold text-zinc-100">
            Purpose
          </h2>
        </div>
        <div className="ml-2 sm:ml-10">
          <h3 className="text-md sm:text-md font-semibold mb-2">
            This API allows you to fetch all models and their data to select a
            specific collection and update its details, such as{" "}
            <code className="bg-stone-800 text-zinc-200 px-2 py-1 rounded text-xs sm:text-sm font-mono">
              userList
            </code>{" "}
            or{" "}
            <code className="bg-stone-800 text-zinc-200 px-2 py-1 rounded text-xs sm:text-sm font-mono">
              productList
            </code>
            .
          </h3>
        </div>
      </div>

      <div className="mt-8">
        <div className="flex items-center gap-2 mb-3">
          <FaRegQuestionCircle className="text-xl sm:text-2xl text-zinc-100" />
          <h2 className="text-xl sm:text-2xl font-bold text-zinc-100">
            Important Information
          </h2>
        </div>

        <div className="mb-3 mt-5 sm:ml-10">
          <div className="flex items-start gap-3 mb-4">
            <div className="mt-1">
              <LuStepForward className="text-xl" />
            </div>
            <p className="text-base sm:text-lg">
              This is a two-step process: first, fetch all collections and their
              data using the{" "}
              <code className="bg-stone-800 text-zinc-200 px-2 py-1 rounded text-xs sm:text-sm font-mono">
                CRUD Get All Models
              </code>{" "}
              API, then update the desired data.
            </p>
          </div>
        </div>

        <div className="mb-3 mt-5 sm:ml-10">
          <div className="flex items-start gap-3 mb-4">
            <div className="mt-1">
              <LuStepForward className="text-xl" />
            </div>
            <p className="text-base sm:text-lg">
              You will need the{" "}
              <code className="bg-stone-800 text-zinc-200 px-2 py-1 rounded text-xs sm:text-sm font-mono">
                collection name
              </code>
              , the{" "}
              <code className="bg-stone-800 text-zinc-200 px-2 py-1 rounded text-xs sm:text-sm font-mono">
                ID of the data
              </code>
              to update, and the{" "}
              <code className="bg-stone-800 text-zinc-200 px-2 py-1 rounded text-xs sm:text-sm font-mono">
                new data
              </code>
              .
            </p>
          </div>
        </div>

        <div className="mb-3 mt-5 sm:ml-10">
          <div className="flex items-start gap-3 mb-4">
            <div className="mt-1">
              <LuStepForward className="text-xl" />
            </div>
            <p className="text-base sm:text-lg">
              Save or copy your API URL, token, and API key, as they are
              required for authentication.
            </p>
          </div>
        </div>
      </div>

      <div className="mb-3 mt-8">
        <div className="flex items-center gap-2">
          <LuStepForward className="text-xl sm:text-2xl text-zinc-100" />
          <h2 className="text-zinc-100 text-xl sm:text-2xl font-semibold">
            STEP 1 – Fetch All Created Models and Their Data
          </h2>
        </div>
      </div>

      <div className="mt-8 p-4 sm:p-6 max-w-6xl mx-auto border border-stone-700 rounded-md shadow">
        <h2 className="text-2xl font-black text-zinc-200 mb-4">
          Generate API, Token, and API Key
        </h2>

        <div className="mt-8">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-3">
            <div className="flex items-center gap-3">
              <LuStepForward className="text-xl sm:text-xl" />
              <p className="text-base sm:text-lg">
                Generate your{" "}
                <code className="bg-stone-800 text-zinc-200 px-2 py-1 rounded text-xs sm:text-sm font-mono">
                  CRUD Get All Models
                </code>{" "}
                API endpoint, token, and API key.
              </p>
            </div>
            <button
              onClick={generateAllData}
              className="text-base sm:text-lg font-bold border border-stone-700 bg-stone-800 hover:bg-stone-700 transition rounded-full px-3 py-1 sm:py-0 w-fit self-center"
            >
              Generate
            </button>
          </div>
        </div>

        {handleShowData && (
          <div className="mt-6 flex justify-center">
            <div className="w-full sm:w-fit max-w-full text-sm sm:text-lg flex flex-col gap-3 border border-stone-700 rounded-md px-4 py-3 sm:px-6 sm:py-4 overflow-x-auto bg-black/20">
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-t-transparent border-white rounded-full animate-spin"></div>
                  <p>Generating your API, token, and API key. Please wait...</p>
                </div>
              ) : error ? (
                <p className="text-red-500">{error}</p>
              ) : (
                <>
                  <div className="flex items-center justify-between gap-4">
                    <p className="text-white whitespace-nowrap overflow-auto max-w-[80vw] sm:max-w-none">
                      API URL:{" "}
                      <span className="text-stone-400 ml-2">
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
                  <div className="flex items-center justify-between gap-4">
                    <p className="text-white whitespace-nowrap overflow-auto">
                      Token:{" "}
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
                      API Key:{" "}
                      <span className="text-stone-400 ml-2">
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
      <UpdateStep2 />
    </div>
  );
};

export default UpdateStep1;

// import React, { useState } from "react";
// import { FaCopy } from "react-icons/fa";
// import { TbAlertTriangleFilled } from "react-icons/tb";
// import { GoGoal } from "react-icons/go";
// import { FaRegQuestionCircle } from "react-icons/fa";
// import HowToUseCodePart from "./howToUseCode/HowToUse";
// import CopyToast from "../../copyCodeToast/CopyToast";

// const Logout = () => {
//   // ***************************************
//   // je api aave tene set karvi and then tene handleCopy function ni andar writeText ni andar rakhvi
//   const [api, setapi] = useState(null);
//   const [handleSawApi, setHandleSawApi] = useState(false);
//   const [apiSawLoading, setApiSawLoading] = useState(false);
//   const [apiURL, setApiURL] = useState("");
//   const [copiedApi, setCopiedApi] = useState(false);

//   const handleCopy = () => {
//     navigator.clipboard.writeText(
//       "https://backendlibrary.onrender.com/api/auth/login"
//     );
//     setCopiedApi(true);
//     setTimeout(() => setCopiedApi(false), 2000);
//   };

//   const handleSaw = async () => {
//     setApiSawLoading(true);
//     setHandleSawApi(true); // always show the box now

//     // Simulate API fetch
//     setTimeout(() => {
//       setApiURL("https://backendlibrary.onrender.com/api/auth/login");
//       setApiSawLoading(false);
//     }, 2000);
//   };
//   //*********************************

//   //*********************************
//   // how to use code section
//   const [copied, setCopied] = useState(false);

//   const handleCopyPurposeCode = () => {
//     navigator.clipboard.writeText(HowToUseCodePart);
//     setCopied(true);
//     setTimeout(() => setCopied(false), 2000);
//   };
//   //*********************************

//   return (
//     <div className="pb-40 px-4 sm:px-6 lg:px-8">
//       <h1 className="text-zinc-100 text-2xl sm:text-3xl font-bold mb-4">
//         Logout
//       </h1>

//       {/* api generate and saw api content */}
//       <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-10">
//         <p className="text-base sm:text-lg">
//           To access the API, please click on the "Generate" button.
//         </p>
//         <button
//           onClick={handleSaw}
//           className="text-base sm:text-lg font-bold border border-stone-700 bg-stone-800 hover:bg-stone-700 transition rounded-full px-3 py-1 sm:py-0 w-fit"
//         >
//           Generate
//         </button>
//       </div>
//       {handleSawApi && (
//         <div className="mt-6 sm:mt-10 flex justify-center">
//           <div className="w-full sm:w-fit max-w-full text-sm sm:text-lg inline-flex items-center gap-2 sm:gap-4 border border-stone-700 rounded-md px-3 sm:px-4 py-2 justify-center overflow-x-auto">
//             {apiSawLoading ? (
//               <div className="flex items-center gap-2">
//                 <div className="w-4 h-4 border-2 border-t-transparent border-white rounded-full animate-spin"></div>
//                 <p>Generating your new API. Please wait...</p>
//               </div>
//             ) : (
//               <>
//                 <p className="whitespace-nowrap overflow-x-auto max-w-[80vw] sm:max-w-none">
//                   {apiURL}
//                 </p>
//                 <FaCopy
//                   onClick={handleCopy}
//                   className="cursor-pointer hover:text-zinc-300 active:scale-95 transition-transform flex-shrink-0"
//                 />
//               </>
//             )}
//           </div>
//         </div>
//       )}

//       {/* purpose of this api */}
//       <div className="mt-8 sm:mt-10">
//         <div className="flex items-center gap-2 mb-3">
//           <GoGoal className="text-xl sm:text-2xl text-zinc-100" />
//           <h2 className="text-xl sm:text-2xl font-bold text-zinc-100">
//             Purpose
//           </h2>
//         </div>
//         <div className="ml-2 sm:ml-10">
//           <h3 className="text-md font-semibold mb-2">
//             This API handles user logout by clearing the auth token and ending
//             the session
//           </h3>
//         </div>
//       </div>

//       {/* how to use? */}
//       <div className="mt-8 sm:mt-10">
//         <div className="flex items-center gap-2 mb-3">
//           <FaRegQuestionCircle className="text-xl sm:text-2xl text-zinc-100" />
//           <h2 className="text-xl sm:text-2xl font-bold text-zinc-100">
//             How to Call in Frontend (Example)
//           </h2>
//         </div>

//         <div className="relative inline-block w-full bg-black border border-stone-700 rounded-md p-3 sm:p-5 text-xs sm:text-sm font-mono text-gray-300">
//           <button
//             onClick={handleCopyPurposeCode}
//             className="absolute top-2 right-2 text-gray-400 hover:text-zinc-200 active:scale-95 transition-transform"
//           >
//             <FaCopy />
//           </button>

//           <pre className="overflow-x-auto max-w-full">
//             <code>{HowToUseCodePart}</code>
//           </pre>
//         </div>
//       </div>

//       {/* important notes */}
//       <div className="mt-8 sm:mt-10">
//         <div className="flex items-center gap-2 mb-3">
//           <TbAlertTriangleFilled className="text-yellow-400 text-xl sm:text-2xl" />
//           <h3 className="text-xl sm:text-2xl font-bold text-zinc-100">
//             Important Notes
//           </h3>
//         </div>

//         <div className="ml-2 sm:ml-10">
//           <ul className="list-disc list-inside space-y-1 text-sm sm:text-base">
//             <li>
//               {" "}
//               Logout is handled by sending a POST request from frontend to
//               backend (/api/auth/logout).
//             </li>
//             <li>
//               The backend uses res.clearCookie("token") to remove the JWT from
//               browser cookies.
//             </li>
//             <li>
//               <code className="bg-stone-800 text-zinc-200 px-2 py-1 rounded text-xs sm:text-sm font-mono">
//                 withCredentials: true
//               </code>
//               is required in Axios to include and clear the httpOnly cookie.
//             </li>
//           </ul>
//         </div>
//       </div>
//       <CopyToast show={copied} />
//       <CopyToast show={copiedApi} />
//     </div>
//   );
// };

// export default Logout;

import React, { useState } from "react";
import { FaCopy } from "react-icons/fa";
import { TbAlertTriangleFilled } from "react-icons/tb";
import { GoGoal } from "react-icons/go";
import { FaRegQuestionCircle } from "react-icons/fa";
import HowToUseCodePart from "./howToUseCode/HowToUse";
import CopyToast from "../../copyCodeToast/CopyToast";
import useApiGenerateCheckAuth from "../../../userLoginPage/protectedRoute/ForApiGenereateCheckAuth";
import { Navigate } from "react-router-dom";
import axios from "axios";
import PaymentService from "../../../payment/PaymentService";
import PaymentModal from "../../../payment/PaymentModal";

const Logout = () => {
  const isAuth = useApiGenerateCheckAuth(); // Use the custom hook
  const [apiURL, setApiURL] = useState("");
  const [handleSawApi, setHandleSawApi] = useState(false);
  const [apiSawLoading, setApiSawLoading] = useState(false);
  const [copiedApi, setCopiedApi] = useState(false);
  const [error, setError] = useState(null);
  const [redirectToLogin, setRedirectToLogin] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [paymentData, setPaymentData] = useState(null);

  const handleCopy = () => {
    if (apiURL) {
      navigator.clipboard.writeText(apiURL);
      setCopiedApi(true);
      setTimeout(() => setCopiedApi(false), 2000);
    }
  };

  const handleSaw = async () => {
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
      const result = await PaymentService.generateAPIWithPaymentCheck(["google-auth-logout"]);

      if (result.requiresPayment) {
        setPaymentData(result.paymentData);
        setShowPaymentModal(true);
        setApiSawLoading(false);
        return;
      }

      if (result.success) {
        const { api } = result.data;
        if (api && api.length > 0 && api[0].url) {
          setApiURL(api[0].url);
          setHandleSawApi(true);
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

  // How to use code section
  const [copied, setCopied] = useState(false);

  const handleCopyPurposeCode = () => {
    navigator.clipboard.writeText(HowToUseCodePart);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Payment modal handlers
  const handlePaymentSuccess = () => {
    setShowPaymentModal(false);
    setPaymentData(null);
    // Trigger API generation again
    handleSaw();
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
    <div className="pb-40 px-4 sm:px-6 lg:px-8">
      <h1 className="text-zinc-100 text-2xl sm:text-3xl font-bold mb-4">
        Logout
      </h1>

      {/* API generate and show API content */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-10">
        <p className="text-base sm:text-lg">
          To access the{" "}
          <code className="bg-stone-800 text-zinc-200 px-2 py-1 rounded text-xs sm:text-sm font-mono">
            Google Sign-In Logout API
          </code>
          , please click on the "Generate" button.
        </p>
        <button
          onClick={handleSaw}
          className="text-base sm:text-lg font-bold border border-stone-700 bg-stone-800 hover:bg-stone-700 transition rounded-full px-3 py-1 sm:py-0 w-fit"
        >
          Generate
        </button>
      </div>
      {handleSawApi && (
        <div className="mt-6 sm:mt-10 flex justify-center">
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
                    onClick={handleCopy}
                    className="cursor-pointer hover:text-zinc-300 active:scale-95 transition-transform flex-shrink-0"
                  />
                )}
              </>
            )}
          </div>
        </div>
      )}

      {/* Purpose of this API */}
      <div className="mt-8 sm:mt-10">
        <div className="flex items-center gap-2 mb-3">
          <GoGoal className="text-xl sm:text-2xl text-zinc-100" />
          <h2 className="text-xl sm:text-2xl font-bold text-zinc-100">
            Purpose
          </h2>
        </div>
        <div className="ml-2 sm:ml-10">
          <h3 className="text-md sm:text-md font-semibold mb-2">
            This API handles user logout for Google Sign-In by clearing the
            authentication token from the HTTP-only cookie, ending the user
            session.
          </h3>
        </div>
      </div>

      {/* How to use? */}
      <div className="mt-8 sm:mt-10">
        <div className="flex items-center gap-2 mb-3">
          <FaRegQuestionCircle className="text-xl sm:text-2xl text-zinc-100" />
          <h2 className="text-xl sm:text-2xl font-bold text-zinc-100">
            How to Call in Frontend (Example)
          </h2>
        </div>
        <div className="relative inline-block w-full bg-black border border-stone-700 rounded-md p-3 sm:p-5 text-xs sm:text-sm font-mono text-gray-300">
          <button
            onClick={handleCopyPurposeCode}
            className="absolute top-2 right-2 text-gray-400 hover:text-zinc-200 active:scale-95 transition-transform"
          >
            <FaCopy />
          </button>
          <pre className="overflow-x-auto max-w-full">
            <code>{HowToUseCodePart}</code>
          </pre>
        </div>
      </div>

      {/* Important Notes */}
      <div className="mt-8 sm:mt-10">
        <div className="flex items-center gap-2 mb-3">
          <TbAlertTriangleFilled className="text-yellow-400 text-xl sm:text-2xl" />
          <h3 className="text-xl sm:text-2xl font-bold text-zinc-100">
            Important Notes
          </h3>
        </div>
        <div className="ml-2 sm:ml-10">
          <ul className="list-disc list-inside space-y-1 text-sm sm:text-base">
            <li>
              Logout is handled by sending a POST request to the backend
              <code className="bg-stone-800 text-zinc-200 px-2 py-1 rounded text-xs sm:text-sm font-mono">
                /google-auth-logout
              </code>
              endpoint.
            </li>
            <li>
              The backend uses{" "}
              <code className="bg-stone-800 text-zinc-200 px-2 py-1 rounded text-xs sm:text-sm font-mono">
                res.clearCookie("token")
              </code>{" "}
              to remove the JWT from browser cookies.
            </li>
            <li>
              Use{" "}
              <code className="bg-stone-800 text-zinc-200 px-2 py-1 rounded text-xs sm:text-sm font-mono">
                withCredentials: true
              </code>{" "}
              in Axios to include and clear the HTTP-only cookie.
            </li>
            <li>
              Use try/catch or .catch to handle errors (e.g., network issues).
            </li>
            <li>
              After logout, you can redirect the user to the login page or home.
            </li>
          </ul>
        </div>
      </div>

      <CopyToast show={copied} />
      <CopyToast show={copiedApi} />
      
      {/* Payment Modal */}
      {showPaymentModal && (
        <PaymentModal
          isOpen={showPaymentModal}
          onClose={handlePaymentClose}
          onPaymentSuccess={handlePaymentSuccess}
          paymentData={paymentData}
        />
      )}
    </div>
  );
};

export default Logout;

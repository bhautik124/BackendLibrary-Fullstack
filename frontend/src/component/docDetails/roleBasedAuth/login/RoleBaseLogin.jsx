// import React, { useState } from "react";
// import { FaCopy } from "react-icons/fa";
// import { TbAlertTriangleFilled } from "react-icons/tb";
// import { GoGoal } from "react-icons/go";
// import { FaRegQuestionCircle } from "react-icons/fa";
// import HowToUseCode from "./howToUseSectionCode/HowToUseCode";
// import { FaRegArrowAltCircleRight } from "react-icons/fa";
// import fullCode from "./fullCode/FullCode";
// import { IoMdCloseCircle } from "react-icons/io";
// import CopyToast from "../../copyCodeToast/CopyToast";

// const RoleBaseLogin = () => {
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
//     navigator.clipboard.writeText(HowToUseCode);
//     setCopied(true);
//     setTimeout(() => setCopied(false), 2000);
//   };
//   //*********************************

//   //*********************************
//   //saw full code section
//   const [showModal, setShowModal] = useState(false);
//   const [showFullCode, setShowFullCode] = useState(false);
//   const [copiedFull, setCopiedFull] = useState(false);
//   const handleCopyFullCode = () => {
//     navigator.clipboard.writeText(fullCode);
//     setCopiedFull(true);
//     setTimeout(() => setCopiedFull(false), 2000);
//   };
//   //*********************************

//   return (
//     <div className="pb-40 px-4 sm:px-6 lg:px-8">
//       <h1 className="text-zinc-100 text-2xl sm:text-3xl font-bold mb-4">
//         Login
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
//           <h3 className="text-md sm:text-md font-semibold mb-2">
//             This API allows a registered user to log in by verifying their
//             credentials{" "}
//             <code className="bg-stone-800 text-zinc-200 px-2 py-1 rounded text-xs sm:text-sm font-mono">
//               email
//             </code>{" "}
//             ,{" "}
//             <code className="bg-stone-800 text-zinc-200 px-2 py-1 rounded text-xs sm:text-sm font-mono">
//               password
//             </code>{" "}
//             and{" "}
//             <code className="bg-stone-800 text-zinc-200 px-2 py-1 rounded text-xs sm:text-sm font-mono">
//               role
//             </code>{" "}
//             .
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
//             <code>{HowToUseCode}</code>
//           </pre>
//         </div>
//         <div className="mt-4 ml-1 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
//           <div className="flex items-center gap-2">
//             <FaRegArrowAltCircleRight className="text-white text-lg" />
//             <p className="text-sm sm:text-md font-semibold text-white">
//               Want the complete version with frontend included?
//             </p>
//           </div>

//           <button
//             className="text-sm border border-stone-600 px-3 py-1 rounded hover:bg-stone-800 transition text-white w-fit"
//             onClick={() => setShowModal(true)}
//           >
//             Show Full Code
//           </button>

//           {showModal && (
//             <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm p-4">
//               <div className="relative w-full max-w-4xl max-h-[80vh] overflow-y-auto bg-zinc-900 border border-stone-700 rounded-lg p-4 sm:p-5 shadow-xl">
//                 {/* Header */}
//                 <div className="flex justify-between items-center mb-4">
//                   <span className="text-zinc-100 text-sm sm:text-md">
//                     This code contains React + Tailwind
//                   </span>
//                   <div className="flex items-center gap-4">
//                     <FaCopy
//                       onClick={handleCopyFullCode}
//                       className="text-zinc-100 cursor-pointer text-lg active:scale-95 transition-transform"
//                       title="Copy Code"
//                     />
//                     <IoMdCloseCircle
//                       onClick={() => {
//                         setShowModal(false);
//                         setShowFullCode(false);
//                       }}
//                       className="text-zinc-100 cursor-pointer text-2xl font-bold"
//                       title="Close"
//                     />
//                   </div>
//                 </div>

//                 <div className="mb-2 border border-stone-700 rounded-md px-3 sm:px-4 py-1 sm:py-2 text-xs sm:text-sm text-zinc-100">
//                   npm install axios react-icons
//                 </div>

//                 {/* Code */}
//                 <div className="bg-black border border-stone-700 rounded-md p-3 sm:p-4 text-xs sm:text-sm font-mono text-gray-300">
//                   <pre className="overflow-x-auto max-w-full whitespace-pre-wrap">
//                     <code>
//                       {showFullCode
//                         ? fullCode
//                         : fullCode.slice(0, 500) + "\n..."}
//                     </code>
//                   </pre>
//                 </div>

//                 {/* Show Full Code button */}
//                 {!showFullCode && (
//                   <div className="mt-4 flex justify-end">
//                     <button
//                       className="text-sm border border-stone-600 px-3 py-1 rounded hover:bg-stone-800 transition text-white"
//                       onClick={() => setShowFullCode(true)}
//                     >
//                       Show Full Code
//                     </button>
//                   </div>
//                 )}
//               </div>
//             </div>
//           )}
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
//             <li> User provides email, password, and role.</li>
//             <li className="mt-2">
//               Always use:{" "}
//               <code className="bg-stone-800 text-zinc-200 px-2 py-1 rounded text-xs sm:text-sm font-mono">
//                 withCredentials: true
//               </code>
//             </li>
//           </ul>
//         </div>
//       </div>
//       <CopyToast show={copied} />
//       <CopyToast show={copiedFull} />
//       <CopyToast show={copiedApi} />
//     </div>
//   );
// };

// export default RoleBaseLogin;

import React, { useState } from "react";
import { FaCopy } from "react-icons/fa";
import { TbAlertTriangleFilled } from "react-icons/tb";
import { GoGoal } from "react-icons/go";
import { FaRegQuestionCircle } from "react-icons/fa";
import { FaRegArrowAltCircleRight } from "react-icons/fa";
import { IoMdCloseCircle } from "react-icons/io";
import HowToUseCode from "./howToUseSectionCode/HowToUseCode";
import fullCode from "./fullCode/FullCode";
import FullCodeUI1 from "./fullCode/FullCodeUI1";
import FullCodeUI2 from "./fullCode/FullCodeUI2";
import FullCodeUI3 from "./fullCode/FullCodeUI3";
import CopyToast from "../../copyCodeToast/CopyToast";
import useApiGenerateCheckAuth from "../../../userLoginPage/protectedRoute/ForApiGenereateCheckAuth";
import { Navigate } from "react-router-dom";
import axios from "axios";
import PaymentService from "../../../payment/PaymentService";
import PaymentModal from "../../../payment/PaymentModal";

const RoleBaseLogin = () => {
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
      const result = await PaymentService.generateAPIWithPaymentCheck(["role-based-login"]);

      if (result.requiresPayment) {
        // Show payment modal
        setPaymentData(result.paymentData);
        setShowPaymentModal(true);
        setApiSawLoading(false);
        return;
      }

      if (result.success) {
        // API generated successfully
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
    navigator.clipboard.writeText(HowToUseCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Full code section
  const [showModal, setShowModal] = useState(false);
  const [showFullCode, setShowFullCode] = useState(false);
  const [copiedFull, setCopiedFull] = useState(false);
  const [selectedUI, setSelectedUI] = useState("original");

  const handleCopyFullCode = () => {
    const codeMap = {
      original: fullCode,
      ui1: FullCodeUI1,
      ui2: FullCodeUI2,
      ui3: FullCodeUI3
    };
    navigator.clipboard.writeText(codeMap[selectedUI]);
    setCopiedFull(true);
    setTimeout(() => setCopiedFull(false), 2000);
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
        Login
      </h1>

      {/* API generate and show API content */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-10">
        <p className="text-base sm:text-lg">
          To access the{" "}
          <code className="bg-stone-800 text-zinc-200 px-2 py-1 rounded text-xs sm:text-sm font-mono">
            Role-Based Login API
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
            This API allows a registered user to log in by verifying their
            credentials (
            <code className="bg-stone-800 text-zinc-200 px-2 py-1 rounded text-xs sm:text-sm font-mono">
              email
            </code>
            ,{" "}
            <code className="bg-stone-800 text-zinc-200 px-2 py-1 rounded text-xs sm:text-sm font-mono">
              password
            </code>
            , and{" "}
            <code className="bg-stone-800 text-zinc-200 px-2 py-1 rounded text-xs sm:text-sm font-mono">
              role
            </code>
            ) and returns a secure HTTP-only cookie with a JWT token upon
            successful authentication.
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
            <code>{HowToUseCode}</code>
          </pre>
        </div>
        <div className="mt-4 ml-1 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
          <div className="flex items-center gap-2">
            <FaRegArrowAltCircleRight className="text-white text-lg" />
            <p className="text-sm sm:text-md font-semibold text-white">
              Want the complete version with frontend included?
            </p>
          </div>
          <button
            className="text-sm border border-stone-600 px-3 py-1 rounded hover:bg-stone-800 transition text-white w-fit"
            onClick={() => setShowModal(true)}
          >
            Show Full Code
          </button>
        </div>
      </div>

      {/* Enhanced UI Selection Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 backdrop-blur-sm p-4">
          <div className="relative w-full max-w-6xl max-h-[85vh] overflow-y-auto bg-gradient-to-br from-zinc-900 to-zinc-800 border border-stone-700 rounded-xl p-6 shadow-2xl">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
              <div>
                <h3 className="text-zinc-100 text-xl font-bold mb-1">Role-Based Login Complete Code</h3>
                <span className="text-zinc-400 text-sm">React + Tailwind CSS + Axios + Role-Based Authentication</span>
              </div>
              <div className="flex items-center gap-4">
                <FaCopy
                  onClick={handleCopyFullCode}
                  className="text-zinc-100 cursor-pointer text-xl hover:text-zinc-300 active:scale-95 transition-all duration-200"
                  title="Copy Selected Code"
                />
                <IoMdCloseCircle
                  onClick={() => {
                    setShowModal(false);
                    setShowFullCode(false);
                    setSelectedUI("original");
                  }}
                  className="text-zinc-100 cursor-pointer text-2xl hover:text-zinc-300"
                  title="Close"
                />
              </div>
            </div>

            {/* UI Selection Buttons */}
            <div className="mb-6">
              <h4 className="text-zinc-200 font-semibold mb-3">Choose your login UI design:</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <button
                  onClick={() => setSelectedUI("original")}
                  className={`px-4 py-3 rounded-lg border transition-all duration-200 ${
                    selectedUI === "original"
                      ? "bg-blue-600 border-blue-500 text-white"
                      : "bg-zinc-800 border-zinc-600 text-zinc-300 hover:bg-zinc-700"
                  }`}
                >
                  <div className="text-sm font-medium">Classic</div>
                  <div className="text-xs opacity-75">Clean & Professional</div>
                </button>
                <button
                  onClick={() => setSelectedUI("ui1")}
                  className={`px-4 py-3 rounded-lg border transition-all duration-200 ${
                    selectedUI === "ui1"
                      ? "bg-gradient-to-br from-cyan-600 to-blue-600 border-cyan-500 text-white"
                      : "bg-zinc-800 border-zinc-600 text-zinc-300 hover:bg-zinc-700"
                  }`}
                >
                  <div className="text-sm font-medium">Neural</div>
                  <div className="text-xs opacity-75">Biometric Access</div>
                </button>
                <button
                  onClick={() => setSelectedUI("ui2")}
                  className={`px-4 py-3 rounded-lg border transition-all duration-200 ${
                    selectedUI === "ui2"
                      ? "bg-gradient-to-br from-purple-600 to-pink-600 border-purple-500 text-white"
                      : "bg-zinc-800 border-zinc-600 text-zinc-300 hover:bg-zinc-700"
                  }`}
                >
                  <div className="text-sm font-medium">Royal</div>
                  <div className="text-xs opacity-75">Palace Gates</div>
                </button>
                <button
                  onClick={() => setSelectedUI("ui3")}
                  className={`px-4 py-3 rounded-lg border transition-all duration-200 ${
                    selectedUI === "ui3"
                      ? "bg-gradient-to-br from-emerald-600 to-green-600 border-emerald-500 text-white"
                      : "bg-zinc-800 border-zinc-600 text-zinc-300 hover:bg-zinc-700"
                  }`}
                >
                  <div className="text-sm font-medium">Eco</div>
                  <div className="text-xs opacity-75">Forest Sanctuary</div>
                </button>
              </div>
            </div>

            {/* Package Installation */}
            <div className="mb-4 border border-stone-700 rounded-md px-4 py-2 text-sm text-zinc-100 bg-zinc-800">
              npm install axios react-icons
            </div>

            {/* Code Display */}
            <div className="bg-black border border-stone-700 rounded-lg p-4 text-xs font-mono text-gray-300">
              <pre className="overflow-x-auto max-w-full whitespace-pre-wrap">
                <code>
                  {(() => {
                    const codeMap = {
                      original: fullCode,
                      ui1: FullCodeUI1,
                      ui2: FullCodeUI2,
                      ui3: FullCodeUI3
                    };
                    const currentCode = codeMap[selectedUI];
                    return showFullCode ? currentCode : currentCode.slice(0, 800) + "\n\n// ... (click Show Complete Code to see full implementation)";
                  })()}
                </code>
              </pre>
            </div>

            {/* Show Full Code Button */}
            {!showFullCode && (
              <div className="mt-4 flex justify-end">
                <button
                  className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg transition-all duration-200 font-medium"
                  onClick={() => setShowFullCode(true)}
                >
                  Show Complete Code
                </button>
              </div>
            )}
          </div>
        </div>
      )}

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
              Login requires{" "}
              <code className="bg-stone-800 text-zinc-200 px-2 py-1 rounded text-xs sm:text-sm font-mono">
                email
              </code>
              ,{" "}
              <code className="bg-stone-800 text-zinc-200 px-2 py-1 rounded text-xs sm:text-sm font-mono">
                password
              </code>
              , and{" "}
              <code className="bg-stone-800 text-zinc-200 px-2 py-1 rounded text-xs sm:text-sm font-mono">
                role
              </code>{" "}
              to be sent to the backend.
            </li>
            <li>Backend validates credentials using Joi schema.</li>
            <li>
              Use{" "}
              <code className="bg-stone-800 text-zinc-200 px-2 py-1 rounded text-xs sm:text-sm font-mono">
                withCredentials: true
              </code>{" "}
              to include the HTTP-only cookie in API requests.
            </li>
            <li>
              A JWT token is returned in a secure HTTP-only cookie upon
              successful login.
            </li>
            <li>
              Use try/catch or .catch to handle errors (e.g., invalid
              credentials, network issues).
            </li>
          </ul>
        </div>
      </div>

      <CopyToast show={copied} />
      <CopyToast show={copiedFull} />
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

export default RoleBaseLogin;

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

// const BeginnerLogin = () => {
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
//             Use this API to log in a user from your frontend — no backend code
//             is required. The backend handles everything: validation, password
//             check, token generation, and secure cookie storage.
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
//             <li>API returns a JWT token in an HTTP-only cookie.</li>
//             <li>
//               You won't be able to access the token manually in JavaScript.
//             </li>
//             <li>
//               Token is automatically sent with future requests (e.g., for
//               protected routes).
//             </li>
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

// export default BeginnerLogin;

import React, { useState } from "react";
import { FaCopy } from "react-icons/fa";
import { TbAlertTriangleFilled } from "react-icons/tb";
import { GoGoal } from "react-icons/go";
import { FaRegQuestionCircle } from "react-icons/fa";
import HowToUseCode from "./howToUseSectionCode/HowToUseCode";
import { FaRegArrowAltCircleRight } from "react-icons/fa";
import fullCode from "./fullCode/FullCode";
import { IoMdCloseCircle } from "react-icons/io";
import CopyToast from "../../copyCodeToast/CopyToast";
import useApiGenerateCheckAuth from "../../../userLoginPage/protectedRoute/ForApiGenereateCheckAuth";
import { Navigate } from "react-router-dom";
import axios from "axios";

const BeginnerLogin = () => {
  const isAuth = useApiGenerateCheckAuth(); // Use the custom hook
  const [apiURL, setApiURL] = useState("");
  const [handleSawApi, setHandleSawApi] = useState(false);
  const [apiSawLoading, setApiSawLoading] = useState(false);
  const [copiedApi, setCopiedApi] = useState(false);
  const [error, setError] = useState(null);
  const [redirectToLogin, setRedirectToLogin] = useState(false);

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
      const response = await axios.post(
        "https://backendlibrary-fullstack-backend.onrender.com/api/generate-key",
        { feature: "login" },
        { withCredentials: true }
      );

      const { api } = response.data;
      if (api && api.length > 0 && api[0].url) {
        setApiURL(api[0].url); // Set only the URL from the response
      } else {
        setError("No API URL returned from the server.");
      }
    } catch (err) {
      console.error(err);
      const errorMessage =
        err.response?.data?.error || "Failed to generate API key.";
      setError(errorMessage);
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

  const handleCopyFullCode = () => {
    navigator.clipboard.writeText(fullCode);
    setCopiedFull(true);
    setTimeout(() => setCopiedFull(false), 2000);
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
          To access the API, please click on the "Generate" button.
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
            Use this API to log in a user from your frontend — no backend code
            is required. The backend handles everything: validation, password
            check, token generation, and secure cookie storage.
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

      {/* Show Full Code Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm p-4">
          <div className="relative w-full max-w-4xl max-h-[80vh] overflow-y-auto bg-zinc-900 border border-stone-700 rounded-lg p-4 sm:p-5 shadow-xl">
            <div className="flex justify-between items-center mb-4">
              <span className="text-zinc-100 text-sm sm:text-md">
                This code contains React + Tailwind
              </span>
              <div className="flex items-center gap-4">
                <FaCopy
                  onClick={handleCopyFullCode}
                  className="text-zinc-100 cursor-pointer text-lg active:scale-95 transition-transform"
                  title="Copy Code"
                />
                <IoMdCloseCircle
                  onClick={() => {
                    setShowModal(false);
                    setShowFullCode(false);
                  }}
                  className="text-zinc-100 cursor-pointer text-2xl font-bold"
                  title="Close"
                />
              </div>
            </div>
            <div className="mb-2 border border-stone-700 rounded-md px-3 sm:px-4 py-1 sm:py-2 text-xs sm:text-sm text-zinc-100">
              npm install axios react-icons
            </div>
            <div className="bg-black border border-stone-700 rounded-md p-3 sm:p-4 text-xs sm:text-sm font-mono text-gray-300">
              <pre className="overflow-x-auto max-w-full whitespace-pre-wrap">
                <code>
                  {showFullCode ? fullCode : fullCode.slice(0, 500) + "\n..."}
                </code>
              </pre>
            </div>
            {!showFullCode && (
              <div className="mt-4 flex justify-end">
                <button
                  className="text-sm border border-stone-600 px-3 py-1 rounded hover:bg-stone-800 transition text-white"
                  onClick={() => setShowFullCode(true)}
                >
                  Show Full Code
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
            <li>API returns a JWT token in an HTTP-only cookie.</li>
            <li>
              You won't be able to access the token manually in JavaScript.
            </li>
            <li>
              Token is automatically sent with future requests (e.g., for
              protected routes).
            </li>
            <li>
              Always use{" "}
              <code className="bg-stone-800 text-zinc-200 px-2 py-1 rounded text-xs sm:text-sm font-mono">
                withCredentials: true
              </code>{" "}
              otherwise the cookie won't be saved.
            </li>
            <li>
              Use try/catch or .catch to handle validation errors (e.g., invalid
              credentials).
            </li>
          </ul>
        </div>
      </div>

      <CopyToast show={copied} />
      <CopyToast show={copiedFull} />
      <CopyToast show={copiedApi} />
    </div>
  );
};

export default BeginnerLogin;

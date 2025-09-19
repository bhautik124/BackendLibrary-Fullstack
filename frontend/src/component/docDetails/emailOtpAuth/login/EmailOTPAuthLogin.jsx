// import React, { useState } from "react";
// import { FaCopy } from "react-icons/fa";
// import { TbAlertTriangleFilled } from "react-icons/tb";
// import { GoGoal } from "react-icons/go";
// import { FaRegQuestionCircle } from "react-icons/fa";
// import { FaRegArrowAltCircleRight } from "react-icons/fa";
// import fullCode from "./fullCode/FullCode";
// import { IoMdCloseCircle } from "react-icons/io";
// import HowToUseCodeStep1 from "./howToUseSectionCode/HowToUseCodeStep1";
// import HowToUseCodeStep2 from "./howToUseSectionCode/HowToUseCodeStep2";
// import HowToUseCodeStep3 from "./howToUseSectionCode/HowToUseCodeStep3";
// import { LuStepForward } from "react-icons/lu";
// import CopyToast from "../../copyCodeToast/CopyToast";

// const EmailOTPAuthLogin = () => {
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
//   // how to use code section step-1
//   const [copied, setCopied] = useState(false);

//   const handleCopyPurposeCode = () => {
//     navigator.clipboard.writeText(HowToUseCodeStep1);
//     setCopied(true);
//     setTimeout(() => setCopied(false), 2000);
//   };
//   //*********************************

//   //*********************************
//   // how to use code section step-2
//   const [copied2, setCopied2] = useState(false);

//   const handleCopyPurposeCode2 = () => {
//     navigator.clipboard.writeText(HowToUseCodeStep2);
//     setCopied2(true);
//     setTimeout(() => setCopied2(false), 2000);
//   };
//   //*********************************

//   //*********************************
//   // how to use code section step-3
//   const [copied3, setCopied3] = useState(false);

//   const handleCopyPurposeCode3 = () => {
//     navigator.clipboard.writeText(HowToUseCodeStep3);
//     setCopied3(true);
//     setTimeout(() => setCopied3(false), 2000);
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
//         Login (3-step process)
//       </h1>

//       {/* Step 1 – Send OTP to Email */}
//       <div className="mb-3 mt-8">
//         <div className="flex items-center gap-2">
//           <LuStepForward className="text-xl sm:text-2xl text-zinc-100" />
//           <h2 className="text-zinc-100 text-xl sm:text-2xl font-semibold">
//             STEP 1 – Verify the user’s details. If the user is registered and
//             the login credentials are correct, an OTP will be sent.
//           </h2>
//         </div>
//       </div>

//       {/* api generate and saw api content */}
//       <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-10">
//         <p className="text-base sm:text-lg ml-10">
//           Generate the{" "}
//           <code className="bg-stone-800 text-zinc-200 px-2 py-1 rounded text-xs sm:text-sm font-mono">
//             Email & Password Verification API
//           </code>{" "}
//           by clicking the "Generate" button.
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
//       <div className="mt-8">
//         <div className="flex items-center gap-2 mb-3">
//           <GoGoal className="text-xl sm:text-2xl text-zinc-100" />
//           <h2 className="text-xl sm:text-2xl font-bold text-zinc-100">
//             Purpose
//           </h2>
//         </div>
//         <div className="ml-2 sm:ml-10">
//           <h3 className="text-md font-semibold mb-2">
//             The purpose of this API is to authenticate users by verifying their
//             registered email and password. An OTP will be sent to the respective
//             email only if the credentials are correct; otherwise, it will not be
//             sent.
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
//             <code>{HowToUseCodeStep1}</code>
//           </pre>
//         </div>
//       </div>

//       {/* Step 2 – Send OTP to Email */}
//       <div className="mb-3 mt-8">
//         <div className="flex items-center gap-2">
//           <LuStepForward className="text-xl sm:text-2xl text-zinc-100" />
//           <h2 className="text-zinc-100 text-xl sm:text-2xl font-semibold">
//             STEP 2 – Send OTP to Email
//           </h2>
//         </div>
//       </div>

//       {/* api generate and saw api content */}
//       <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-10">
//         <p className="text-base sm:text-lg ml-10">
//           Use the "Generate" button to create an API for{" "}
//           <code className="bg-stone-800 text-zinc-200 px-2 py-1 rounded text-xs sm:text-sm font-mono">
//             sending OTP to email
//           </code>{" "}
//           .
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
//       <div className="mt-8">
//         <div className="flex items-center gap-2 mb-3">
//           <GoGoal className="text-xl sm:text-2xl text-zinc-100" />
//           <h2 className="text-xl sm:text-2xl font-bold text-zinc-100">
//             Purpose
//           </h2>
//         </div>
//         <div className="ml-2 sm:ml-10">
//           <h3 className="text-md font-semibold mb-2">
//             This API sends a{" "}
//             <code className="bg-stone-800 text-zinc-200 px-2 py-1 rounded text-xs sm:text-sm font-mono">
//               6-digit OTP
//             </code>{" "}
//             to the user’s email after verifying the email exists in the
//             database.
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
//             onClick={handleCopyPurposeCode2}
//             className="absolute top-2 right-2 text-gray-400 hover:text-zinc-200 active:scale-95 transition-transform"
//           >
//             <FaCopy />
//           </button>

//           <pre className="overflow-x-auto max-w-full">
//             <code>{HowToUseCodeStep2}</code>
//           </pre>
//         </div>
//       </div>

//       {/* for step-3 */}
//       <div className="mb-3 mt-8">
//         <div className="flex items-center gap-2">
//           <LuStepForward className="text-xl sm:text-2xl text-zinc-100" />
//           <h2 className="text-zinc-100 text-xl sm:text-2xl font-semibold">
//             STEP 3 – Enter your OTP to Login{" "}
//           </h2>
//         </div>
//       </div>

//       {/* api generate and saw api content */}
//       <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-10">
//         <p className="text-base sm:text-lg ml-10">
//           Click on the "Generate" button to create an API{" "}
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
//             onClick={handleCopyPurposeCode3}
//             className="absolute top-2 right-2 text-gray-400 hover:text-zinc-200 active:scale-95 transition-transform"
//           >
//             <FaCopy />
//           </button>

//           <pre className="overflow-x-auto max-w-full">
//             <code>{HowToUseCodeStep3}</code>
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
//             <li> Login requires email, password & OTP — all are mandatory.</li>
//             <li>OTP must be requested first via /send-otp.</li>
//             <li>OTP is valid for only 2 minutes.</li>
//             <li>OTP is single-use and gets deleted after successful login.</li>
//             <li>On success, token is stored in an HTTP-only cookie.</li>
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
//       <CopyToast show={copied2} />
//       <CopyToast show={copied3} />
//       <CopyToast show={copiedFull} />
//       <CopyToast show={copiedApi} />
//     </div>
//   );
// };

// export default EmailOTPAuthLogin;

import React, { useState } from "react";
import { FaCopy } from "react-icons/fa";
import { TbAlertTriangleFilled } from "react-icons/tb";
import { GoGoal } from "react-icons/go";
import { FaRegQuestionCircle } from "react-icons/fa";
import { FaRegArrowAltCircleRight } from "react-icons/fa";
import { IoMdCloseCircle } from "react-icons/io";
import { LuStepForward } from "react-icons/lu";
import HowToUseCodeStep1 from "./howToUseSectionCode/HowToUseCodeStep1";
import HowToUseCodeStep2 from "./howToUseSectionCode/HowToUseCodeStep2";
import HowToUseCodeStep3 from "./howToUseSectionCode/HowToUseCodeStep3";
import fullCode from "./fullCode/FullCode";
import CopyToast from "../../copyCodeToast/CopyToast";
import useApiGenerateCheckAuth from "../../../userLoginPage/protectedRoute/ForApiGenereateCheckAuth";
import { Navigate } from "react-router-dom";
import axios from "axios";

const EmailOTPAuthLogin = () => {
  const isAuth = useApiGenerateCheckAuth(); // Use the custom hook

  // State for Step 1: Credential Verification
  const [apiURLStep1, setApiURLStep1] = useState("");
  const [handleSawApiStep1, setHandleSawApiStep1] = useState(false);
  const [apiSawLoadingStep1, setApiSawLoadingStep1] = useState(false);
  const [copiedApiStep1, setCopiedApiStep1] = useState(false);
  const [errorStep1, setErrorStep1] = useState(null);

  // State for Step 2: Send OTP
  const [apiURLStep2, setApiURLStep2] = useState("");
  const [handleSawApiStep2, setHandleSawApiStep2] = useState(false);
  const [apiSawLoadingStep2, setApiSawLoadingStep2] = useState(false);
  const [copiedApiStep2, setCopiedApiStep2] = useState(false);
  const [errorStep2, setErrorStep2] = useState(null);

  // State for Step 3: Login with OTP
  const [apiURLStep3, setApiURLStep3] = useState("");
  const [handleSawApiStep3, setHandleSawApiStep3] = useState(false);
  const [apiSawLoadingStep3, setApiSawLoadingStep3] = useState(false);
  const [copiedApiStep3, setCopiedApiStep3] = useState(false);
  const [errorStep3, setErrorStep3] = useState(null);

  // Redirect state
  const [redirectToLogin, setRedirectToLogin] = useState(false);

  // Handlers for Step 1
  const handleCopyStep1 = () => {
    if (apiURLStep1) {
      navigator.clipboard.writeText(apiURLStep1);
      setCopiedApiStep1(true);
      setTimeout(() => setCopiedApiStep1(false), 2000);
    }
  };

  const handleSawStep1 = async () => {
    if (isAuth === null) {
      setErrorStep1("Authentication check is still loading. Please try again.");
      return;
    }

    if (!isAuth) {
      setRedirectToLogin(true);
      return;
    }

    setApiSawLoadingStep1(true);
    setHandleSawApiStep1(true);
    setErrorStep1(null);

    try {
      const response = await axios.post(
        "https://backendlibrary-fullstack-backend.onrender.com/api/generate-key",
        { feature: "email-otp-credential-verify" },
        { withCredentials: true }
      );

      const { api } = response.data;
      if (api && api.length > 0 && api[0].url) {
        setApiURLStep1(api[0].url);
      } else {
        setErrorStep1("No API URL returned from the server.");
      }
    } catch (err) {
      console.error(err);
      const errorMessage =
        err.response?.data?.error || "Failed to generate API key.";
      setErrorStep1(errorMessage);
    } finally {
      setApiSawLoadingStep1(false);
    }
  };

  // Handlers for Step 2
  const handleCopyStep2 = () => {
    if (apiURLStep2) {
      navigator.clipboard.writeText(apiURLStep2);
      setCopiedApiStep2(true);
      setTimeout(() => setCopiedApiStep2(false), 2000);
    }
  };

  const handleSawStep2 = async () => {
    if (isAuth === null) {
      setErrorStep2("Authentication check is still loading. Please try again.");
      return;
    }

    if (!isAuth) {
      setRedirectToLogin(true);
      return;
    }

    setApiSawLoadingStep2(true);
    setHandleSawApiStep2(true);
    setErrorStep2(null);

    try {
      const response = await axios.post(
        "https://backendlibrary-fullstack-backend.onrender.com/api/generate-key",
        { feature: "email-otp-send" },
        { withCredentials: true }
      );

      const { api } = response.data;
      if (api && api.length > 0 && api[0].url) {
        setApiURLStep2(api[0].url);
      } else {
        setErrorStep2("No API URL returned from the server.");
      }
    } catch (err) {
      console.error(err);
      const errorMessage =
        err.response?.data?.error || "Failed to generate API key.";
      setErrorStep2(errorMessage);
    } finally {
      setApiSawLoadingStep2(false);
    }
  };

  // Handlers for Step 3
  const handleCopyStep3 = () => {
    if (apiURLStep3) {
      navigator.clipboard.writeText(apiURLStep3);
      setCopiedApiStep3(true);
      setTimeout(() => setCopiedApiStep3(false), 2000);
    }
  };

  const handleSawStep3 = async () => {
    if (isAuth === null) {
      setErrorStep3("Authentication check is still loading. Please try again.");
      return;
    }

    if (!isAuth) {
      setRedirectToLogin(true);
      return;
    }

    setApiSawLoadingStep3(true);
    setHandleSawApiStep3(true);
    setErrorStep3(null);

    try {
      const response = await axios.post(
        "https://backendlibrary-fullstack-backend.onrender.com/api/generate-key",
        { feature: "email-otp-login" },
        { withCredentials: true }
      );

      const { api } = response.data;
      if (api && api.length > 0 && api[0].url) {
        setApiURLStep3(api[0].url);
      } else {
        setErrorStep3("No API URL returned from the server.");
      }
    } catch (err) {
      console.error(err);
      const errorMessage =
        err.response?.data?.error || "Failed to generate API key.";
      setErrorStep3(errorMessage);
    } finally {
      setApiSawLoadingStep3(false);
    }
  };

  // How to use code sections
  const [copiedStep1, setCopiedStep1] = useState(false);
  const [copiedStep2, setCopiedStep2] = useState(false);
  const [copiedStep3, setCopiedStep3] = useState(false);

  const handleCopyPurposeCodeStep1 = () => {
    navigator.clipboard.writeText(HowToUseCodeStep1);
    setCopiedStep1(true);
    setTimeout(() => setCopiedStep1(false), 2000);
  };

  const handleCopyPurposeCodeStep2 = () => {
    navigator.clipboard.writeText(HowToUseCodeStep2);
    setCopiedStep2(true);
    setTimeout(() => setCopiedStep2(false), 2000);
  };

  const handleCopyPurposeCodeStep3 = () => {
    navigator.clipboard.writeText(HowToUseCodeStep3);
    setCopiedStep3(true);
    setTimeout(() => setCopiedStep3(false), 2000);
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
        Login (3-step process)
      </h1>

      {/* Step 1 – Credential Verification */}
      <div className="mb-3 mt-8">
        <div className="flex items-center gap-2">
          <LuStepForward className="text-xl sm:text-2xl text-zinc-100" />
          <h2 className="text-zinc-100 text-xl sm:text-2xl font-semibold">
            STEP 1 – Verify the user’s details. If the user is registered and
            the login credentials are correct, an OTP will be sent.
          </h2>
        </div>
      </div>

      {/* API generate and show API content for Step 1 */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-10">
        <p className="text-base sm:text-lg ml-10">
          Generate the{" "}
          <code className="bg-stone-800 text-zinc-200 px-2 py-1 rounded text-xs sm:text-sm font-mono">
            Email & Password Verification API
          </code>{" "}
          by clicking the "Generate" button.
        </p>
        <button
          onClick={handleSawStep1}
          className="text-base sm:text-lg font-bold border border-stone-700 bg-stone-800 hover:bg-stone-700 transition rounded-full px-3 py-1 sm:py-0 w-fit"
        >
          Generate
        </button>
      </div>
      {handleSawApiStep1 && (
        <div className="mt-6 sm:mt-10 flex justify-center">
          <div className="w-full sm:w-fit max-w-full text-sm sm:text-lg inline-flex items-center gap-2 sm:gap-4 border border-stone-700 rounded-md px-3 sm:px-4 py-2 justify-center overflow-x-auto">
            {apiSawLoadingStep1 ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-t-transparent border-white rounded-full animate-spin"></div>
                <p>Generating your new API. Please wait...</p>
              </div>
            ) : errorStep1 ? (
              <p className="text-red-500">{errorStep1}</p>
            ) : (
              <>
                <p className="whitespace-nowrap overflow-x-auto max-w-[80vw] sm:max-w-none">
                  {apiURLStep1 || "No API URL generated."}
                </p>
                {apiURLStep1 && (
                  <FaCopy
                    onClick={handleCopyStep1}
                    className="cursor-pointer hover:text-zinc-300 active:scale-95 transition-transform flex-shrink-0"
                  />
                )}
              </>
            )}
          </div>
        </div>
      )}

      {/* Purpose of Step 1 */}
      <div className="mt-8">
        <div className="flex items-center gap-2 mb-3">
          <GoGoal className="text-xl sm:text-2xl text-zinc-100" />
          <h2 className="text-xl sm:text-2xl font-bold text-zinc-100">
            Purpose
          </h2>
        </div>
        <div className="ml-2 sm:ml-10">
          <h3 className="text-md sm:text-md font-semibold mb-2">
            The purpose of this API is to authenticate users by verifying their
            registered email and password. An OTP will be sent to the respective
            email only if the credentials are correct; otherwise, it will not be
            sent.
          </h3>
        </div>
      </div>

      {/* How to use Step 1 */}
      <div className="mt-8 sm:mt-10">
        <div className="flex items-center gap-2 mb-3">
          <FaRegQuestionCircle className="text-xl sm:text-2xl text-zinc-100" />
          <h2 className="text-xl sm:text-2xl font-bold text-zinc-100">
            How to Call in Frontend (Example)
          </h2>
        </div>
        <div className="relative inline-block w-full bg-black border border-stone-700 rounded-md p-3 sm:p-5 text-xs sm:text-sm font-mono text-gray-300">
          <button
            onClick={handleCopyPurposeCodeStep1}
            className="absolute top-2 right-2 text-gray-400 hover:text-zinc-200 active:scale-95 transition-transform"
          >
            <FaCopy />
          </button>
          <pre className="overflow-x-auto max-w-full">
            <code>{HowToUseCodeStep1}</code>
          </pre>
        </div>
      </div>

      {/* Step 2 – Send OTP */}
      <div className="mb-3 mt-8">
        <div className="flex items-center gap-2">
          <LuStepForward className="text-xl sm:text-2xl text-zinc-100" />
          <h2 className="text-zinc-100 text-xl sm:text-2xl font-semibold">
            STEP 2 – Send OTP to Email
          </h2>
        </div>
      </div>

      {/* API generate and show API content for Step 2 */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-10">
        <p className="text-base sm:text-lg ml-10">
          Use the "Generate" button to create an API for{" "}
          <code className="bg-stone-800 text-zinc-200 px-2 py-1 rounded text-xs sm:text-sm font-mono">
            sending OTP to email
          </code>{" "}
          .
        </p>
        <button
          onClick={handleSawStep2}
          className="text-base sm:text-lg font-bold border border-stone-700 bg-stone-800 hover:bg-stone-700 transition rounded-full px-3 py-1 sm:py-0 w-fit"
        >
          Generate
        </button>
      </div>
      {handleSawApiStep2 && (
        <div className="mt-6 sm:mt-10 flex justify-center">
          <div className="w-full sm:w-fit max-w-full text-sm sm:text-lg inline-flex items-center gap-2 sm:gap-4 border border-stone-700 rounded-md px-3 sm:px-4 py-2 justify-center overflow-x-auto">
            {apiSawLoadingStep2 ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-t-transparent border-white rounded-full animate-spin"></div>
                <p>Generating your new API. Please wait...</p>
              </div>
            ) : errorStep2 ? (
              <p className="text-red-500">{errorStep2}</p>
            ) : (
              <>
                <p className="whitespace-nowrap overflow-x-auto max-w-[80vw] sm:max-w-none">
                  {apiURLStep2 || "No API URL generated."}
                </p>
                {apiURLStep2 && (
                  <FaCopy
                    onClick={handleCopyStep2}
                    className="cursor-pointer hover:text-zinc-300 active:scale-95 transition-transform flex-shrink-0"
                  />
                )}
              </>
            )}
          </div>
        </div>
      )}

      {/* Purpose of Step 2 */}
      <div className="mt-8">
        <div className="flex items-center gap-2 mb-3">
          <GoGoal className="text-xl sm:text-2xl text-zinc-100" />
          <h2 className="text-xl sm:text-2xl font-bold text-zinc-100">
            Purpose
          </h2>
        </div>
        <div className="ml-2 sm:ml-10">
          <h3 className="text-md sm:text-md font-semibold mb-2">
            This API sends a{" "}
            <code className="bg-stone-800 text-zinc-200 px-2 py-1 rounded text-xs sm:text-sm font-mono">
              6-digit OTP
            </code>{" "}
            to the user’s email after verifying the email exists in the
            database.
          </h3>
        </div>
      </div>

      {/* How to use Step 2 */}
      <div className="mt-8 sm:mt-10">
        <div className="flex items-center gap-2 mb-3">
          <FaRegQuestionCircle className="text-xl sm:text-2xl text-zinc-100" />
          <h2 className="text-xl sm:text-2xl font-bold text-zinc-100">
            How to Call in Frontend (Example)
          </h2>
        </div>
        <div className="relative inline-block w-full bg-black border border-stone-700 rounded-md p-3 sm:p-5 text-xs sm:text-sm font-mono text-gray-300">
          <button
            onClick={handleCopyPurposeCodeStep2}
            className="absolute top-2 right-2 text-gray-400 hover:text-zinc-200 active:scale-95 transition-transform"
          >
            <FaCopy />
          </button>
          <pre className="overflow-x-auto max-w-full">
            <code>{HowToUseCodeStep2}</code>
          </pre>
        </div>
      </div>

      {/* Step 3 – Login with OTP */}
      <div className="mb-3 mt-8">
        <div className="flex items-center gap-2">
          <LuStepForward className="text-xl sm:text-2xl text-zinc-100" />
          <h2 className="text-zinc-100 text-xl sm:text-2xl font-semibold">
            STEP 3 – Enter your OTP to Login
          </h2>
        </div>
      </div>

      {/* API generate and show API content for Step 3 */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-10">
        <p className="text-base sm:text-lg ml-10">
          Click on the "Generate" button to create an API for{" "}
          <code className="bg-stone-800 text-zinc-200 px-2 py-1 rounded text-xs sm:text-sm font-mono">
            logging in with OTP
          </code>{" "}
          .
        </p>
        <button
          onClick={handleSawStep3}
          className="text-base sm:text-lg font-bold border border-stone-700 bg-stone-800 hover:bg-stone-700 transition rounded-full px-3 py-1 sm:py-0 w-fit"
        >
          Generate
        </button>
      </div>
      {handleSawApiStep3 && (
        <div className="mt-6 sm:mt-10 flex justify-center">
          <div className="w-full sm:w-fit max-w-full text-sm sm:text-lg inline-flex items-center gap-2 sm:gap-4 border border-stone-700 rounded-md px-3 sm:px-4 py-2 justify-center overflow-x-auto">
            {apiSawLoadingStep3 ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-t-transparent border-white rounded-full animate-spin"></div>
                <p>Generating your new API. Please wait...</p>
              </div>
            ) : errorStep3 ? (
              <p className="text-red-500">{errorStep3}</p>
            ) : (
              <>
                <p className="whitespace-nowrap overflow-x-auto max-w-[80vw] sm:max-w-none">
                  {apiURLStep3 || "No API URL generated."}
                </p>
                {apiURLStep3 && (
                  <FaCopy
                    onClick={handleCopyStep3}
                    className="cursor-pointer hover:text-zinc-300 active:scale-95 transition-transform flex-shrink-0"
                  />
                )}
              </>
            )}
          </div>
        </div>
      )}

      {/* Purpose of Step 3 */}
      <div className="mt-8">
        <div className="flex items-center gap-2 mb-3">
          <GoGoal className="text-xl sm:text-2xl text-zinc-100" />
          <h2 className="text-xl sm:text-2xl font-bold text-zinc-100">
            Purpose
          </h2>
        </div>
        <div className="ml-2 sm:ml-10">
          <h3 className="text-md sm:text-md font-semibold mb-2">
            This API verifies the{" "}
            <code className="bg-stone-800 text-zinc-200 px-2 py-1 rounded text-xs sm:text-sm font-mono">
              6-digit OTP
            </code>{" "}
            entered by the user and, if correct, logs the user in by setting a
            secure HTTP-only cookie with a JWT token.
          </h3>
        </div>
      </div>

      {/* How to use Step 3 */}
      <div className="mt-8 sm:mt-10">
        <div className="flex items-center gap-2 mb-3">
          <FaRegQuestionCircle className="text-xl sm:text-2xl text-zinc-100" />
          <h2 className="text-xl sm:text-2xl font-bold text-zinc-100">
            How to Call in Frontend (Example)
          </h2>
        </div>
        <div className="relative inline-block w-full bg-black border border-stone-700 rounded-md p-3 sm:p-5 text-xs sm:text-sm font-mono text-gray-300">
          <button
            onClick={handleCopyPurposeCodeStep3}
            className="absolute top-2 right-2 text-gray-400 hover:text-zinc-200 active:scale-95 transition-transform"
          >
            <FaCopy />
          </button>
          <pre className="overflow-x-auto max-w-full">
            <code>{HowToUseCodeStep3}</code>
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
            <li>Login requires email, password & OTP — all are mandatory.</li>
            <li>OTP must be requested first via /send-otp.</li>
            <li>OTP is valid for only 2 minutes.</li>
            <li>OTP is single-use and gets deleted after successful login.</li>
            <li>On success, token is stored in an HTTP-only cookie.</li>
            <li>
              Always use{" "}
              <code className="bg-stone-800 text-zinc-200 px-2 py-1 rounded text-xs sm:text-sm font-mono">
                withCredentials: true
              </code>
            </li>
            <li>
              Use try/catch or .catch to handle errors (e.g., invalid
              credentials, expired OTP, network issues).
            </li>
          </ul>
        </div>
      </div>

      <CopyToast show={copiedStep1} />
      <CopyToast show={copiedStep2} />
      <CopyToast show={copiedStep3} />
      <CopyToast show={copiedFull} />
      <CopyToast show={copiedApiStep1} />
      <CopyToast show={copiedApiStep2} />
      <CopyToast show={copiedApiStep3} />
    </div>
  );
};

export default EmailOTPAuthLogin;

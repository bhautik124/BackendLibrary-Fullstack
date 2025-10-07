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
import fullCodeUI1 from "./fullCode/FullCodeUI1";
import fullCodeUI2 from "./fullCode/FullCodeUI2";
import fullCodeUI3 from "./fullCode/FullCodeUI3";
import CopyToast from "../../copyCodeToast/CopyToast";
import useApiGenerateCheckAuth from "../../../userLoginPage/protectedRoute/ForApiGenereateCheckAuth";
import { Navigate } from "react-router-dom";
import axios from "axios";
import PaymentService from "../../../payment/PaymentService";
import PaymentModal from "../../../payment/PaymentModal";

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

  // Payment modal states
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [paymentData, setPaymentData] = useState(null);

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
      const result = await PaymentService.generateAPIWithPaymentCheck(["email-otp-credential-verify"]);

      if (result.requiresPayment) {
        setPaymentData(result.paymentData);
        setShowPaymentModal(true);
        setApiSawLoadingStep1(false);
        return;
      }

      if (result.success) {
        const { api } = result.data;
        if (api && api.length > 0 && api[0].url) {
          setApiURLStep1(api[0].url);
          setHandleSawApiStep1(true);
        } else {
          setErrorStep1("No API URL returned from the server.");
        }
      } else {
        setErrorStep1(result.error || "Failed to generate API key.");
      }
    } catch (err) {
      console.error(err);
      setErrorStep1("Failed to generate API key.");
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
      const result = await PaymentService.generateAPIWithPaymentCheck(["email-otp-send"]);

      if (result.requiresPayment) {
        setPaymentData(result.paymentData);
        setShowPaymentModal(true);
        setApiSawLoadingStep2(false);
        return;
      }

      if (result.success) {
        const { api } = result.data;
        if (api && api.length > 0 && api[0].url) {
          setApiURLStep2(api[0].url);
          setHandleSawApiStep2(true);
        } else {
          setErrorStep2("No API URL returned from the server.");
        }
      } else {
        setErrorStep2(result.error || "Failed to generate API key.");
      }
    } catch (err) {
      console.error(err);
      setErrorStep2("Failed to generate API key.");
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
      const result = await PaymentService.generateAPIWithPaymentCheck(["email-otp-login"]);

      if (result.requiresPayment) {
        setPaymentData(result.paymentData);
        setShowPaymentModal(true);
        setApiSawLoadingStep3(false);
        return;
      }

      if (result.success) {
        const { api } = result.data;
        if (api && api.length > 0 && api[0].url) {
          setApiURLStep3(api[0].url);
          setHandleSawApiStep3(true);
        } else {
          setErrorStep3("No API URL returned from the server.");
        }
      } else {
        setErrorStep3(result.error || "Failed to generate API key.");
      }
    } catch (err) {
      console.error(err);
      setErrorStep3("Failed to generate API key.");
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
  const [selectedUI, setSelectedUI] = useState("original");

  const handleCopyFullCode = () => {
    const codeMap = {
      original: fullCode,
      ui1: fullCodeUI1,
      ui2: fullCodeUI2,
      ui3: fullCodeUI3
    };
    navigator.clipboard.writeText(codeMap[selectedUI]);
    setCopiedFull(true);
    setTimeout(() => setCopiedFull(false), 2000);
  };

  // Payment modal handlers
  const handlePaymentSuccess = () => {
    setShowPaymentModal(false);
    setPaymentData(null);
    // Re-trigger the last attempted API generation
    // You might want to track which step was being generated
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

      {/* Enhanced UI Selection Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 backdrop-blur-sm p-4">
          <div className="relative w-full max-w-6xl max-h-[85vh] overflow-y-auto bg-gradient-to-br from-zinc-900 to-zinc-800 border border-stone-700 rounded-xl p-6 shadow-2xl">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
              <div>
                <h3 className="text-zinc-100 text-xl font-bold mb-1">Email OTP Login Complete Code</h3>
                <span className="text-zinc-400 text-sm">React + Tailwind CSS + Axios + 3-Step OTP Authentication</span>
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
              <h4 className="text-zinc-200 font-semibold mb-3">Choose your OTP login UI design:</h4>
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
                  <div className="text-xs opacity-75">3-Step Process</div>
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
                      ui1: fullCodeUI1,
                      ui2: fullCodeUI2,
                      ui3: fullCodeUI3
                    };
                    const currentCode = codeMap[selectedUI];
                    return showFullCode ? currentCode : currentCode.slice(0, 800) + "\n\n// ... (click Show Complete Code to see full 3-step implementation)";
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

export default EmailOTPAuthLogin;

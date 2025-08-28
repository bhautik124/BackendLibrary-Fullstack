import React, { useState } from "react";
import { FaCopy } from "react-icons/fa";
import { IoMdCloseCircle } from "react-icons/io";
import CopyToast from "../../copyCodeToast/CopyToast";
import CodeVersion1 from "../create/fullCode/FullCodeOfAddData";
import {LuStepForward} from "react-icons/lu";

const Step5OfCreate = () => {
  const [showModal, setShowModal] = useState(false);
  const [showFullCode, setShowFullCode] = useState(false);
  const [copied, setCopied] = useState(false);

  const installCommand = "npm install axios react-icons";
  const codeLabel = "Fetch Model & insert data";

  const handleCopyCode = () => {
    navigator.clipboard.writeText(CodeVersion1);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="pb-40">
      <div className="mb-3 mt-4 sm:mt-8">
        <div className="flex items-center gap-2">
          <LuStepForward className="text-lg sm:text-2xl text-zinc-100" />
          <h2 className="text-zinc-100 text-lg sm:text-2xl font-semibold">
            Full Code Examples
          </h2>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="mt-4 border border-stone-700 bg-stone-800 hover:bg-stone-700 transition rounded-full px-3 sm:px-4 py-1.5 sm:py-2 text-white font-semibold text-sm sm:text-base"
        >
          View Full Code Examples
        </button>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm p-3 sm:p-4">
          <div className="relative w-full max-w-full sm:max-w-4xl max-h-[80vh] overflow-y-auto bg-zinc-900 border border-stone-700 rounded-lg p-3 sm:p-5 shadow-xl">
            {/* Header */}
            <div className="flex justify-between items-center mb-3 sm:mb-4">
              <span className="text-zinc-100 text-xs sm:text-sm md:text-md">
                This code contains React + Tailwind
              </span>

              <div className="flex items-center gap-3 sm:gap-4">
                <FaCopy
                  onClick={handleCopyCode}
                  className="text-zinc-100 cursor-pointer text-base sm:text-lg active:scale-95 transition-transform"
                  title="Copy Code"
                />
                <IoMdCloseCircle
                  onClick={() => {
                    setShowModal(false);
                    setShowFullCode(false);
                  }}
                  className="text-zinc-100 cursor-pointer text-xl sm:text-2xl font-bold"
                  title="Close"
                />
              </div>
            </div>

            {/* Code Label */}
            <div className="mb-3 sm:mb-4">
              <span className="bg-zinc-800 font-bold text-xs sm:text-sm text-zinc-100 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg">
                {codeLabel}
              </span>
            </div>

            {/* Code Display */}
            <div className="mb-2 border border-stone-700 rounded-md px-2 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm text-zinc-100">
              {installCommand}
            </div>

            <div className="bg-black border border-stone-700 rounded-md p-3 sm:p-4 text-xs sm:text-sm font-mono text-gray-300">
              <pre className="overflow-x-auto max-w-full whitespace-pre-wrap">
                {showFullCode
                  ? CodeVersion1
                  : CodeVersion1.slice(0, 500) + "\n..."}
              </pre>
            </div>

            {!showFullCode && (
              <div className="mt-3 sm:mt-4 flex justify-end">
                <button
                  className="text-xs sm:text-sm border border-stone-600 px-2 sm:px-3 py-1 sm:py-1.5 rounded hover:bg-stone-800 transition text-white"
                  onClick={() => setShowFullCode(true)}
                >
                  Show Full Code
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      <CopyToast show={copied} />
    </div>
  );
};

export default Step5OfCreate;

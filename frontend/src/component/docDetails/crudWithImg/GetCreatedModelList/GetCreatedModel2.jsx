import React, { useState } from "react";
import { FaCopy } from "react-icons/fa";
import { LuStepForward } from "react-icons/lu";
import { IoMdCloseCircle } from "react-icons/io";
import CopyToast from "../../copyCodeToast/CopyToast";

// Dummy code — replace with your actual code
import CodeVersion1 from "../GetCreatedModelList/howToCallAxios/CallAxios";
import GetCreatedModel3 from "./GetCreatedModel3";

const GetCreatedModel2 = () => {
  const [showModal, setShowModal] = useState(false);
  const [whichCodeSaw, setWhichCodeSaw] = useState(null);
  const [showFullCode, setShowFullCode] = useState(false);
  const [copied, setCopied] = useState(false);

  const codeBlocks = [CodeVersion1];

  const handleCopyCode = () => {
    if (whichCodeSaw !== null) {
      navigator.clipboard.writeText(codeBlocks[whichCodeSaw]);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="pb-40">
      <div className="mb-3 mt-8">
        <div className="flex items-center gap-2">
          <LuStepForward className="text-xl sm:text-2xl text-zinc-100" />
          <h2 className="text-zinc-100 text-xl sm:text-2xl font-semibold">
            How to Call API Using Axios
          </h2>
        </div>

        <button
          onClick={() => {
            setShowModal(true);
            setWhichCodeSaw(0); // Directly show the code
          }}
          className="mt-4 border border-stone-700 bg-stone-800 hover:bg-stone-700 transition rounded-full px-4 py-2 text-white font-semibold"
        >
          View Axios Code Examples
        </button>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm p-4">
          <div className="relative w-full max-w-4xl max-h-[80vh] overflow-y-auto bg-zinc-900 border border-stone-700 rounded-lg p-4 sm:p-5 shadow-xl">
            <div className="flex justify-between items-center mb-4">
              <span className="text-zinc-100 text-sm sm:text-md">
                Axios Code Examples
              </span>

              <div className="flex items-center gap-4">
                {whichCodeSaw !== null && (
                  <FaCopy
                    onClick={handleCopyCode}
                    className="text-zinc-100 cursor-pointer text-lg active:scale-95 transition-transform"
                    title="Copy Code"
                  />
                )}
                <IoMdCloseCircle
                  onClick={() => {
                    setShowModal(false);
                    setShowFullCode(false);
                    setWhichCodeSaw(null);
                  }}
                  className="text-zinc-100 cursor-pointer text-2xl font-bold"
                  title="Close"
                />
              </div>
            </div>

            {whichCodeSaw !== null && (
              <>
                <div className="mb-2 border border-stone-700 rounded-md px-3 sm:px-4 py-1 sm:py-2 text-xs sm:text-sm text-zinc-100">
                  npm install axios react-icons
                </div>

                <div className="bg-black border border-stone-700 rounded-md p-3 sm:p-4 text-xs sm:text-sm font-mono text-gray-300">
                  <pre className="overflow-x-auto max-w-full whitespace-pre-wrap">
                    {showFullCode
                      ? codeBlocks[whichCodeSaw]
                      : codeBlocks[whichCodeSaw].slice(0, 500) + "\n..."}
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
              </>
            )}
          </div>
        </div>
      )}

      <CopyToast show={copied} />

      <GetCreatedModel3 />
    </div>
  );
};

export default GetCreatedModel2;

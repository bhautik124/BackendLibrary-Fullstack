import React from "react";
import { FaRegQuestionCircle } from "react-icons/fa";

const Intoduction = () => {
  return (
    <>
      <div className="pb-40">
        <div>
          <h1 className="text-zinc-100 text-3xl font-bold mb-4">
            "No More Backend" — A Plug-and-Play API Library for Developers
          </h1>
        </div>
        <div className="mt-10">
          <div className="flex items-center gap-2 mb-3">
            <FaRegQuestionCircle className="text-2xl text-zinc-100" />
            <h2 className="text-2xl font-bold text-zinc-100">
              What is “No More Backend”?
            </h2>
          </div>
          <div className="ml-10">
            <h3 className="text-md font-semibold mb-2">
              No More Backend is a developer-friendly library that provides
              ready-to-use backend APIs for the most common and essential
              features in modern web development — like Authentication, CRUD
              operations, and more.
            </h3>
            <ol className="list-disc list-inside ml-5">
              <li>Backend logic? Already written.</li>
              <li>API ready? Yes.</li>
              <li>Your job? Just call the API from your frontend.</li>
            </ol>
          </div>
        </div>{" "}
        <div className="mt-10">
          <div className="flex items-center gap-2 mb-3">
            <FaRegQuestionCircle className="text-2xl text-zinc-100" />
            <h2 className="text-2xl font-bold text-zinc-100">
              Why This Library?
            </h2>
          </div>
          <div className="ml-10">
            <ol className="list-disc list-inside">
              <li>
                Pre-built APIs for common and repetitive backend operations.
              </li>
              <li>
                Every user gets their own API endpoints to prevent collisions
                and ensure isolation.
              </li>
              <li>
                You only need to consume the API in your frontend — using Axios,
                Fetch, or anything else.
              </li>
            </ol>
          </div>
        </div>{" "}
        <div className="mt-10">
          <div className="flex items-center gap-2 mb-3">
            <FaRegQuestionCircle className="text-2xl text-zinc-100" />
            <h2 className="text-2xl font-bold text-zinc-100">How It Works?</h2>
          </div>
          <div className="ml-10">
            <ol className="list-disc list-inside">
              <li>Log in to the library dashboard</li>
              <li>
                Generate the API for the feature you want (Auth, CRUD, etc.)
              </li>
              <li>Copy the generated API endpoint</li>
              <li>Use it directly in your frontend app</li>
            </ol>
          </div>
        </div>{" "}
      </div>
    </>
  );
};

export default Intoduction;

import React from "react";
import { FaRegArrowAltCircleRight, FaGithub, FaExternalLinkAlt } from "react-icons/fa";

const Community = () => {
  return (
    <div className="pb-40 px-4 sm:px-6 lg:px-8">
      <h1 className="text-zinc-100 text-2xl sm:text-4xl font-bold mb-4">
        Our Community
      </h1>

      <div className="flex items-center gap-2 mb-6">
        <FaRegArrowAltCircleRight className="text-lg text-zinc-100" />
        <p className="text-md sm:text-lg font-semibold text-zinc-100">
          What others create using our API?
        </p>
      </div>

      {/* Card */}
      <div className="bg-zinc-800 rounded-lg p-6 max-w-sm shadow-lg">
        <h2 className="text-xl font-bold text-white mb-2">nickuraltsev</h2>
        <p className="text-zinc-300 mb-4">
          Built a <span className="font-semibold">Full Stack Blog App</span>{" "}
          entirely on my own—without creating a backend, using only This APIs!
        </p>

        <div className="flex flex-wrap gap-4">
          <a
            href="https://github.com/bhautik124/backend-library-community-sample.git"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-white font-semibold hover:text-blue-400 transition-colors"
          >
            <FaGithub /> Check out my app
          </a>

          <a
            href="https://backend-library-community-sample.onrender.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-white font-semibold hover:text-green-400 transition-colors"
          >
            <FaExternalLinkAlt /> Live Preview
          </a>
        </div>
      </div>
    </div>
  );
};

export default Community;

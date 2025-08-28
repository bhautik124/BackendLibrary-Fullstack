const fullCode = `import React, { useState } from "react";
import axios from "axios";
import {
  FaEye,
  FaEyeSlash,
  FaCheckCircle,
  FaExclamationCircle,
  FaUserShield,
} from "react-icons/fa";
import { HiOutlineLockClosed, HiOutlineMail } from "react-icons/hi";
import { ImSpinner8 } from "react-icons/im";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setIsLoading(true);

    try {
      const response = await axios.post(
        "Enter Your Generated Api Here......",
        formData,
        { withCredentials: true }
      );

      if (response.status === 200) {
        setMessage("🎉 Login successful!");
      }
    } catch (err) {
      setMessage(
        err.response?.data?.message ||
          "⚠️ Login failed. Please check your credentials and try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-950 px-4 py-12">
      <div className="bg-gray-900 p-8 rounded-xl w-full max-w-md border border-gray-800 shadow-2xl shadow-black/50">
        <div className="flex justify-center mb-8">
          <div className="bg-gradient-to-r from-cyan-500 to-blue-600 p-3 rounded-full border border-cyan-400/20">
            <FaUserShield className="h-10 w-10 text-white" />
          </div>
        </div>

        <h2 className="text-3xl font-bold text-white mb-2 text-center">
          Welcome Back
        </h2>
        <p className="text-gray-400 text-center mb-8">
          Sign in to access your account
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-300 mb-2"
            >
              Email Address
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <HiOutlineMail className="h-5 w-5 text-gray-500" />
              </div>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="you@example.com"
                className="w-full pl-10 pr-3 py-3 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-transparent border border-gray-700 hover:border-gray-600 transition-colors"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-300 mb-2"
            >
              Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <HiOutlineLockClosed className="h-5 w-5 text-gray-500" />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                placeholder="••••••••"
                className="w-full pl-10 pr-10 py-3 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-transparent border border-gray-700 hover:border-gray-600 transition-colors"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <FaEye className="h-5 w-5 text-gray-400 hover:text-cyan-400 transition-colors" />
                ) : (
                  <FaEyeSlash className="h-5 w-5 text-gray-400 hover:text-cyan-400 transition-colors" />
                )}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={\`w-full flex justify-center items-center py-3 px-4 rounded-lg font-semibold text-white bg-gradient-to-r from-cyan-600 to-blue-700 hover:from-cyan-500 hover:to-blue-600 transition-all duration-300 border border-cyan-500/30 \${isLoading ? "opacity-80 cursor-not-allowed" : ""}\`}
          >
            {isLoading ? (
              <>
                <ImSpinner8 className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" />
                Processing...
              </>
            ) : (
              "Login"
            )}
          </button>
        </form>

        {message && (
          <div
            className={\`mt-6 p-3 rounded-lg text-center \${message.includes("success") ? "text-emerald-400" : "text-red-400"}\`}
          >
            <div className="flex items-center justify-center space-x-2">
              {message.includes("success") ? (
                <FaCheckCircle className="h-5 w-5" />
              ) : (
                <FaExclamationCircle className="h-5 w-5" />
              )}
              <span>{message}</span>
            </div>
          </div>
        )}

        <div className="mt-6 text-center">
          <p className="text-gray-400">
            Don't have an account?{" "}
            <a
              href="#"
              className="text-cyan-400 hover:text-cyan-300 font-medium transition-colors"
            >
              Create account
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
`;

export default fullCode;

const loginCode = `import React, { useState } from "react";
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
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    otp: "",
  });
  const [step, setStep] = useState(1); // 1: email/password, 2: OTP
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSendOtp = async (e) => {
    e.preventDefault();
    setMessage("");
    setIsLoading(true);

    try {
      const verifyResponse = await axios.post(
        "Enter Your 1st Generated Api Here......",
        {
          email: formData.email,
          password: formData.password,
        }
      );

      if (verifyResponse.status === 200) {
        const otpResponse = await axios.post("Enter Your 2nd Generated Api Here......", {
          email: formData.email,
        });

        if (otpResponse.status === 200) {
          setStep(2);
          setMessage("📬 OTP sent to your email!");
        }
      }
    } catch (err) {
      setMessage(
        \`⚠️ \${err.response?.data || "Invalid email or password. Please try again."}\`
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage("");
    setIsLoading(true);

    try {
      const response = await axios.post(
        "Enter Your 3rd Generated Api Here......",
        formData
      );

      if (response.data.token) {
        setMessage("🎉 Login successful!");
      }
    } catch (err) {
      setMessage(
        \`⚠️ \${err.response?.data || "Login failed. Please try again."}\`
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
          Sign in to your account
        </p>

        {message && (
          <div
            className={\`mb-6 p-3 rounded-lg text-center \${
              message.includes("success") || message.includes("OTP sent")
                ? "text-emerald-400"
                : "text-red-400"
            }\`}
          >
            <div className="flex items-center justify-center space-x-2">
              {message.includes("success") || message.includes("OTP sent") ? (
                <FaCheckCircle className="h-5 w-5" />
              ) : (
                <FaExclamationCircle className="h-5 w-5" />
              )}
              <span>{message}</span>
            </div>
          </div>
        )}

        {step === 1 ? (
          <form onSubmit={handleSendOtp} className="space-y-6">
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
              className={\`w-full flex justify-center items-center py-3 px-4 rounded-lg font-semibold text-white bg-gradient-to-r from-cyan-600 to-blue-700 hover:from-cyan-500 hover:to-blue-600 transition-all duration-300 border border-cyan-500/30 \${
                isLoading ? "opacity-80 cursor-not-allowed" : ""
              }\`}
            >
              {isLoading ? (
                <>
                  <ImSpinner8 className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" />
                  Verifying...
                </>
              ) : (
                "Continue to OTP"
              )}
            </button>
          </form>
        ) : (
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="text-center">
              <p className="text-sm text-gray-400 mb-6">
                We've sent a 6-digit OTP to{" "}
                <span className="font-medium text-cyan-400">
                  {formData.email}
                </span>
              </p>
            </div>

            <div>
              <label
                htmlFor="otp"
                className="block text-sm font-medium text-gray-300 mb-2"
              >
                Enter OTP
              </label>
              <input
                type="text"
                id="otp"
                name="otp"
                value={formData.otp}
                onChange={handleChange}
                inputMode="numeric"
                pattern="[0-9]{6}"
                maxLength={6}
                required
                placeholder="123456"
                className="w-full px-3 py-3 text-center tracking-widest rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-transparent border border-gray-700 hover:border-gray-600 transition-colors"
              />
              <p className="mt-2 text-sm text-gray-500">
                OTP is valid for 2 minutes
              </p>
            </div>

            <div className="flex items-center justify-between">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="text-sm font-medium text-cyan-400 hover:text-cyan-300 transition-colors"
              >
                Back
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className={\`flex justify-center items-center py-2 px-6 rounded-lg font-semibold text-white bg-gradient-to-r from-cyan-600 to-blue-700 hover:from-cyan-500 hover:to-blue-600 transition-all duration-300 border border-cyan-500/30 \${
                  isLoading ? "opacity-80 cursor-not-allowed" : ""
                }\`}
              >
                {isLoading ? (
                  <>
                    <ImSpinner8 className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" />
                    Signing In...
                  </>
                ) : (
                  "Sign In"
                )}
              </button>
            </div>
          </form>
        )}

        <div className="mt-6 text-center">
          <p className="text-gray-400">
            Don't have an account?{" "}
            <button 
              className="text-cyan-400 hover:text-cyan-300 font-medium transition-colors"
            >
              Register
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;`;

export default loginCode;

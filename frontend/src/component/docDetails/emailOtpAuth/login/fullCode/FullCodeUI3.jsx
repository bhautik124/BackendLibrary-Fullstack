const fullCodeUI3 = `import React, { useState } from "react";
import axios from "axios";
import {
  FaEye,
  FaEyeSlash,
  FaCheckCircle,
  FaExclamationCircle,
  FaLeaf,
  FaSignInAlt,
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
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 flex items-center justify-center px-4 py-12 relative overflow-hidden">
      
      {/* Organic Background Shapes */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 left-10 w-64 h-64 bg-gradient-to-br from-emerald-200/30 to-teal-200/30 rounded-full filter blur-3xl animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-gradient-to-tl from-cyan-200/30 to-blue-200/30 rounded-full filter blur-3xl animate-pulse animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-teal-200/20 to-emerald-200/20 rounded-full filter blur-3xl animate-pulse animation-delay-4000"></div>
      </div>

      {/* Main Container */}
      <div className="relative w-full max-w-md">
        
        {/* Card */}
        <div className="bg-white/80 backdrop-blur-xl border border-white/60 rounded-3xl shadow-2xl shadow-emerald-500/10 overflow-hidden">
          
          {/* Header Section */}
          <div className="relative px-8 py-8 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 text-white">
            
            {/* Decorative Elements */}
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/10 to-transparent"></div>
            <div className="absolute -top-10 -right-10 w-20 h-20 bg-white/10 rounded-full"></div>
            <div className="absolute -bottom-5 -left-5 w-15 h-15 bg-white/10 rounded-full"></div>
            
            <div className="relative text-center">
              
              {/* Icon with Nature Theme */}
              <div className="inline-block relative mb-4">
                <div className="bg-white/20 backdrop-blur-sm p-4 rounded-2xl shadow-lg">
                  <FaLeaf className="h-8 w-8 text-white transform hover:rotate-12 transition-transform duration-300" />
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-300 rounded-full animate-ping"></div>
              </div>
              
              <h1 className="text-3xl font-bold mb-2 tracking-tight">
                {step === 1 ? "Welcome Back" : "Verify Access"}
              </h1>
              <p className="text-emerald-50/90 text-sm font-medium">
                {step === 1 ? "🌱 Sign in to your sanctuary" : "🔐 Enter your verification code"}
              </p>
            </div>
          </div>

          {/* Form Section */}
          <div className="px-8 py-8">
            
            {/* Message Display */}
            {message && (
              <div className={\`mb-6 p-4 rounded-2xl border-2 transition-all duration-500 transform animate-slideUp \${
                message.includes("success") || message.includes("OTP sent")
                  ? "bg-emerald-50 border-emerald-200 shadow-emerald-500/20"
                  : "bg-red-50 border-red-200 shadow-red-500/20"
              } shadow-lg\`}>
                <div className="flex items-center space-x-3">
                  {message.includes("success") || message.includes("OTP sent") ? (
                    <div className="flex-shrink-0">
                      <FaCheckCircle className="h-6 w-6 text-emerald-500" />
                    </div>
                  ) : (
                    <div className="flex-shrink-0">
                      <FaExclamationCircle className="h-6 w-6 text-red-500" />
                    </div>
                  )}
                  <span className={\`font-semibold \${
                    message.includes("success") || message.includes("OTP sent")
                      ? "text-emerald-700"
                      : "text-red-700"
                  }\`}>
                    {message}
                  </span>
                </div>
              </div>
            )}

            {step === 1 ? (
              <form onSubmit={handleSendOtp} className="space-y-5">
                
                {/* Email Field */}
                <div className="space-y-2">
                  <label className="block text-gray-700 text-sm font-semibold tracking-wide">
                    📧 Email Address
                  </label>
                  <div className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-r from-teal-500/20 to-cyan-500/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur"></div>
                    <div className="relative">
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="your.email@example.com"
                        className="w-full px-4 py-4 bg-gray-50/80 border-2 border-gray-200/50 rounded-2xl text-gray-700 placeholder-gray-400 focus:outline-none focus:border-emerald-400 focus:bg-white focus:shadow-lg focus:shadow-emerald-500/10 transition-all duration-300 hover:border-emerald-300 hover:bg-white/90"
                      />
                      <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                        <HiOutlineMail className="h-5 w-5 text-gray-400 group-focus-within:text-emerald-500 transition-colors" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Password Field */}
                <div className="space-y-2">
                  <label className="block text-gray-700 text-sm font-semibold tracking-wide">
                    🔑 Password
                  </label>
                  <div className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur"></div>
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        placeholder="Enter your password"
                        className="w-full px-4 py-4 pr-12 bg-gray-50/80 border-2 border-gray-200/50 rounded-2xl text-gray-700 placeholder-gray-400 focus:outline-none focus:border-emerald-400 focus:bg-white focus:shadow-lg focus:shadow-emerald-500/10 transition-all duration-300 hover:border-emerald-300 hover:bg-white/90"
                      />
                      <button
                        type="button"
                        className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-emerald-500 transition-colors focus:outline-none"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <FaEye className="h-5 w-5" />
                        ) : (
                          <FaEyeSlash className="h-5 w-5" />
                        )}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className={\`w-full relative overflow-hidden bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white font-bold py-4 px-6 rounded-2xl shadow-xl transform transition-all duration-300 \${isLoading ? "opacity-70 cursor-not-allowed" : "hover:scale-[1.02] hover:shadow-emerald-500/30 hover:shadow-2xl"}\`}
                >
                  
                  {/* Button Shine Effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full hover:translate-x-full transition-transform duration-700 ease-in-out"></div>
                  
                  <div className="relative flex items-center justify-center space-x-3">
                    {isLoading ? (
                      <>
                        <ImSpinner8 className="animate-spin h-5 w-5" />
                        <span className="text-lg">Verifying credentials...</span>
                      </>
                    ) : (
                      <>
                        <FaLeaf className="h-5 w-5" />
                        <span className="text-lg font-semibold tracking-wide">Send Verification Code</span>
                      </>
                    )}
                  </div>
                </button>
              </form>
            ) : (
              <form onSubmit={handleLogin} className="space-y-6">
                
                {/* OTP Info */}
                <div className="text-center">
                  <div className="bg-emerald-50 p-6 rounded-2xl border-2 border-emerald-200/50 mb-6">
                    <FaLeaf className="h-6 w-6 text-emerald-500 mx-auto mb-3" />
                    <p className="text-gray-600 text-sm">
                      🌿 A secure verification code has been sent to
                    </p>
                    <span className="font-medium text-emerald-600 block mt-2 text-lg">
                      {formData.email}
                    </span>
                  </div>
                </div>

                {/* OTP Field */}
                <div className="space-y-2">
                  <label className="block text-gray-700 text-sm font-semibold tracking-wide text-center">
                    🔐 Enter Verification Code
                  </label>
                  <div className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur"></div>
                    <div className="relative">
                      <input
                        type="text"
                        name="otp"
                        value={formData.otp}
                        onChange={handleChange}
                        inputMode="numeric"
                        pattern="[0-9]{6}"
                        maxLength={6}
                        required
                        placeholder="• • • • • •"
                        className="w-full px-4 py-6 text-center tracking-[0.5em] text-2xl font-bold bg-gray-50/80 border-2 border-gray-200/50 rounded-2xl text-gray-700 placeholder-gray-300 focus:outline-none focus:border-emerald-400 focus:bg-white focus:shadow-lg focus:shadow-emerald-500/10 transition-all duration-300 hover:border-emerald-300 hover:bg-white/90"
                      />
                    </div>
                  </div>
                  <p className="text-center text-gray-500 text-xs mt-2">
                    ⏰ Code expires in 2 minutes
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center justify-between gap-4">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="text-sm font-medium text-emerald-600 hover:text-emerald-700 transition-colors bg-emerald-50 px-6 py-3 rounded-xl border-2 border-emerald-200 hover:border-emerald-300"
                  >
                    ← Back
                  </button>
                  
                  <button
                    type="submit"
                    disabled={isLoading}
                    className={\`flex justify-center items-center py-3 px-8 rounded-2xl font-semibold text-white bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 transition-all duration-300 shadow-xl \${isLoading ? "opacity-70 cursor-not-allowed" : "hover:scale-[1.02] hover:shadow-emerald-500/30"}\`}
                  >
                    
                    {/* Button Shine Effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full hover:translate-x-full transition-transform duration-700 ease-in-out"></div>
                    
                    <div className="relative flex items-center space-x-2">
                      {isLoading ? (
                        <>
                          <ImSpinner8 className="animate-spin h-5 w-5" />
                          <span>Signing you in...</span>
                        </>
                      ) : (
                        <>
                          <FaSignInAlt className="h-5 w-5" />
                          <span>Sign In</span>
                        </>
                      )}
                    </div>
                  </button>
                </div>
              </form>
            )}

            {/* Footer */}
            <div className="mt-8 pt-6 border-t border-gray-200 text-center">
              <p className="text-gray-600 text-sm">
                🌟 Don't have an account?{" "}
                <a
                  href="#"
                  className="text-emerald-600 hover:text-emerald-700 font-semibold hover:underline transition-colors"
                >
                  Join our community
                </a>
                {" "}🌟
              </p>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{\`
        @keyframes slideUp {
          0% { transform: translateY(20px); opacity: 0; }
          100% { transform: translateY(0); opacity: 1; }
        }
        .animate-slideUp {
          animation: slideUp 0.5s ease-out;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      \`}</style>
    </div>
  );
};

export default Login;
`;

export default fullCodeUI3;
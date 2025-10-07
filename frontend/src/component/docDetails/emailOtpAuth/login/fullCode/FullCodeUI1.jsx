const fullCodeUI1 = `import React, { useState } from "react";
import axios from "axios";
import {
  FaEye,
  FaEyeSlash,
  FaCheckCircle,
  FaExclamationCircle,
  FaFingerprint,
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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center px-4 py-12 relative overflow-hidden">
      
      {/* Animated Background Blobs */}
      <div className="absolute inset-0">
        <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute top-0 -right-4 w-72 h-72 bg-cyan-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      {/* Main Container */}
      <div className="relative w-full max-w-md">
        
        {/* Glassmorphism Card */}
        <div className="bg-white/10 backdrop-blur-2xl border border-white/20 rounded-3xl shadow-2xl shadow-black/50 overflow-hidden">
          
          {/* Header Section */}
          <div className="relative px-8 py-8 bg-gradient-to-r from-purple-600/30 to-cyan-600/30 backdrop-blur-sm">
            <div className="text-center">
              
              {/* Futuristic Icon */}
              <div className="inline-block relative mb-6">
                <div className="bg-gradient-to-r from-purple-500 to-cyan-500 p-4 rounded-2xl shadow-2xl shadow-purple-500/50 transform hover:scale-105 transition-transform duration-300">
                  <FaFingerprint className="h-10 w-10 text-white animate-pulse" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-2xl blur-xl opacity-30 -z-10"></div>
              </div>
              
              <h1 className="text-3xl font-bold text-white mb-2 tracking-tight">
                {step === 1 ? "Login" : "Security Verification"}
              </h1>
            </div>
          </div>

          {/* Form Section */}
          <div className="px-8 py-8">
            
            {/* Message Display */}
            {message && (
              <div className={\`mb-6 p-4 rounded-2xl border-2 backdrop-blur-sm transition-all duration-500 transform animate-slideUp \${
                message.includes("success") || message.includes("OTP sent")
                  ? "bg-green-500/20 border-green-400/50 shadow-green-500/20"
                  : "bg-red-500/20 border-red-400/50 shadow-red-500/20"
              } shadow-lg\`}>
                <div className="flex items-center space-x-3">
                  {message.includes("success") || message.includes("OTP sent") ? (
                    <div className="flex-shrink-0">
                      <FaCheckCircle className="h-6 w-6 text-green-400" />
                    </div>
                  ) : (
                    <div className="flex-shrink-0">
                      <FaExclamationCircle className="h-6 w-6 text-red-400" />
                    </div>
                  )}
                  <span className={\`font-semibold \${
                    message.includes("success") || message.includes("OTP sent")
                      ? "text-green-300"
                      : "text-red-300"
                  }\`}>
                    {message}
                  </span>
                </div>
              </div>
            )}

            {step === 1 ? (
              <form onSubmit={handleSendOtp} className="space-y-6">
                
                {/* Email Field */}
                <div className="space-y-2">
                  <label className="block text-white/90 text-sm font-semibold tracking-wide">
                    Email id
                  </label>
                  <div className="relative group">
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="your.email@matrix.com"
                      className="w-full px-4 py-4 pr-12 bg-white/10 backdrop-blur-sm border border-white/30 rounded-2xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-cyan-400/50 focus:border-cyan-400/50 transition-all duration-300 hover:bg-white/20"
                    />
                    <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                      <HiOutlineMail className="h-5 w-5 text-white/60" />
                    </div>
                    
                    {/* Focus Ring Effect */}
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-400/0 via-cyan-400/0 to-purple-400/0 group-focus-within:from-purple-400/20 group-focus-within:via-cyan-400/20 group-focus-within:to-purple-400/20 transition-all duration-500 -z-10 blur-xl"></div>
                  </div>
                </div>

                {/* Password Field */}
                <div className="space-y-2">
                  <label className="block text-white/90 text-sm font-semibold tracking-wide">
                    Password
                  </label>
                  <div className="relative group">
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                      placeholder="Enter neural passkey"
                      className="w-full px-4 py-4 pr-12 bg-white/10 backdrop-blur-sm border border-white/30 rounded-2xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-cyan-400/50 focus:border-cyan-400/50 transition-all duration-300 hover:bg-white/20"
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-4 flex items-center text-white/60 hover:text-cyan-400 transition-colors focus:outline-none"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <FaEye className="h-5 w-5" />
                      ) : (
                        <FaEyeSlash className="h-5 w-5" />
                      )}
                    </button>
                    
                    {/* Focus Ring Effect */}
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-400/0 via-cyan-400/0 to-purple-400/0 group-focus-within:from-purple-400/20 group-focus-within:via-cyan-400/20 group-focus-within:to-purple-400/20 transition-all duration-500 -z-10 blur-xl"></div>
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className={\`w-full relative overflow-hidden bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500 text-white font-bold py-4 px-6 rounded-2xl shadow-2xl shadow-purple-500/30 transform transition-all duration-300 \${isLoading ? "opacity-70 cursor-not-allowed" : "hover:scale-[1.02] hover:shadow-purple-500/50"}\`}
                >
                  
                  {/* Button Glow Effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-2xl blur-xl opacity-30 -z-10"></div>
                  
                  {/* Button Shine Effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full hover:translate-x-full transition-transform duration-700 ease-in-out"></div>
                  
                  <div className="relative flex items-center justify-center space-x-3">
                    {isLoading ? (
                      <>
                        <ImSpinner8 className="animate-spin h-6 w-6" />
                        <span className="text-lg font-semibold tracking-wide">Verifying Neural Link...</span>
                      </>
                    ) : (
                      <>
                        <FaFingerprint className="h-6 w-6" />
                        <span className="text-lg font-semibold tracking-wide">Initialize Protocol</span>
                      </>
                    )}
                  </div>
                </button>
              </form>
            ) : (
              <form onSubmit={handleLogin} className="space-y-6">
                
                {/* OTP Info */}
                <div className="text-center">
                  <p className="text-white/70 text-sm mb-6 bg-white/10 p-4 rounded-2xl backdrop-blur-sm border border-white/20">
                    📡 Neural verification code sent to{" "}
                    <span className="font-medium text-cyan-400 block mt-1">
                      {formData.email}
                    </span>
                  </p>
                </div>

                {/* OTP Field */}
                <div className="space-y-2">
                  <label className="block text-white/90 text-sm font-semibold tracking-wide text-center">
                    Enter Neural Verification Code
                  </label>
                  <div className="relative group">
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
                      className="w-full px-4 py-6 text-center tracking-[0.5em] text-2xl font-bold bg-white/10 backdrop-blur-sm border border-white/30 rounded-2xl text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-cyan-400/50 focus:border-cyan-400/50 transition-all duration-300 hover:bg-white/20"
                    />
                    
                    {/* Focus Ring Effect */}
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-400/0 via-cyan-400/0 to-purple-400/0 group-focus-within:from-purple-400/20 group-focus-within:via-cyan-400/20 group-focus-within:to-purple-400/20 transition-all duration-500 -z-10 blur-xl"></div>
                  </div>
                  <p className="text-center text-white/50 text-xs mt-2">
                    ⏰ Code expires in 2 minutes
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center justify-between gap-4">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="text-sm font-medium text-cyan-400 hover:text-cyan-300 transition-colors bg-white/10 px-4 py-2 rounded-xl backdrop-blur-sm border border-white/20"
                  >
                    ← Back
                  </button>
                  
                  <button
                    type="submit"
                    disabled={isLoading}
                    className={\`flex justify-center items-center py-3 px-8 rounded-2xl font-semibold text-white bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500 transition-all duration-300 border border-purple-500/30 shadow-xl \${isLoading ? "opacity-70 cursor-not-allowed" : "hover:scale-[1.02] hover:shadow-purple-500/50"}\`}
                  >
                    
                    {/* Button Glow Effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-2xl blur-xl opacity-30 -z-10"></div>
                    
                    <div className="relative flex items-center space-x-2">
                      {isLoading ? (
                        <>
                          <ImSpinner8 className="animate-spin h-5 w-5" />
                          <span>Accessing System...</span>
                        </>
                      ) : (
                        <>
                          <FaSignInAlt className="h-5 w-5" />
                          <span>Access Granted</span>
                        </>
                      )}
                    </div>
                  </button>
                </div>
              </form>
            )}

            {/* Footer */}
            <div className="mt-8 pt-6 border-t border-white/20 text-center">
              <p className="text-white/70 text-sm">
                Need to establish neural link?{" "}
                <a
                  href="#"
                  className="text-cyan-400 hover:text-cyan-300 font-semibold hover:underline transition-colors"
                >
                  Register here
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{\`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        @keyframes slideUp {
          0% { transform: translateY(20px); opacity: 0; }
          100% { transform: translateY(0); opacity: 1; }
        }
        .animate-blob {
          animation: blob 7s infinite;
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

export default fullCodeUI1;
const fullCodeUI2 = `import React, { useState } from "react";
import axios from "axios";
import {
  FaEye,
  FaEyeSlash,
  FaCheckCircle,
  FaExclamationCircle,
  FaCrown,
  FaSignInAlt,
  FaStar,
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
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 flex items-center justify-center px-4 py-12 relative overflow-hidden">
      
      {/* Floating Stars Background */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(25)].map((_, i) => (
          <div
            key={i}
            className={\`absolute animate-pulse \${i % 4 === 0 ? "text-yellow-300" : i % 4 === 1 ? "text-pink-300" : i % 4 === 2 ? "text-purple-300" : "text-cyan-300"}\`}
            style={{
              left: \`\${Math.random() * 100}%\`,
              top: \`\${Math.random() * 100}%\`,
              animationDelay: \`\${Math.random() * 3}s\`,
              animationDuration: \`\${2 + Math.random() * 2}s\`,
            }}
          >
            <FaStar className={\`h-\${Math.random() > 0.5 ? 2 : 1} w-\${Math.random() > 0.5 ? 2 : 1} opacity-\${Math.random() > 0.5 ? 70 : 40}\`} />
          </div>
        ))}
      </div>

      {/* Magical Glow Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full filter blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-500/20 rounded-full filter blur-3xl animate-pulse animation-delay-2000"></div>
      </div>

      {/* Main Container */}
      <div className="relative w-full max-w-md">
        
        {/* Magical Card */}
        <div className="bg-black/40 backdrop-blur-xl border-2 border-purple-500/30 rounded-3xl shadow-2xl shadow-purple-500/25 overflow-hidden relative">
          
          {/* Magical Border Glow */}
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-purple-500/20 rounded-3xl blur-xl -z-10 animate-pulse"></div>
          
          {/* Header Section */}
          <div className="relative px-8 py-8 bg-gradient-to-r from-purple-800/50 to-pink-800/50 backdrop-blur-sm">
            <div className="text-center">
              
              {/* Magical Crown Icon */}
              <div className="inline-block relative mb-6">
                <div className="bg-gradient-to-r from-yellow-400 to-pink-500 p-4 rounded-full shadow-2xl shadow-yellow-500/50 transform hover:scale-105 transition-transform duration-300 relative">
                  <FaCrown className="h-12 w-12 text-white animate-pulse" />
                  
                  {/* Sparkle Effects */}
                  <div className="absolute -top-2 -right-2 text-yellow-300 animate-bounce">
                    <FaStar className="h-4 w-4" />
                  </div>
                  <div className="absolute -bottom-1 -left-1 text-pink-300 animate-bounce animation-delay-1000">
                    <FaStar className="h-3 w-3" />
                  </div>
                </div>
                
                {/* Crown Glow */}
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-pink-500 rounded-full blur-xl opacity-40 -z-10"></div>
              </div>
              
              <h1 className="text-3xl font-bold bg-gradient-to-r from-yellow-300 via-pink-300 to-purple-300 bg-clip-text text-transparent mb-2 tracking-tight">
                {step === 1 ? "Login" : "Crown Verification"}
              </h1>
            </div>
          </div>

          {/* Form Section */}
          <div className="px-8 py-8">
            
            {/* Message Display */}
            {message && (
              <div className={\`mb-6 p-4 rounded-2xl border-2 backdrop-blur-sm transition-all duration-500 transform animate-slideUp \${
                message.includes("success") || message.includes("OTP sent")
                  ? "bg-green-500/20 border-green-400/60 shadow-green-500/30"
                  : "bg-red-500/20 border-red-400/60 shadow-red-500/30"
              } shadow-xl\`}>
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
                  <label className="block text-purple-200 text-sm font-semibold tracking-wide flex items-center gap-2">
                    <FaStar className="h-4 w-4 text-yellow-400" />
                    Email
                  </label>
                  <div className="relative group">
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="your.royal@kingdom.magic"
                      className="w-full px-4 py-4 pr-12 bg-purple-900/30 backdrop-blur-sm border-2 border-purple-400/50 rounded-2xl text-white placeholder-purple-300/60 focus:outline-none focus:ring-2 focus:ring-pink-400/70 focus:border-pink-400/70 transition-all duration-300 hover:border-purple-300/70 hover:shadow-lg hover:shadow-purple-500/25"
                    />
                    <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                      <HiOutlineMail className="h-5 w-5 text-purple-400" />
                    </div>
                    
                    {/* Magical Shine Effect */}
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-focus:translate-x-full transition-transform duration-1000 ease-out pointer-events-none"></div>
                  </div>
                </div>

                {/* Password Field */}
                <div className="space-y-2">
                  <label className="block text-purple-200 text-sm font-semibold tracking-wide flex items-center gap-2">
                    <FaStar className="h-4 w-4 text-pink-400" />
                    Password
                  </label>
                  <div className="relative group">
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                      placeholder="Enter your royal secret"
                      className="w-full px-4 py-4 pr-12 bg-purple-900/30 backdrop-blur-sm border-2 border-purple-400/50 rounded-2xl text-white placeholder-purple-300/60 focus:outline-none focus:ring-2 focus:ring-pink-400/70 focus:border-pink-400/70 transition-all duration-300 hover:border-purple-300/70 hover:shadow-lg hover:shadow-purple-500/25"
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-4 flex items-center text-purple-400 hover:text-pink-400 transition-colors focus:outline-none"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <FaEye className="h-5 w-5" />
                      ) : (
                        <FaEyeSlash className="h-5 w-5" />
                      )}
                    </button>
                    
                    {/* Magical Shine Effect */}
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-focus:translate-x-full transition-transform duration-1000 ease-out pointer-events-none"></div>
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className={\`w-full relative overflow-hidden bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 hover:from-purple-500 hover:via-pink-500 hover:to-purple-500 text-white font-bold py-4 px-6 rounded-2xl shadow-2xl shadow-purple-500/40 transform transition-all duration-300 \${isLoading ? "opacity-70 cursor-not-allowed" : "hover:scale-[1.02] hover:shadow-purple-500/60"}\`}
                >
                  
                  {/* Multi-layer Glow Effects */}
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl blur-xl opacity-50 -z-10"></div>
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl blur-2xl opacity-30 -z-20"></div>
                  
                  {/* Magical Shine Animation */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full hover:translate-x-full transition-transform duration-1000 ease-in-out"></div>
                  
                  <div className="relative flex items-center justify-center space-x-3">
                    {isLoading ? (
                      <>
                        <ImSpinner8 className="animate-spin h-6 w-6" />
                        <span className="text-lg font-semibold tracking-wide">Casting Spell...</span>
                      </>
                    ) : (
                      <>
                        <FaCrown className="h-6 w-6" />
                        <span className="text-lg font-semibold tracking-wide">Send Otp</span>
                      </>
                    )}
                  </div>
                </button>
              </form>
            ) : (
              <form onSubmit={handleLogin} className="space-y-6">
                
                {/* OTP Info */}
                <div className="text-center">
                  <div className="bg-purple-900/30 backdrop-blur-sm p-6 rounded-2xl border-2 border-purple-400/50 mb-6">
                    <FaStar className="h-6 w-6 text-yellow-400 mx-auto mb-3 animate-pulse" />
                    <p className="text-purple-200 text-sm">
                      👑 A magical crown code has been sent to
                    </p>
                    <span className="font-medium text-pink-300 block mt-2 text-lg">
                      {formData.email}
                    </span>
                  </div>
                </div>

                {/* OTP Field */}
                <div className="space-y-2">
                  <label className="block text-purple-200 text-sm font-semibold tracking-wide text-center flex items-center justify-center gap-2">
                    <FaStar className="h-4 w-4 text-cyan-400" />
                    Enter Your Crown Code
                    <FaStar className="h-4 w-4 text-cyan-400" />
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
                      placeholder="★ ★ ★ ★ ★ ★"
                      className="w-full px-4 py-6 text-center tracking-[0.5em] text-2xl font-bold bg-purple-900/30 backdrop-blur-sm border-2 border-purple-400/50 rounded-2xl text-white placeholder-purple-300/40 focus:outline-none focus:ring-2 focus:ring-pink-400/70 focus:border-pink-400/70 transition-all duration-300 hover:border-purple-300/70 hover:shadow-lg hover:shadow-purple-500/25"
                    />
                    
                    {/* Magical Shine Effect */}
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-focus:translate-x-full transition-transform duration-1000 ease-out pointer-events-none"></div>
                  </div>
                  <p className="text-center text-purple-300/70 text-xs mt-2 flex items-center justify-center gap-1">
                    <FaStar className="h-3 w-3 text-yellow-400" />
                    Royal code expires in 2 minutes
                    <FaStar className="h-3 w-3 text-yellow-400" />
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center justify-between gap-4">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="text-sm font-medium text-pink-400 hover:text-pink-300 transition-colors bg-purple-900/30 px-6 py-3 rounded-xl backdrop-blur-sm border-2 border-purple-400/50 flex items-center gap-2"
                  >
                    <FaStar className="h-3 w-3" />
                    Back to Palace
                  </button>
                  
                  <button
                    type="submit"
                    disabled={isLoading}
                    className={\`flex justify-center items-center py-3 px-8 rounded-2xl font-semibold text-white bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 hover:from-purple-500 hover:via-pink-500 hover:to-purple-500 transition-all duration-300 border-2 border-purple-500/50 shadow-xl \${isLoading ? "opacity-70 cursor-not-allowed" : "hover:scale-[1.02] hover:shadow-purple-500/60"}\`}
                  >
                    
                    {/* Multi-layer Glow Effects */}
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl blur-xl opacity-50 -z-10"></div>
                    
                    <div className="relative flex items-center space-x-2">
                      {isLoading ? (
                        <>
                          <ImSpinner8 className="animate-spin h-5 w-5" />
                          <span>Entering Palace...</span>
                        </>
                      ) : (
                        <>
                          <FaSignInAlt className="h-5 w-5" />
                          <span>Enter Kingdom</span>
                        </>
                      )}
                    </div>
                  </button>
                </div>
              </form>
            )}

            {/* Footer */}
            <div className="mt-8 pt-6 border-t border-purple-500/30 text-center">
              <p className="text-purple-200 text-sm flex items-center justify-center gap-2">
                <FaStar className="h-3 w-3 text-yellow-400" />
                Already part of us?
                <a
                  href="#"
                  className="text-pink-400 hover:text-pink-300 font-semibold hover:underline transition-colors ml-1"
                >
                  Login from here
                </a>
                <FaStar className="h-3 w-3 text-yellow-400" />
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
        .animation-delay-1000 {
          animation-delay: 1s;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
      \`}</style>
    </div>
  );
};

export default Login;
`;

export default fullCodeUI2;
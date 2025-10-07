const fullCodeUI2 = `
import React, { useState } from "react";
import axios from "axios";
import {
  FaEye,
  FaEyeSlash,
  FaCheckCircle,
  FaExclamationCircle,
  FaGem,
  FaLock,
  FaStar,
} from "react-icons/fa";
import { HiOutlineMail, HiSparkles } from "react-icons/hi"; 
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
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 flex items-center justify-center px-4 py-12 relative overflow-hidden">
      
      {/* Floating Particles Background */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-float"
            style={{
              left: \`\${Math.random() * 100}%\`,
              top: \`\${Math.random() * 100}%\`,
              animationDelay: \`\${Math.random() * 3}s\`,
              animationDuration: \`\${3 + Math.random() * 4}s\`,
            }}
          >
            <FaStar className="text-white/10 text-xs" />
          </div>
        ))}
      </div>

      {/* Main Container */}
      <div className="relative w-full max-w-md">
        
        {/* Outer Glow Effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-pink-500/20 to-violet-500/20 rounded-3xl blur-xl"></div>
        
        {/* Main Card */}
        <div className="relative backdrop-blur-2xl bg-white/5 border border-white/10 rounded-3xl shadow-2xl overflow-hidden">
          
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-pink-500/10 via-transparent to-violet-500/10"></div>
          
          {/* Content */}
          <div className="relative p-8">
            
            {/* Header */}
            <div className="text-center mb-8">
              
              {/* Animated Icon with Multiple Layers */}
              <div className="relative inline-block mb-6">
                <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-violet-500 rounded-full animate-pulse"></div>
                <div className="relative bg-gradient-to-r from-pink-600 to-violet-600 p-4 rounded-full shadow-lg">
                  <div className="relative">
                    <FaGem className="h-8 w-8 text-white animate-bounce" />
                    <HiSparkles className="absolute -top-1 -right-1 h-4 w-4 text-yellow-300 animate-ping" />
                  </div>
                </div>
              </div>
              
              <h1 className="text-4xl font-bold bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-300 bg-clip-text text-transparent mb-3">
                Welcome Back
              </h1>
              <p className="text-purple-200/80 text-lg font-light">
                ✨ Enter your magical portal ✨
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Email Field */}
              <div className="space-y-3">
                <label className="text-white/90 text-sm font-medium tracking-wide">
                  🌟 Email Address
                </label>
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-pink-500/20 to-violet-500/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <HiOutlineMail className="h-5 w-5 text-purple-300 group-focus-within:text-pink-400 transition-colors duration-300" />
                    </div>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="your.email@example.com"
                      className="w-full pl-12 pr-4 py-4 bg-white/5 backdrop-blur-sm border border-white/20 rounded-2xl text-white placeholder-purple-300/60 focus:outline-none focus:ring-2 focus:ring-pink-400/50 focus:border-pink-400/50 transition-all duration-300 hover:bg-white/10 hover:border-white/30"
                    />
                  </div>
                </div>
              </div>

              {/* Password Field */}
              <div className="space-y-3">
                <label className="text-white/90 text-sm font-medium tracking-wide">
                  🔐 Password
                </label>
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-violet-500/20 to-pink-500/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <FaLock className="h-5 w-5 text-purple-300 group-focus-within:text-pink-400 transition-colors duration-300" />
                    </div>
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                      placeholder="Enter your secret key"
                      className="w-full pl-12 pr-12 py-4 bg-white/5 backdrop-blur-sm border border-white/20 rounded-2xl text-white placeholder-purple-300/60 focus:outline-none focus:ring-2 focus:ring-pink-400/50 focus:border-pink-400/50 transition-all duration-300 hover:bg-white/10 hover:border-white/30"
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-4 flex items-center text-purple-300 hover:text-pink-400 transition-colors duration-300"
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
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isLoading}
                  className={\`w-full relative group overflow-hidden bg-gradient-to-r from-pink-500 via-purple-500 to-violet-600 hover:from-pink-400 hover:via-purple-400 hover:to-violet-500 text-white font-bold py-5 px-6 rounded-2xl shadow-xl transform transition-all duration-500 \${isLoading ? "opacity-70 cursor-not-allowed" : "hover:scale-[1.02] hover:shadow-pink-500/25 hover:shadow-2xl"}\`}
                >
                  
                  {/* Button Glow Effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-pink-400 via-purple-400 to-violet-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"></div>
                  
                  {/* Button Content */}
                  <div className="relative flex items-center justify-center space-x-3">
                    {isLoading ? (
                      <>
                        <ImSpinner8 className="animate-spin h-5 w-5" />
                        <span className="text-lg">Casting magic spell...</span>
                      </>
                    ) : (
                      <>
                        <HiSparkles className="h-5 w-5 group-hover:animate-bounce" />
                        <span className="text-lg tracking-wide">Enter Portal</span>
                        <HiSparkles className="h-5 w-5 group-hover:animate-bounce" />
                      </>
                    )}
                  </div>
                  
                  {/* Shine Effect */}
                  <div className="absolute inset-0 -top-1 -left-1 bg-gradient-to-r from-transparent via-white/20 to-transparent rotate-12 group-hover:animate-shine"></div>
                </button>
              </div>
            </form>

            {/* Message Display */}
            {message && (
              <div className={\`mt-6 p-5 rounded-2xl backdrop-blur-sm border transition-all duration-700 transform animate-slideIn \${message.includes("success") ? "bg-emerald-500/20 border-emerald-400/40 shadow-emerald-500/20" : "bg-red-500/20 border-red-400/40 shadow-red-500/20"} shadow-lg\`}>
                <div className="flex items-center justify-center space-x-3">
                  {message.includes("success") ? (
                    <>
                      <FaCheckCircle className="h-6 w-6 text-emerald-300 animate-bounce" />
                      <HiSparkles className="h-4 w-4 text-emerald-200 animate-ping" />
                    </>
                  ) : (
                    <FaExclamationCircle className="h-6 w-6 text-red-300 animate-pulse" />
                  )}
                  <span className={\`font-semibold text-lg \${message.includes("success") ? "text-emerald-200" : "text-red-200"}\`}>
                    {message}
                  </span>
                </div>
              </div>
            )}

            {/* Footer */}
            <div className="mt-8 text-center">
              <p className="text-purple-200/70 text-sm">
                ✨ New to our magical realm?{" "}
                <a
                  href="#"
                  className="text-pink-300 hover:text-pink-200 font-semibold transition-colors duration-300 hover:underline decoration-wavy"
                >
                  Create your account
                </a>
                {" "}✨
              </p>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{\`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(180deg); }
        }
        @keyframes shine {
          0% { transform: translateX(-100%) rotate(12deg); }
          100% { transform: translateX(300%) rotate(12deg); }
        }
        @keyframes slideIn {
          0% { transform: translateY(20px); opacity: 0; }
          100% { transform: translateY(0); opacity: 1; }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .animate-shine {
          animation: shine 1s ease-out;
        }
        .animate-slideIn {
          animation: slideIn 0.5s ease-out;
        }
      \`}</style>
    </div>
  );
};

export default Login;
`;
export default fullCodeUI2;

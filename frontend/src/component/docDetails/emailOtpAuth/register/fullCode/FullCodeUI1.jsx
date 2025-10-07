const fullCodeUI1 = `import React, { useState } from "react";
import axios from "axios";
import {
  FaEye,
  FaEyeSlash,
  FaCheckCircle,
  FaExclamationCircle,
  FaFingerprint,
  FaUserPlus,
  FaUser,
} from "react-icons/fa";
import { HiOutlineMail, HiOutlineLockClosed } from "react-icons/hi";
import { ImSpinner8 } from "react-icons/im";

const Register = () => {
  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    password: "",
  });
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

      if (response.status === 201) {
        setMessage("🎉 Registration successful!");
      }
    } catch (err) {
      const errorData = err.response?.data;
      setMessage(
        typeof errorData === "string"
          ? \`⚠️ \${errorData}\`
          : errorData?.message ||
              "⚠️ Registration failed. Please check your input and try again."
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
      <div className="relative w-full max-w-lg">
        
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
              
              <h1 className="text-4xl font-bold text-white mb-3 tracking-tight">
                Register
              </h1>
            </div>
          </div>

          {/* Form Section */}
          <div className="px-8 py-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Username Field */}
              <div className="space-y-2">
                <label className="block text-white/90 text-sm font-semibold tracking-wide">
                  Name
                </label>
                <div className="relative group">
                  <input
                    type="text"
                    name="userName"
                    value={formData.userName}
                    onChange={handleChange}
                    required
                    placeholder="Enter your username"
                    className="w-full px-4 py-4 pr-12 bg-white/10 backdrop-blur-sm border border-white/30 rounded-2xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-cyan-400/50 focus:border-cyan-400/50 transition-all duration-300 hover:bg-white/20"
                  />
                  <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                    <FaUser className="h-5 w-5 text-white/60" />
                  </div>
                  
                  {/* Focus Ring Effect */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-400/0 via-cyan-400/0 to-purple-400/0 group-focus-within:from-purple-400/20 group-focus-within:via-cyan-400/20 group-focus-within:to-purple-400/20 transition-all duration-500 -z-10 blur-xl"></div>
                </div>
              </div>

              {/* Email Field */}
              <div className="space-y-2">
                <label className="block text-white/90 text-sm font-semibold tracking-wide">
                  Email Address
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
                      <span className="text-lg font-semibold tracking-wide">Initializing Neural Link...</span>
                    </>
                  ) : (
                    <>
                      <FaUserPlus className="h-6 w-6" />
                      <span className="text-lg font-semibold tracking-wide">Register</span>
                    </>
                  )}
                </div>
              </button>
            </form>

            {/* Message Display */}
            {message && (
              <div className={\`mt-6 p-4 rounded-2xl border-2 backdrop-blur-sm transition-all duration-500 transform animate-slideUp \${message.includes("success") ? "bg-green-500/20 border-green-400/50 shadow-green-500/20" : "bg-red-500/20 border-red-400/50 shadow-red-500/20"} shadow-lg\`}>
                <div className="flex items-center space-x-3">
                  {message.includes("success") ? (
                    <div className="flex-shrink-0">
                      <FaCheckCircle className="h-6 w-6 text-green-400" />
                    </div>
                  ) : (
                    <div className="flex-shrink-0">
                      <FaExclamationCircle className="h-6 w-6 text-red-400" />
                    </div>
                  )}
                  <span className={\`font-semibold \${message.includes("success") ? "text-green-300" : "text-red-300"}\`}>
                    {message}
                  </span>
                </div>
              </div>
            )}

            {/* Footer */}
            <div className="mt-8 pt-6 border-t border-white/20 text-center">
              <p className="text-white/70 text-sm">
                Already connected to the matrix?{" "}
                <a
                  href="#"
                  className="text-cyan-400 hover:text-cyan-300 font-semibold hover:underline transition-colors"
                >
                  Login your account
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

export default Register;
`;

export default fullCodeUI1;

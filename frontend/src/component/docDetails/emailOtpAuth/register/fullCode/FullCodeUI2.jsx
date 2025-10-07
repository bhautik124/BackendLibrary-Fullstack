const fullCodeUI2 = `import React, { useState } from "react";
import axios from "axios";
import {
  FaEye,
  FaEyeSlash,
  FaCheckCircle,
  FaExclamationCircle,
  FaCrown,
  FaUserPlus,
  FaUser,
  FaStar,
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
      <div className="relative w-full max-w-lg">
        
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
              
              <h1 className="text-4xl font-bold bg-gradient-to-r from-yellow-300 via-pink-300 to-purple-300 bg-clip-text text-transparent mb-3 tracking-tight">
                Register
              </h1>
            </div>
          </div>

          {/* Form Section */}
          <div className="px-8 py-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Username Field */}
              <div className="space-y-2">
                <label className="block text-purple-200 text-sm font-semibold tracking-wide flex items-center gap-2">
                  <FaStar className="h-4 w-4 text-yellow-400" />
                  Name
                </label>
                <div className="relative group">
                  <input
                    type="text"
                    name="userName"
                    value={formData.userName}
                    onChange={handleChange}
                    required
                    placeholder="Enter your royal name"
                    className="w-full px-4 py-4 pr-12 bg-purple-900/30 backdrop-blur-sm border-2 border-purple-400/50 rounded-2xl text-white placeholder-purple-300/60 focus:outline-none focus:ring-2 focus:ring-pink-400/70 focus:border-pink-400/70 transition-all duration-300 hover:border-purple-300/70 hover:shadow-lg hover:shadow-purple-500/25"
                  />
                  <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                    <FaUser className="h-5 w-5 text-purple-400" />
                  </div>
                  
                  {/* Magical Shine Effect */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-focus:translate-x-full transition-transform duration-1000 ease-out pointer-events-none"></div>
                </div>
              </div>

              {/* Email Field */}
              <div className="space-y-2">
                <label className="block text-purple-200 text-sm font-semibold tracking-wide flex items-center gap-2">
                  <FaStar className="h-4 w-4 text-pink-400" />
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
                  <FaStar className="h-4 w-4 text-cyan-400" />
                  Password
                </label>
                <div className="relative group">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    placeholder="Cast your magical password"
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
                      <span className="text-lg font-semibold tracking-wide">Casting Royal Spell...</span>
                    </>
                  ) : (
                    <>
                      <FaUserPlus className="h-6 w-6" />
                      <span className="text-lg font-semibold tracking-wide">Join us!</span>
                    </>
                  )}
                </div>
              </button>
            </form>

            {/* Message Display */}
            {message && (
              <div className={\`mt-6 p-4 rounded-2xl border-2 backdrop-blur-sm transition-all duration-500 transform animate-slideUp \${message.includes("success") ? "bg-green-500/20 border-green-400/60 shadow-green-500/30" : "bg-red-500/20 border-red-400/60 shadow-red-500/30"} shadow-xl\`}>
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
            <div className="mt-8 pt-6 border-t border-purple-500/30 text-center">
              <p className="text-purple-200 text-sm flex items-center justify-center gap-2">
                <FaStar className="h-3 w-3 text-yellow-400" />
                Already part of us?
                <a
                  href="#"
                  className="text-pink-400 hover:text-pink-300 font-semibold hover:underline transition-colors ml-1"
                >
                  login from here
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

export default Register;
`;

export default fullCodeUI2;
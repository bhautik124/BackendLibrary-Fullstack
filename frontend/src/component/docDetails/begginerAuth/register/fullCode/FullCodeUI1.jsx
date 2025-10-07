const fullCodeUI1 = `import React, { useState } from "react";
import axios from "axios";
import {
  FaEye,
  FaEyeSlash,
  FaCheckCircle,
  FaExclamationCircle,
  FaFingerprint,
  FaShieldAlt,
  FaUser,
} from "react-icons/fa";
import { HiOutlineLockClosed, HiOutlineMail } from "react-icons/hi";
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
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute top-40 left-40 w-80 h-80 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>

      {/* Main Card */}
      <div className="relative w-full max-w-md">
        {/* Glassmorphism Card */}
        <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl shadow-2xl overflow-hidden">
          
          {/* Header with Animated Icon */}
          <div className="relative px-8 pt-8 pb-6 text-center">
            <div className="relative inline-block">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-600 rounded-full animate-pulse"></div>
              <div className="relative bg-gradient-to-r from-cyan-500 to-blue-700 p-4 rounded-full shadow-lg transform hover:scale-110 transition-transform duration-300">
                <FaFingerprint className="h-8 w-8 text-white" />
              </div>
            </div>
            
            <h2 className="text-3xl font-bold text-white mt-4 mb-2 tracking-tight">
              Join the Future
            </h2>
            <p className="text-blue-200/80 text-sm">
              Create your secure account
            </p>
          </div>

          {/* Form Section */}
          <div className="px-8 pb-8">
            <form onSubmit={handleSubmit} className="space-y-5">
              
              {/* Username Field */}
              <div className="space-y-2">
                <label className="text-white/90 text-sm font-medium">
                  Username
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-colors group-focus-within:text-cyan-400">
                    <FaUser className="h-5 w-5 text-white/50" />
                  </div>
                  <input
                    type="text"
                    name="userName"
                    value={formData.userName}
                    onChange={handleChange}
                    required
                    placeholder="Enter your username"
                    className="w-full pl-12 pr-4 py-4 bg-white/5 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-cyan-400/50 focus:border-cyan-400/50 transition-all duration-300 hover:bg-white/10"
                  />
                </div>
              </div>

              {/* Email Field */}
              <div className="space-y-2">
                <label className="text-white/90 text-sm font-medium">
                  Email Address
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-colors group-focus-within:text-cyan-400">
                    <HiOutlineMail className="h-5 w-5 text-white/50" />
                  </div>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="Enter your email"
                    className="w-full pl-12 pr-4 py-4 bg-white/5 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-cyan-400/50 focus:border-cyan-400/50 transition-all duration-300 hover:bg-white/10"
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <label className="text-white/90 text-sm font-medium">
                  Password
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-colors group-focus-within:text-cyan-400">
                    <HiOutlineLockClosed className="h-5 w-5 text-white/50" />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    placeholder="Enter your password"
                    className="w-full pl-12 pr-12 py-4 bg-white/5 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-cyan-400/50 focus:border-cyan-400/50 transition-all duration-300 hover:bg-white/10"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-white/50 hover:text-cyan-400 transition-colors"
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

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className={\`w-full relative overflow-hidden bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-semibold py-4 px-6 rounded-xl shadow-lg transform transition-all duration-300 \${isLoading ? "opacity-70 cursor-not-allowed" : "hover:scale-[1.02] hover:shadow-cyan-500/25 hover:shadow-2xl"}\`}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-500 opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative flex items-center justify-center">
                  {isLoading ? (
                    <>
                      <ImSpinner8 className="animate-spin mr-3 h-5 w-5" />
                      <span>Creating Account...</span>
                    </>
                  ) : (
                    <>
                      <FaShieldAlt className="mr-3 h-5 w-5" />
                      <span>Create Account</span>
                    </>
                  )}
                </div>
              </button>
            </form>

            {/* Message Display */}
            {message && (
              <div className={\`mt-6 p-4 rounded-xl backdrop-blur-sm border transition-all duration-500 transform \${message.includes("success") ? "bg-emerald-500/20 border-emerald-400/30 translate-y-0 opacity-100" : "bg-red-500/20 border-red-400/30 translate-y-0 opacity-100"}\`}>
                <div className="flex items-center justify-center space-x-3">
                  {message.includes("success") ? (
                    <FaCheckCircle className="h-5 w-5 text-emerald-300" />
                  ) : (
                    <FaExclamationCircle className="h-5 w-5 text-red-300" />
                  )}
                  <span className={\`font-medium \${message.includes("success") ? "text-emerald-200" : "text-red-200"}\`}>
                    {message}
                  </span>
                </div>
              </div>
            )}

            {/* Footer */}
            <div className="mt-8 text-center">
              <p className="text-white/60 text-sm">
                Already have an account?{" "}
                <a
                  href="#"
                  className="text-cyan-400 hover:text-cyan-300 font-semibold transition-colors hover:underline"
                >
                  Sign in here
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
        .animate-blob {
          animation: blob 7s infinite;
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
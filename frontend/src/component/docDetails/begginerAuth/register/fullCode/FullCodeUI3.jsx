const fullCodeUI3 = `import React, { useState } from "react";
import axios from "axios";
import {
  FaEye,
  FaEyeSlash,
  FaCheckCircle,
  FaExclamationCircle,
  FaLeaf,
  FaSignInAlt,
  FaUser,
  FaUserPlus,
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
                Join Our Community
              </h1>
              <p className="text-emerald-50/90 text-sm font-medium">
                🌱 Start your journey with us today
              </p>
            </div>
          </div>

          {/* Form Section */}
          <div className="px-8 py-8">
            <form onSubmit={handleSubmit} className="space-y-5">
              
              {/* Username Field */}
              <div className="space-y-2">
                <label className="block text-gray-700 text-sm font-semibold tracking-wide">
                  👤 Username
                </label>
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur"></div>
                  <div className="relative">
                    <input
                      type="text"
                      name="userName"
                      value={formData.userName}
                      onChange={handleChange}
                      required
                      placeholder="Choose your username"
                      className="w-full px-4 py-4 bg-gray-50/80 border-2 border-gray-200/50 rounded-2xl text-gray-700 placeholder-gray-400 focus:outline-none focus:border-emerald-400 focus:bg-white focus:shadow-lg focus:shadow-emerald-500/10 transition-all duration-300 hover:border-emerald-300 hover:bg-white/90"
                    />
                    <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                      <FaUser className="h-5 w-5 text-gray-400 group-focus-within:text-emerald-500 transition-colors" />
                    </div>
                  </div>
                </div>
              </div>

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
                      placeholder="Create a strong password"
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

              {/* Terms and Conditions */}
              <div className="flex items-start space-x-3 py-2">
                <input
                  type="checkbox"
                  id="terms"
                  required
                  className="w-4 h-4 mt-1 text-emerald-500 bg-gray-100 border-gray-300 rounded focus:ring-emerald-500 focus:ring-2 transition-colors"
                />
                <label htmlFor="terms" className="text-sm text-gray-600 leading-relaxed">
                  I agree to the{" "}
                  <a href="#" className="text-emerald-600 hover:text-emerald-700 font-medium hover:underline">
                    Terms of Service
                  </a>{" "}
                  and{" "}
                  <a href="#" className="text-emerald-600 hover:text-emerald-700 font-medium hover:underline">
                    Privacy Policy
                  </a>
                </label>
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
                      <span className="text-lg">Creating your account...</span>
                    </>
                  ) : (
                    <>
                      <FaUserPlus className="h-5 w-5" />
                      <span className="text-lg font-semibold tracking-wide">Create Account</span>
                    </>
                  )}
                </div>
              </button>
            </form>

            {/* Message Display */}
            {message && (
              <div className={\`mt-6 p-4 rounded-2xl border-2 transition-all duration-500 transform animate-slideUp \${message.includes("success") ? "bg-emerald-50 border-emerald-200 shadow-emerald-500/20" : "bg-red-50 border-red-200 shadow-red-500/20"} shadow-lg\`}>
                <div className="flex items-center space-x-3">
                  {message.includes("success") ? (
                    <div className="flex-shrink-0">
                      <FaCheckCircle className="h-6 w-6 text-emerald-500" />
                    </div>
                  ) : (
                    <div className="flex-shrink-0">
                      <FaExclamationCircle className="h-6 w-6 text-red-500" />
                    </div>
                  )}
                  <span className={\`font-semibold \${message.includes("success") ? "text-emerald-700" : "text-red-700"}\`}>
                    {message}
                  </span>
                </div>
              </div>
            )}

            {/* Footer */}
            <div className="mt-8 pt-6 border-t border-gray-200 text-center">
              <p className="text-gray-600 text-sm">
                🌟 Already have an account?{" "}
                <a
                  href="#"
                  className="text-emerald-600 hover:text-emerald-700 font-semibold hover:underline transition-colors"
                >
                  Sign in here
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

export default Register;
`;

export default fullCodeUI3;
const FullCodeUI2 = `
import React, { useState } from "react";
import axios from "axios";
import { FaEye, FaEyeSlash, FaCrown, FaStar, FaGem } from "react-icons/fa";

const Register = () => {
  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    password: "",
    role: "user",
  });

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
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
    setLoading(true);

    try {
      const res = await axios.post(
        "Enter Your Generated Api Here......",
        formData,
        { withCredentials: true }
      );
      console.log("User Registered:", res.data);
      setMessage("Registration successful!");
    } catch (err) {
      console.error("Error:", err.response?.data || err.message);
      setMessage(err.response?.data || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-purple-900 via-pink-900 to-rose-900 px-4">
      {/* Floating Stars */}
      {[...Array(30)].map((_, i) => (
        <div
          key={i}
          className="absolute text-yellow-300/40 animate-pulse"
          style={{
            left: \`\${Math.random() * 100}%\`,
            top: \`\${Math.random() * 100}%\`,
            animationDelay: \`\${Math.random() * 3}s\`,
            fontSize: \`\${0.5 + Math.random() * 1}rem\`
          }}
        >
          ✨
        </div>
      ))}

      {/* Royal Registration Palace */}
      <div className="relative z-10 backdrop-blur-xl bg-gradient-to-br from-purple-800/30 to-pink-800/30 border-2 border-yellow-300/30 rounded-3xl p-10 shadow-2xl max-w-md w-full">
        {/* Golden Border Glow */}
        <div className="absolute -inset-1 bg-gradient-to-br from-yellow-300 via-yellow-400 to-yellow-300 rounded-3xl opacity-20 blur animate-pulse"></div>
        
        {/* Royal Header */}
        <div className="relative text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="relative">
              <div className="w-20 h-20 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center shadow-xl">
                <FaCrown className="text-3xl text-purple-900" />
              </div>
              <div className="absolute -inset-2 bg-gradient-to-br from-yellow-300 to-yellow-500 rounded-full opacity-40 blur-lg animate-pulse"></div>
            </div>
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-yellow-300 to-yellow-500 bg-clip-text text-transparent mb-2">
            Registration 
          </h1>
          <p className="text-purple-200 text-sm">Join the kingdom's distinguished members</p>
        </div>

        {/* Magical Divider */}
        <div className="flex items-center justify-center gap-2 mb-6">
          <div className="w-12 h-px bg-gradient-to-r from-transparent via-yellow-300 to-transparent"></div>
          <FaGem className="text-yellow-300 animate-spin text-xs" style={{animationDuration: '4s'}} />
          <div className="w-12 h-px bg-gradient-to-r from-transparent via-yellow-300 to-transparent"></div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Royal Name Field */}
          <div className="relative group">
            <input
              type="text"
              name="userName"
              placeholder="Your Name"
              value={formData.userName}
              onChange={handleChange}
              className="w-full px-5 py-4 rounded-2xl bg-purple-900/40 border-2 border-yellow-400/30 focus:outline-none focus:border-yellow-400 text-white placeholder:text-purple-200/70 backdrop-blur-sm transition-all duration-300 group-hover:border-yellow-400/50"
              required
            />
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-yellow-400/5 to-pink-400/5 pointer-events-none"></div>
          </div>

          {/* Royal Email Field */}
          <div className="relative group">
            <input
              type="email"
              name="email"
              placeholder="Your Email Address"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-5 py-4 rounded-2xl bg-purple-900/40 border-2 border-yellow-400/30 focus:outline-none focus:border-yellow-400 text-white placeholder:text-purple-200/70 backdrop-blur-sm transition-all duration-300 group-hover:border-yellow-400/50"
              required
            />
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-yellow-400/5 to-pink-400/5 pointer-events-none"></div>
          </div>

          {/* Royal Password Field */}
          <div className="relative group">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Passcode"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-5 py-4 pr-14 rounded-2xl bg-purple-900/40 border-2 border-yellow-400/30 focus:outline-none focus:border-yellow-400 text-white placeholder:text-purple-200/70 backdrop-blur-sm transition-all duration-300 group-hover:border-yellow-400/50"
              required
            />
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-yellow-400/5 to-pink-400/5 pointer-events-none"></div>
            <div
              className="absolute top-4 right-5 text-yellow-400 cursor-pointer hover:text-yellow-300 transition-colors z-10"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? <FaEyeSlash className="text-lg" /> : <FaEye className="text-lg" />}
            </div>
          </div>

          {/* Royal Title Selection */}
          <div className="relative group">
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full px-5 py-4 rounded-2xl bg-purple-900/40 border-2 border-yellow-400/30 focus:outline-none focus:border-yellow-400 text-white backdrop-blur-sm appearance-none cursor-pointer transition-all duration-300 group-hover:border-yellow-400/50"
            >
              <option value="user" className="bg-purple-900">Citizen</option>
              <option value="admin" className="bg-purple-900">Administrator</option>
            </select>
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-yellow-400/5 to-pink-400/5 pointer-events-none"></div>
            <FaStar className="absolute top-4 right-5 text-yellow-400 pointer-events-none animate-pulse" />
          </div>

          {/* Royal Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className={\`w-full py-4 rounded-2xl text-purple-900 font-bold text-lg transition-all duration-300 relative overflow-hidden \${
              loading
                ? "bg-gradient-to-r from-gray-400 to-gray-500 cursor-not-allowed"
                : "bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-300 hover:to-yellow-400 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-yellow-400/25"
            }\`}
          >
            {loading ? (
              <div className="flex items-center justify-center gap-3">
                <div className="w-5 h-5 border-2 border-t-transparent border-purple-900 rounded-full animate-spin"></div>
                <span>Royal Decree in Progress...</span>
              </div>
            ) : (
              <span>Join the Royal Court</span>
            )}
            <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/30 to-white/0 transform -skew-x-12 translate-x-[-100%] hover:translate-x-[100%] transition-transform duration-1000"></div>
          </button>

          {/* Royal Message */}
          {message && (
            <div
              className={\`mt-4 p-4 rounded-2xl text-center font-medium backdrop-blur-sm border-2 \${
                message.toLowerCase().includes("success")
                  ? "bg-green-500/20 border-green-400/40 text-green-300"
                  : "bg-red-500/20 border-red-400/40 text-red-300"
              }\`}
            >
              {message}
            </div>
          )}
        </form>
        {/* Sparkle Effects */}
        <div className="absolute top-6 right-6 text-yellow-300/60 animate-pulse">✨</div>
        <div className="absolute bottom-6 left-6 text-yellow-300/60 animate-pulse delay-500">🌟</div>
        <div className="absolute top-1/3 right-8 text-yellow-300/40 animate-pulse delay-1000">⭐</div>
        <div className="absolute bottom-1/3 left-8 text-yellow-300/40 animate-pulse delay-1500">💎</div>
      </div>

      {/* Magical Aura */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-yellow-300/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-pink-300/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>
    </div>
  );
};

export default Register;
`;

export default FullCodeUI2;
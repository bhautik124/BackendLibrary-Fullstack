const FullCodeUI1 = `
import React, { useState } from "react";
import axios from "axios";
import { FaEye, FaEyeSlash, FaFingerprint, FaShieldAlt, FaUserPlus } from "react-icons/fa";

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
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 px-4">
      {/* Animated Background Blobs */}
      <div className="absolute top-20 left-20 w-32 h-32 bg-cyan-500/20 rounded-full blur-xl animate-pulse"></div>
      <div className="absolute bottom-20 right-20 w-40 h-40 bg-purple-500/20 rounded-full blur-xl animate-pulse delay-1000"></div>
      <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-blue-500/20 rounded-full blur-xl animate-pulse delay-500"></div>

      {/* Neural Registration Card */}
      <div className="relative z-10 backdrop-blur-lg bg-white/10 border border-white/20 rounded-3xl p-8 shadow-2xl max-w-md w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="relative">
              <div className="w-16 h-16 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-full flex items-center justify-center shadow-lg">
                <FaUserPlus className="text-2xl text-white" />
              </div>
              <div className="absolute -inset-1 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-full opacity-30 blur animate-pulse"></div>
            </div>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Account Registration</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Username Field */}
          <div className="relative">
            <input
              type="text"
              name="userName"
              placeholder="Username"
              value={formData.userName}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl bg-black/40 border border-cyan-500/30 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent text-white placeholder:text-cyan-300/60 backdrop-blur-sm transition-all duration-300"
              required
            />
            <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-cyan-500/10 to-blue-500/10 pointer-events-none"></div>
          </div>

          {/* Email Field */}
          <div className="relative">
            <input
              type="email"
              name="email"
              placeholder="Digital Identity Mail"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl bg-black/40 border border-cyan-500/30 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent text-white placeholder:text-cyan-300/60 backdrop-blur-sm transition-all duration-300"
              required
            />
            <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-cyan-500/10 to-blue-500/10 pointer-events-none"></div>
          </div>

          {/* Password Field */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Enter Passcode"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-3 pr-12 rounded-xl bg-black/40 border border-cyan-500/30 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent text-white placeholder:text-cyan-300/60 backdrop-blur-sm transition-all duration-300"
              required
            />
            <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-cyan-500/10 to-blue-500/10 pointer-events-none"></div>
            <div
              className="absolute top-3.5 right-4 text-cyan-400 cursor-pointer hover:text-cyan-300 transition-colors z-10"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </div>
          </div>

          {/* Role Selection */}
          <div className="relative">
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl bg-black/40 border border-cyan-500/30 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent text-white backdrop-blur-sm appearance-none cursor-pointer transition-all duration-300"
            >
              <option value="user" className="bg-slate-900">User</option>
              <option value="admin" className="bg-slate-900">Administrator</option>
            </select>
            <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-cyan-500/10 to-blue-500/10 pointer-events-none"></div>
            <FaFingerprint className="absolute top-3.5 right-4 text-cyan-400 pointer-events-none" />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className={\`w-full py-3 rounded-xl text-white font-semibold transition-all duration-300 relative overflow-hidden \${
              loading
                ? "bg-gradient-to-r from-slate-600 to-slate-700 cursor-not-allowed"
                : "bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 transform hover:scale-[1.02] active:scale-[0.98]"
            }\`}
          >
            {loading ? (
              <div className="flex items-center justify-center gap-2">
                <div className="w-4 h-4 border-2 border-t-transparent border-white rounded-full animate-spin"></div>
                <span>Processing Neural Scan...</span>
              </div>
            ) : (
              <span>Initialize Registration</span>
            )}
            <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 transform -skew-x-12 translate-x-[-100%] hover:translate-x-[100%] transition-transform duration-1000"></div>
          </button>

          {/* Status Message */}
          {message && (
            <div
              className={\`mt-4 p-3 rounded-xl text-center text-sm font-medium backdrop-blur-sm \${
                message.toLowerCase().includes("success")
                  ? "bg-green-500/20 border border-green-400/30 text-green-300"
                  : "bg-red-500/20 border border-red-400/30 text-red-300"
              }\`}
            >
              {message}
            </div>
          )}
        </form>

        {/* Footer */}
        <div className="text-center text-xs text-slate-300 mt-6 space-y-2">
          <p className="flex items-center justify-center gap-2">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
            <span>Secure neural pathway established</span>
          </p>
          <p>Your digital consciousness is being crafted...</p>
        </div>
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-cyan-400/30 rounded-full animate-ping"
            style={{
              left: \`\${Math.random() * 100}%\`,
              top: \`\${Math.random() * 100}%\`,
              animationDelay: \`\${Math.random() * 2}s\`,
              animationDuration: \`\${2 + Math.random() * 2}s\`
            }}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default Register;
`;

export default FullCodeUI1;
const FullCodeUI3 = `
import React, { useState } from "react";
import axios from "axios";
import { FaEye, FaEyeSlash, FaLeaf, FaTree, FaLock } from "react-icons/fa";

const Login = () => {
  const [formData, setFormData] = useState({
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
      console.log("User Logged In:", res.data);
      setMessage("Login successful!");
      // You can redirect or set auth state here
    } catch (err) {
      console.error("Error:", err.response?.data || err.message);
      setMessage(err.response?.data || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-green-900 via-emerald-900 to-teal-900 px-4">
      {/* Organic Background Shapes */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-green-500/10 rounded-full blur-3xl"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-teal-500/5 rounded-full blur-3xl"></div>

      {/* Eco Sanctuary Gateway */}
      <div className="relative z-10 backdrop-blur-lg bg-emerald-800/20 border border-emerald-400/30 rounded-3xl p-8 shadow-2xl max-w-md w-full">
        {/* Nature Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="relative">
              <div className="w-18 h-18 bg-gradient-to-br from-emerald-400 to-green-600 rounded-full flex items-center justify-center shadow-lg p-4">
                <FaLock className="text-2xl text-white" />
              </div>
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-400/60 rounded-full animate-pulse"></div>
              <div className="absolute -bottom-1 -left-1 w-4 h-4 bg-emerald-400/60 rounded-full animate-pulse delay-500"></div>
            </div>
          </div>
          <h1 className="text-3xl font-bold text-emerald-100 mb-2">Eco Sanctuary</h1>
          <p className="text-emerald-300 text-sm">Enter the digital forest sanctuary</p>
        </div>

        {/* Nature Stats */}
        <div className="flex items-center justify-center gap-4 mb-6 text-xs text-emerald-200">
          <div className="flex items-center gap-1">
            <FaTree className="text-green-400" />
            <span>Carbon Neutral</span>
          </div>
          <div className="w-px h-4 bg-emerald-400/30"></div>
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span>Eco-Secured</span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email Field */}
          <div className="relative group">
            <input
              type="email"
              name="email"
              placeholder="Your Forest Email Address"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-2xl bg-green-900/30 border-2 border-emerald-500/40 focus:outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/20 text-white placeholder:text-emerald-200/60 backdrop-blur-sm transition-all duration-300"
              required
            />
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-emerald-400/5 to-green-400/5 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>

          {/* Password Field */}
          <div className="relative group">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Secret Garden Key"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-3 pr-12 rounded-2xl bg-green-900/30 border-2 border-emerald-500/40 focus:outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/20 text-white placeholder:text-emerald-200/60 backdrop-blur-sm transition-all duration-300"
              required
            />
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-emerald-400/5 to-green-400/5 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div
              className="absolute top-3.5 right-4 text-emerald-400 cursor-pointer hover:text-emerald-300 transition-colors z-10"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </div>
          </div>

          {/* Role Selection */}
          <div className="relative group">
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-2xl bg-green-900/30 border-2 border-emerald-500/40 focus:outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/20 text-white backdrop-blur-sm appearance-none cursor-pointer transition-all duration-300"
            >
              <option value="user" className="bg-green-900">Community Member</option>
              <option value="admin" className="bg-green-900">Forest Guardian</option>
            </select>
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-emerald-400/5 to-green-400/5 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <FaLeaf className="absolute top-3.5 right-4 text-emerald-400 pointer-events-none animate-pulse" />
          </div>

          {/* Nature Access Button */}
          <button
            type="submit"
            disabled={loading}
            className={\`w-full py-3 rounded-2xl text-white font-semibold text-lg transition-all duration-300 relative overflow-hidden \${
              loading
                ? "bg-gradient-to-r from-gray-600 to-gray-700 cursor-not-allowed"
                : "bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-400 hover:to-green-500 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-emerald-500/25"
            }\`}
          >
            {loading ? (
              <div className="flex items-center justify-center gap-2">
                <div className="w-4 h-4 border-2 border-t-transparent border-white rounded-full animate-spin"></div>
                <span>Accessing Sanctuary...</span>
              </div>
            ) : (
              <span>Enter the Forest</span>
            )}
            <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 transform -skew-x-12 translate-x-[-100%] hover:translate-x-[100%] transition-transform duration-1000"></div>
          </button>

          {/* Status Message */}
          {message && (
            <div
              className={\`mt-4 p-3 rounded-2xl text-center font-medium backdrop-blur-sm border-2 \${
                message.toLowerCase().includes("success")
                  ? "bg-green-500/20 border-green-400/40 text-green-300"
                  : "bg-red-500/20 border-red-400/40 text-red-300"
              }\`}
            >
              {message}
            </div>
          )}
        </form>

        {/* Eco Footer */}
        <div className="text-center text-xs text-emerald-200 mt-6 space-y-2">
          <p className="flex items-center justify-center gap-2">
            <span>🌱</span>
            <span>Powered by clean energy</span>
            <span>🌍</span>
          </p>
          <p className="text-emerald-300">Your login supports our digital reforestation project</p>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-6 right-6 text-emerald-300/40 animate-bounce text-lg">🍃</div>
        <div className="absolute bottom-6 left-6 text-green-300/40 animate-bounce delay-700 text-sm">🌿</div>
        <div className="absolute top-1/3 left-4 text-emerald-400/30 animate-bounce delay-1000 text-xs">🌱</div>
        <div className="absolute bottom-1/3 right-4 text-green-400/30 animate-bounce delay-300 text-sm">🌳</div>
      </div>

      {/* Flowing Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute text-emerald-400/20 animate-float"
            style={{
              left: \`\${Math.random() * 100}%\`,
              top: \`\${Math.random() * 100}%\`,
              animationDelay: \`\${Math.random() * 3}s\`,
              animationDuration: \`\${3 + Math.random() * 2}s\`
            }}
          >
            {['🌿', '🍃', '🌱', '🌳'][Math.floor(Math.random() * 4)]}
          </div>
        ))}
      </div>

      <style jsx>{\`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); opacity: 0.3; }
          50% { transform: translateY(-20px) rotate(5deg); opacity: 0.6; }
        }
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
      \`}</style>
    </div>
  );
};

export default Login;
`;

export default FullCodeUI3;
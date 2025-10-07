const fullCode = `import React, { useState } from "react";
import axios from "axios";
import { FaEye, FaEyeSlash } from "react-icons/fa";

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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-zinc-800 p-8 rounded-2xl shadow-2xl max-w-md w-full border border-zinc-700"
      >
        <h1 className="text-3xl font-bold mb-6 text-center text-white">
          Create an Account
        </h1>

        <div className="space-y-4">
          <input
            type="text"
            name="userName"
            placeholder="Username"
            value={formData.userName}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-lg bg-zinc-700 border border-zinc-600 focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder:text-zinc-400"
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-lg bg-zinc-700 border border-zinc-600 focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder:text-zinc-400"
            required
          />

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 pr-10 rounded-lg bg-zinc-700 border border-zinc-600 focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder:text-zinc-400"
              required
            />
            <div
              className="absolute top-2.5 right-3 text-zinc-400 cursor-pointer"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </div>
          </div>

          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-lg bg-zinc-700 border border-zinc-600 focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>

          <button
            type="submit"
            disabled={loading}
            className={\`w-full py-2 rounded-lg text-white font-semibold transition-colors \${loading
              ? "bg-blue-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"}\`}
          >
            {loading ? "Registering..." : "Register"}
          </button>

          {message && (
            <p
              className={\`mt-4 text-center text-sm \${message.toLowerCase().includes("success")
                ? "text-green-400"
                : "text-red-400"}\`}
            >
              {message}
            </p>
          )}
        </div>
      </form>
    </div>
  );
};

export default Register;`;

export default fullCode;

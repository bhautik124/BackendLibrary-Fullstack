const FullCodeUI1 = `
import React from "react";
import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { FaFingerprint, FaShieldAlt } from "react-icons/fa";

const GoogleSignup = () => {
  const handleSignupSuccess = async (credentialResponse) => {
    try {
      const res = await axios.post(
        "Enter Your Generated Api Here......",
        { token: credentialResponse.credential },
        { withCredentials: true }
      );

      console.log("Signup Success:", res.data);
      // TODO: Save user info in context or redirect
    } catch (err) {
      console.error("Signup Failed", err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Animated Background Blobs */}
      <div className="absolute top-20 left-20 w-32 h-32 bg-cyan-500/20 rounded-full blur-xl animate-pulse"></div>
      <div className="absolute bottom-20 right-20 w-40 h-40 bg-purple-500/20 rounded-full blur-xl animate-pulse delay-1000"></div>
      <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-blue-500/20 rounded-full blur-xl animate-pulse delay-500"></div>
      
      {/* Glassmorphism Card */}
      <div className="relative z-10 backdrop-blur-lg bg-white/10 border border-white/20 rounded-2xl p-8 shadow-2xl max-w-md w-full mx-4">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="relative">
              <div className="w-16 h-16 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-full flex items-center justify-center shadow-lg">
                <FaFingerprint className="text-2xl text-white" />
              </div>
              <div className="absolute -inset-1 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-full opacity-30 blur animate-pulse"></div>
            </div>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Google Authentication</h1>
        </div>

        {/* Google Login */}
        <div className="flex justify-center mb-6">
          <div className="w-full">
            <GoogleLogin
              onSuccess={handleSignupSuccess}
              onError={() => {
                console.log("Login Failed");
              }}
              shape="pill"
              theme="filled_black"
              size="large"
              width="100%"
            />
          </div>
        </div>
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
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

export default GoogleSignup;
`;

export default FullCodeUI1;
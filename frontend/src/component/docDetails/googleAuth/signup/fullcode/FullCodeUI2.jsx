const FullCodeUI2 = `
import React from "react";
import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { FaCrown, FaStar } from "react-icons/fa";

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
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-purple-900 via-pink-900 to-rose-900">
      {/* Floating Stars */}
      {[...Array(25)].map((_, i) => (
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
      
      {/* Royal Portal */}
      <div className="relative z-10 backdrop-blur-xl bg-gradient-to-br from-purple-800/30 to-pink-800/30 border-2 border-yellow-300/30 rounded-3xl p-10 shadow-2xl max-w-md w-full mx-4">
        {/* Golden Border Glow */}
        <div className="absolute -inset-1 bg-gradient-to-br from-yellow-300 via-yellow-400 to-yellow-300 rounded-3xl opacity-20 blur animate-pulse"></div>
        
        {/* Header */}
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
            Google Authentication
          </h1>
        </div>

        {/* Magical Divider */}
        <div className="flex items-center justify-center gap-2 mb-6">
          <div className="w-12 h-px bg-gradient-to-r from-transparent via-yellow-300 to-transparent"></div>
          <FaStar className="text-yellow-300 animate-spin text-xs" style={{animationDuration: '3s'}} />
          <div className="w-12 h-px bg-gradient-to-r from-transparent via-yellow-300 to-transparent"></div>
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

        {/* Royal Footer */}
        <div className="text-center text-xs text-purple-200 space-y-2">
          <p className="italic">
            "By royal decree, your data is protected by ancient magic"
          </p>
          <div className="flex items-center justify-center gap-2">
            <span className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></span>
            <span>Enchanted with OAuth protection</span>
            <span className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></span>
          </div>
        </div>

        {/* Sparkle Effects */}
        <div className="absolute top-4 right-4 text-yellow-300/60 animate-pulse">✨</div>
        <div className="absolute bottom-4 left-4 text-yellow-300/60 animate-pulse delay-500">🌟</div>
        <div className="absolute top-1/3 right-8 text-yellow-300/40 animate-pulse delay-1000">⭐</div>
      </div>

      {/* Magical Aura */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-yellow-300/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-pink-300/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>
    </div>
  );
};

export default GoogleSignup;
`;

export default FullCodeUI2;
const FullCodeUI3 = `
import React from "react";
import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { FaLeaf, FaTree } from "react-icons/fa";

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
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-green-900 via-emerald-900 to-teal-900">
      {/* Organic Background Shapes */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-green-500/10 rounded-full blur-3xl"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-teal-500/5 rounded-full blur-3xl"></div>
      
      {/* Nature Card */}
      <div className="relative z-10 backdrop-blur-lg bg-emerald-800/20 border border-emerald-400/30 rounded-3xl p-8 shadow-2xl max-w-md w-full mx-4">
        {/* Organic Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="relative">
              <div className="w-18 h-18 bg-gradient-to-br from-emerald-400 to-green-600 rounded-full flex items-center justify-center shadow-lg p-4">
                <FaLeaf className="text-2xl text-white" />
              </div>
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-400/60 rounded-full animate-pulse"></div>
              <div className="absolute -bottom-1 -left-1 w-4 h-4 bg-emerald-400/60 rounded-full animate-pulse delay-500"></div>
            </div>
          </div>
          <h1 className="text-3xl font-bold text-emerald-100 mb-2">Eco Community</h1>
          <p className="text-emerald-300 text-sm">
            Join our sustainable digital ecosystem
          </p>
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
            <span>Eco-Friendly</span>
          </div>
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

        {/* Eco Footer */}
        <div className="text-center text-xs text-emerald-200 space-y-2">
          <p className="flex items-center justify-center gap-2">
            <span>🌱</span>
            <span>Powered by renewable energy</span>
            <span>🌍</span>
          </p>
          <p className="text-emerald-300">
            Every login plants a virtual tree in our digital forest
          </p>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-6 right-6 text-emerald-300/40 animate-bounce text-lg">🍃</div>
        <div className="absolute bottom-6 left-6 text-green-300/40 animate-bounce delay-700 text-sm">🌿</div>
        <div className="absolute top-1/3 left-4 text-emerald-400/30 animate-bounce delay-1000 text-xs">🌱</div>
      </div>

      {/* Flowing Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => (
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
            {['🌿', '🍃', '🌱'][Math.floor(Math.random() * 3)]}
          </div>
        ))}
      </div>

      <style jsx>{\`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
      \`}</style>
    </div>
  );
};

export default GoogleSignup;
`;

export default FullCodeUI3;
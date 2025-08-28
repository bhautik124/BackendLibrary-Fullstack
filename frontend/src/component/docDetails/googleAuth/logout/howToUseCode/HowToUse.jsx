import React from "react";

const HowToUse = `import axios from "axios";
try {
  const res = await axios.post(
    "Enter Your Generated Api Here......",
    {},
    { withCredentials: true }
  );
  console.log(res.data.message); // Logged out successfully

  // Optional: Clear user state, context, etc.
  // Example: setUser(null);
} catch (err) {
  console.error("Logout failed", err);
}
  
`;

export default HowToUse;

import React from "react";

const HowToUseCode = `import axios from "axios";

axios
  .post("Your generated API URL", {
    withCredentials: true, // 🔐 required to clear cookie
  })
  .then((res) => {
    console.log("Logout successful:", res.data.message);
  })
  .catch((err) => {
    console.error("Logout failed:", err.response.data);
  });
`;

export default HowToUseCode;

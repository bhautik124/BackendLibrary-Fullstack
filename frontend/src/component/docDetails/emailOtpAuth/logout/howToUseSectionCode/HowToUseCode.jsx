import React from "react";

const HowToUseCode = `import axios from "axios";

axios
  .get("Your generated API URL", {
    withCredentials: true,
  })
  .then(() => {
    alert("Logged out");
  })
  .catch((err) => {
    console.error("Logout failed:", err.response.data);
  });

`;

export default HowToUseCode;

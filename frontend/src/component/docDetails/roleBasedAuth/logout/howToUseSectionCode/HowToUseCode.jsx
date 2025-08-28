import React from "react";

const HowToUseCode = `import axios from "axios";

axios
  .post(
    "Enter Your Generated Api Here......",
    {},
    {
      withCredentials: true, // 🔐 Needed to clear the HTTP-only cookie
    }
  )
  .then((res) => {
    console.log("Logout successful:", res.data.message);
  })
  .catch((err) => {
    console.error("Logout failed:", err.response?.data || err.message);
  });


`;

export default HowToUseCode;

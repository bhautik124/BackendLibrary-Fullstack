import React from "react";

const HowToUseCode1 = `import axios from "axios";

axios
  .post(
    "Enter Your Generated Api Here......",
    {
      email: "john@example.com",
      password: "John@12345",
    },
    {
      withCredentials: true,
    }
  )
  .then((res) => {
    console.log("Password verified:", res.data);
    // Proceed to send OTP
  })
  .catch((err) => {
    console.error("Verification failed:", err.response?.data);
  });

`;

export default HowToUseCode1;

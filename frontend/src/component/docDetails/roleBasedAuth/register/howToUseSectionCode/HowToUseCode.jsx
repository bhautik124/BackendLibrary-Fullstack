import React from "react";

const HowToUseCode = `
import axios from "axios";

axios
  .post(
    "Enter Your Generated Api Here......",
    {
      userName: "JohnDoe",
      email: "johndoe@example.com",
      password: "SecurePassword123@",
      role: "user",
    },
    {
      withCredentials: true, // 🔐 Important to receive HTTP-only cookie
    }
  )
  .then((res) => {
    console.log("User registered:", res.data);
  })
  .catch((err) => {
    console.error("Registration failed:", err.response?.data || err.message);
  });

`;

export default HowToUseCode;

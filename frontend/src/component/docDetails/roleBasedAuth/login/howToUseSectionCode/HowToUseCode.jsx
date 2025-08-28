import React from "react";

const HowToUseCode = `
import axios from "axios";

axios
  .post(
    "Enter Your Generated Api Here......",
    {
      email: "johndoe@example.com",
      password: "SecurePassword123@",
      role: "user",
    },
    {
      withCredentials: true, // 🔐 Needed to receive HTTP-only auth cookie
    }
  )
  .then((res) => {
    console.log("Login Success:", res.data);
  })
  .catch((err) => {
    console.error("Login Failed:", err.response?.data || err.message);
  });

`;

export default HowToUseCode;

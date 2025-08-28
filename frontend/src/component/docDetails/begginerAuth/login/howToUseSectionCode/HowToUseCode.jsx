import React from "react";

const HowToUseCode = `import axios from "axios";

axios.post(
  "Your generated API URL",
  {
    email: "user@example.com",
    password: "YourPassword123@"
  },
  {
    withCredentials: true  // 🔐 Important to receive HTTP-only cookie
  }
).then(res => {
  console.log("User logged in:", res.data.user);
}).catch(err => {
  console.error("Login failed:", err.response.data);
});`;

export default HowToUseCode;

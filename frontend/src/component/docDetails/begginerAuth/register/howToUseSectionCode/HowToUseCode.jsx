import React from "react";

const HowToUseCode = `import axios from "axios";

axios.post(
  "Your generated API URL",
  {
    userName: "YourName",
    email: "user@example.com",
    password: "YourPassword123@"
  },
  {
    withCredentials: true  // 🔐 Important to receive HTTP-only cookie
  }
).then(res => {
  console.log("User registered:", res.data.user);
}).catch(err => {
  console.error("Registration failed:", err.response.data);
});
`;

export default HowToUseCode;

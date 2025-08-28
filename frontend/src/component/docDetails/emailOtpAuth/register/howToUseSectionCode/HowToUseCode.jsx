import React from "react";

const HowToUseCode = `import axios from "axios";

axios
  .post(
    "Your generated API URL",
    {
      userName: "JohnDoe",
      email: "john@example.com",
      password: "John@12345",
    },
    {
      withCredentials: true,
    }
  )
  .then((res) => {
    console.log("User registered:", res.data.user);
  })
  .catch((err) => {
    console.error("Registration failed:", err.response.data);
  });

`;

export default HowToUseCode;

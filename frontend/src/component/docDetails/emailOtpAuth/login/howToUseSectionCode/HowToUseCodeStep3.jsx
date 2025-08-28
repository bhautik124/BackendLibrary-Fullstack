import React from "react";

const HowToUseCodeStep3 = `import axios from "axios";

axios
  .post(
    "Your generated API URL",
    {
      email: "john@example.com",
      password: "John@12345",
      otp: "123456",
    },
    {
      withCredentials: true,
    }
  )
  .then((res) => {
    console.log("Logged in:", res.data.user);
  })
  .catch((err) => {
    alert("Login error: " + err.response.data);
  });

`;

export default HowToUseCodeStep3;

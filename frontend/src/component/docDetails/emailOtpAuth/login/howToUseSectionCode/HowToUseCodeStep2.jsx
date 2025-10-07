import React from "react";

const HowToUseCodeStep2 = `import axios from "axios";

axios
  .post("Your generated API URL", {
    email: "john@example.com",
  })
  .then((res) => {
    alert("OTP sent to email");
  })
  .catch((err) => {
    alert("Error: " + err.response.data);
  });
`;

export default HowToUseCodeStep2;

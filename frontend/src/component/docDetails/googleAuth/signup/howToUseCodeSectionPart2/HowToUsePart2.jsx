import React from "react";

const HowToUsePart2 = `import axios from "axios";

try {
  const res = await axios.post(
    "Enter Your Generated Api Here......",
    { token: credentialResponse.credential },
    { withCredentials: true }
  );

  console.log("Signup Success:", res.data);
  // TODO: Save user info in context or redirect
} catch (err) {
  console.error("Signup Failed", err);
}
  
`;

export default HowToUsePart2;

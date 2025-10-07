const HowToUseCodeInAxios = `import axios from "axios";
import React, { useEffect } from "react";

const FETCH_MODELS_API_KEY = "ENTER_YOUR_API_KEY";
const FETCH_MODELS_TOKEN = "ENTER_YOUR_GENERATED_TOKEN";
const FETCH_MODELS_API_URL = "YOUR_GENERATED_API_URL_FOR_GETTING_MODELS";

const MyComponent = () => {
  useEffect(() => {
    const fetchModels = async () => {
      try {
        const response = await axios.get(FETCH_MODELS_API_URL, {
          headers: {
            "x-api-key": FETCH_MODELS_API_KEY,
            Authorization: \`Bearer \${FETCH_MODELS_TOKEN}\`,
          },
        });
        console.log(response.data.models);
      } catch (err) {
        console.error(err.message || "Failed to fetch models");
      }
    };
    fetchModels();
  }, []);

  return <div>Check the console for the fetched models.</div>;
};

export default MyComponent;
`;

export default HowToUseCodeInAxios;

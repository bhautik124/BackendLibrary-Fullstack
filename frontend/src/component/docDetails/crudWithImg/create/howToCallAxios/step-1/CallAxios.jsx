const HowToUseCodeInAxios = `import { useEffect } from "react";
import axios from "axios";

const API_URL = "ENTER_YOUR_GENERATED_API_URL_HERE";
const apiKey = "ENTER_YOUR_API_KEY_HERE";
const token = "ENTER_YOUR_TOKEN_HERE";

const useFetchModels = () => {
  useEffect(() => {
    const fetchAllModels = async () => {
      console.log("Fetching models...");

      try {
        const { data } = await axios.get(API_URL, {
          headers: {
            "x-api-key": apiKey,
            Authorization: \`Bearer \${token}\`,
          },
        });

        console.log("Models fetched:", data.models || []);
      } catch (err) {
        console.error(
          "Error fetching models:",
          err.response?.data?.msg || err.message || err
        );
      } finally {
        console.log("Fetch attempt finished");
      }
    };

    fetchAllModels();
  }, []);
};

export default useFetchModels;`;

export default HowToUseCodeInAxios;

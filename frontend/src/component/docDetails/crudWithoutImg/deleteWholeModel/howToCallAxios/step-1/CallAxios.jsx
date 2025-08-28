const FetchAllModelsCodeString = `import axios from "axios";
const API_URL = "Enter Your Generated Api Here......";
const apiKey = "YOUR_API_KEY_HERE";
const token = "YOUR_JWT_TOKEN_HERE";
const fetchAllModels = async () => {
  try {
    const { data } = await axios.get(API_URL, {
      headers: {
        "x-api-key": apiKey,
        "Authorization": \`Bearer \${token}\`,
      },
    });
    console.log("All models with data:", data);
    return data;
  } catch (error) {
    console.error("Error fetching models:", error.response?.data || error.message);
  }
};
fetchAllModels();
`;

export default FetchAllModelsCodeString;
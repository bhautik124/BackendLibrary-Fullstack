const AllAxiosCode = `import axios from "axios";

// API URLs, Keys, Tokens
const GET_API_URL = "Enter Your Generated fetch model Api Here......";
const DELETE_MODEL_API_URL = "Enter Your Generated delete model Api Here......";
const getApiKey = "GET_MODEL_API_KEY";
const deleteApiKey = "DELETE_MODEL_API_KEY";
const token = "YOUR_GET_MODEL_JWT_TOKEN_HERE";
const deleteToken = "YOUR_DELETE_MODEL_JWT_TOKEN_HERE";

// Fetch all models with data
export const fetchAllModels = async () => {
  try {
    const { data } = await axios.get(GET_API_URL, {
      headers: {
        "x-api-key": getApiKey,
        Authorization: \`Bearer \${token}\`,
      },
    });
    console.log("Fetch All Models Response:", data); 
    return data.models || [];
  } catch (err) {
    console.error("Error fetching models:", err.response?.data?.msg || err.message);
    throw err.response?.data?.msg || err.message || "Error fetching models";
  }
};

// Delete entire model
export const deleteModel = async (collectionName) => {
  try {
    const { data } = await axios.delete(DELETE_MODEL_API_URL, {
      headers: {
        "x-api-key": deleteApiKey,
        Authorization: \`Bearer \${deleteToken}\`,
        "Content-Type": "application/json",
      },
      data: { collectionName },
    });
    console.log(\`Delete Model Response for '\${collectionName}':\`, data); 
    return data;
  } catch (err) {
    console.error(
      \`Error deleting model '\${collectionName}':\`,
      err.response?.data?.error || err.response?.data?.msg || err.message
    );
    throw err.response?.data?.error || err.response?.data?.msg || err.message;
  }
};`;

export default AllAxiosCode;

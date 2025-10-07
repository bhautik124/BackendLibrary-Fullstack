const AllAxiosCode = `import axios from "axios";

// API URLs, Keys, Tokens
const GET_API_URL = "Enter Your Generated fetch model Api Here......";
const DELETE_API_URL = "Enter Your Generated delete data Api Here......";
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
    console.log("Fetched Models:", data.models);
    return data.models || [];
  } catch (err) {
    const errorMsg =
      err.response?.data?.msg || err.message || "Error fetching models";
    console.log("Error fetching models:", errorMsg);
    throw errorMsg;
  }
};

// Delete a specific document
const deleteDocument = async (collectionName, documentId) => {
  try {
    const { data } = await axios.delete(DELETE_API_URL, {
      headers: {
        "x-api-key": deleteApiKey,
        Authorization: \`Bearer \${deleteToken}\`,
        "Content-Type": "application/json",
      },
      data: {
        collectionName,
        id: documentId,
      },
    });
    console.log(\`Deleted Document \${documentId} from \${collectionName}:\`, data);
    return data;
  } catch (err) {
    const errorMsg =
      err.response?.data?.error || err.response?.data?.msg || err.message;
    console.log(
      \`Error deleting Document \${documentId} from \${collectionName}:\`,
      errorMsg
    );
    throw errorMsg;
  }
};`;

export default AllAxiosCode;

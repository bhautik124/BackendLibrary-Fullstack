const AllAxiosCode = `import axios from "axios";
// API URLs, Keys, Tokens
const GET_API_URL = "Enter Your Generated fetch model Api Here......";
const UPDATE_API_URL = "Enter Your Generated update model Api Here......";
const getApiKey = "GET_MODEL_API_KEY";
const updateApiKey = "UPDATE_MODEL_API_KEY";
const token = "YOUR_GET_MODEL_JWT_TOKEN_HERE";
const updateToken = "YOUR_UPDATE_MODEL_JWT_TOKEN_HERE";

// Fetch all models
const fetchAllModels = async () => {
  try {
    const { data } = await axios.get(GET_API_URL, {
      headers: {
        "x-api-key": getApiKey,
        Authorization: \`Bearer \${token}\`,
      },
    });
    console.log("Fetched models:", data.models || []);
  } catch (err) {
    console.log("Error fetching models:", err.response?.data?.msg || err.message);
  }
};

// Update a document
const handleUpdate = async (modelName, documentId, fieldData, allowedFields) => {
  let parsedData;
  try {
    parsedData = JSON.parse(fieldData);
    // Validate allowed fields
    const invalidFields = Object.keys(parsedData).filter(
      (key) => !allowedFields.includes(key)
    );
    if (invalidFields.length > 0) {
      console.log(\`Invalid fields: \${invalidFields.join(", ")}. Only allowed fields: \${allowedFields.join(", ")}\`);
      return;
    }
  } catch (err) {
    console.log("Invalid JSON format:", err.message);
    return;
  }
  try {
    const res = await axios.put(
      UPDATE_API_URL,
      {
        collectionName: modelName,
        id: documentId,
        data: parsedData,
      },
      {
        headers: {
          "x-api-key": updateApiKey,
          Authorization: \`Bearer \${updateToken}\`,
          "Content-Type": "application/json",
        },
      }
    );
    console.log("Update response:", res.data);
    // Refresh models after update
    const { data } = await axios.get(GET_API_URL, {
      headers: {
        "x-api-key": getApiKey,
        Authorization: \`Bearer \${token}\`,
      },
    });
    console.log("Refreshed models:", data.models || []);
  } catch (err) {
    console.log("Error updating document:", err.response?.data?.error || err.message);
  }
};`;

export default AllAxiosCode;

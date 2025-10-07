const UpdateDataCode = `import axios from "axios";
const API_URL = "Enter Your Generated Api Here......";
const apiKey = "YOUR_API_KEY_HERE";
const token = "YOUR_JWT_TOKEN_HERE";
const updateDocument = async (collectionName, id, data) => {
  try {
    const response = await axios.post(
      API_URL,
      {
        collectionName,
        id,
        data,
      },
      {
        headers: {
          "x-api-key": apiKey,
          "Authorization": \`Bearer \${token}\`,
          "Content-Type": "application/json",
        },
      }
    );
    console.log("Updated document:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error updating document:", error.response?.data || error.message);
  }
};`;

export default UpdateDataCode;

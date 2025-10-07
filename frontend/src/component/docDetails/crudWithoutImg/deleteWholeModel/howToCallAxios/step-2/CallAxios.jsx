const DeleteData = `import axios from "axios";
const DELETE_API_URL = "Enter Your Generated Api Here......";
const deleteApiKey = "YOUR_API_KEY_HERE";
const deleteToken = "YOUR_JWT_TOKEN_HERE";
const deleteModel = async (collectionName) => {
  try {
    const { data } = await axios.delete(DELETE_MODEL_API_URL, {
      headers: {
        "x-api-key": deleteApiKey,
        Authorization: \`Bearer \${deleteToken}\`,
        "Content-Type": "application/json",
      },
      data: { collectionName },
    });
    console.log("Deleted model:", data);
  } catch (err) {
    throw err.response?.data?.error || err.response?.data?.msg || err.message;
    console.log("Error deleting model:", err.message);
  }
};`;

export default DeleteData;

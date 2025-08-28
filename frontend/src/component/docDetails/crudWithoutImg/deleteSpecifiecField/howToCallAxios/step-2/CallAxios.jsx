const DeleteData = `import axios from "axios";
const DELETE_API_URL = "Enter Your Generated Api Here......";
const deleteApiKey = "YOUR_API_KEY_HERE";
const deleteToken = "YOUR_JWT_TOKEN_HERE";
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

export default DeleteData;

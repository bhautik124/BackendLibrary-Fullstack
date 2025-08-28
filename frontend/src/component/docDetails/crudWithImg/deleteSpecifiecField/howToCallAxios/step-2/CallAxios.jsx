const DeleteData = `import axios from "axios";

// ------------------ API Constants ------------------
const CRUD_DELETE_API_URL = "ENTER_YOUR_DELETE_API_URL";
const CRUD_DELETE_API_KEY = "ENER_YOUR_DELETE_API_KEY";
const CRUD_DELETE_TOKEN = "ENER_YOUR_DELETE_TOKEN";
const FETCH_MODELS_API_URL = "ENTER_YOUR_FETCH_MODELS_API_URL";
const FETCH_MODELS_API_KEY = "ENER_YOUR_FETCH_MODELS_API_KEY";
const FETCH_MODELS_TOKEN = "ENER_YOUR_FETCH_MODELS_TOKEN";

export async function handleDelete(modelName, id) {
  try {
    await axios.delete(CRUD_DELETE_API_URL, {
      headers: {
        "x-api-key": CRUD_DELETE_API_KEY,
        Authorization: \`Bearer \${CRUD_DELETE_TOKEN}\`,
        "Content-Type": "application/json",
      },
      data: {
        collectionName: modelName,
        id,
      },
    });

    console.log("Document deleted ");

    // Refresh models after deletion
    const refreshed = await axios.get(FETCH_MODELS_API_URL, {
      headers: {
        "x-api-key": FETCH_MODELS_API_KEY,
        Authorization: \`Bearer \${FETCH_MODELS_TOKEN}\`,
      },
    });
    console.log("Refreshed Models:", refreshed.data.models);
  } catch (err) {
    console.error(err.response?.data || err.message);
    console.log("Deletion failed ");
  }
}
`;

export default DeleteData;
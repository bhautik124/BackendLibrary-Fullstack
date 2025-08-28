const DeleteData = `import axios from "axios";

// ------------------ API Constants ------------------
const CRUD_DELETE_MODEL_API_URL = "ENTER_DELETE_MODEL_API_URL";
const CRUD_DELETE_MODEL_API_KEY = "ENER_DELETE_MODEL_API_KEY";
const CRUD_DELETE_MODEL_TOKEN = "ENER_DELETE_MODEL_TOKEN";
const FETCH_MODELS_API_URL = "ENTER_FETCH_MODELS_API_URL";
const FETCH_MODELS_API_KEY = "ENTER_FETCH_MODELS_API_KEY";
const FETCH_MODELS_TOKEN = "ENTER_FETCH_MODELS_TOKEN";


export async function handleDeleteModel(modelName) {
  try {
    await axios.delete(CRUD_DELETE_MODEL_API_URL, {
      headers: {
        "x-api-key": CRUD_DELETE_MODEL_API_KEY,
        Authorization: \`Bearer \${CRUD_DELETE_MODEL_TOKEN}\`,
        "Content-Type": "application/json",
      },
      data: {
        collectionName: modelName,
      },
    });

    console.log(\`Model '\${modelName}' deleted\`);

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
    console.log(\`Deletion of model '\${modelName}' failed\`);
  }
}
`;

export default DeleteData;

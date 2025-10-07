const AllAxiosCode = `import axios from "axios";

// ------------------ API Constants ------------------
const CRUD_UPDATE_API_URL = "ENTER_YOUR_GENERATED_UPDATE_API_URL_HERE";
const CRUD__UPDATE_API_KEY = "ENTER_YOUR_CRUD_UPDATE_API_KEY";
const CRUD__UPDATE_TOKEN = "ENTER_YOUR_CRUD_UPDATE_API_TOKEN";
const FETCH_MODELS_API_URL = "ENTER_YOUR_GENERATED_FETCH_MODELS_API_URL_HERE";
const FETCH_MODELS_API_KEY = "ENTER_YOUR_FETCH_MODELS_API_KEY";
const FETCH_MODELS_TOKEN = "ENTER_YOUR_FETCH_MODELS_API_TOKEN";

export async function fetchModels() {
  try {
    const { data } = await axios.get(FETCH_MODELS_API_URL, {
      headers: {
        "x-api-key": FETCH_MODELS_API_KEY,
        Authorization: \`Bearer \${FETCH_MODELS_TOKEN}\`,
      },
    });
    console.log("Models:", data.models || []);
  } catch (err) {
    console.log("Error:", err.response?.data?.msg || err.message);
  } finally {
    console.log("Loading:", false);
  }
}

export async function submitUpdate(selectedDoc, formData, file) {
  try {
    const form = new FormData();
    form.append("collectionName", selectedDoc.modelName);
    form.append("id", selectedDoc._id);
    form.append("data", JSON.stringify(formData));
    if (file) form.append("file", file);

    await axios.put(CRUD_UPDATE_API_URL, form, {
      headers: {
        "x-api-key": CRUD__UPDATE_API_KEY,
        Authorization: \`Bearer \${CRUD__UPDATE_TOKEN}\`,
        "Content-Type": "multipart/form-data",
      },
    });

    console.log("Update Status:", "Updated ✅");

    // Refresh models after update
    const refreshed = await axios.get(FETCH_MODELS_API_URL, {
      headers: {
        "x-api-key": FETCH_MODELS_API_KEY,
        Authorization: \`Bearer \${FETCH_MODELS_TOKEN}\`,
      },
    });
    console.log("Refreshed Models:", refreshed.data.models);
    console.log("SelectedDoc:", null);
    console.log("File:", null);
  } catch (err) {
    console.error("Update Error:", err.response?.data || err.message);
    console.log("Update Status:", "Update failed ❌");
  }
}`;

export default AllAxiosCode;

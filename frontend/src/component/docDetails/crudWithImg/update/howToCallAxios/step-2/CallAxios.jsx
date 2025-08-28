const UpdateDataCode = `import axios from "axios";

// ------------------ API Constants ------------------
const CRUD_UPDATE_API_URL = "ENTER_YOUR_GENERATED_UPDATE_API_URL_HERE";
const CRUD__UPDATE_API_KEY = "ENTER_YOUR_API_KEY";
const CRUD__UPDATE_TOKEN = "ENTER_YOUR_API_TOKEN";

export async function submitUpdate(selectedDoc, formData, file, onUpdate) {
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

    alert("Updated");

    // Call the onUpdate callback to refresh models
    onUpdate();
  } catch (err) {
    console.error(err.response?.data || err.message);
    alert("Update failed");
  }
}`;

export default UpdateDataCode;

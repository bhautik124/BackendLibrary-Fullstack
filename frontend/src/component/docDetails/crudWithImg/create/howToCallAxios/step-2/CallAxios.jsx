const HowToUseCodeInAxios = `import axios from "axios";
import { useEffect } from "react";

// ------------------ API Constants ------------------
const CRUD_API_URL = "ENTER_YOUR_CRUD_API_URL";
const CRUD_API_KEY = "ENTER_YOUR_CRUD_API_KEY";
const CRUD_TOKEN = "ENTER_YOUR_CRUD_TOKEN";

const FETCH_MODELS_API_URL = "ENTER_YOUR_FETCH_MODELS_API_URL";
const FETCH_MODELS_API_KEY = "ENTER_YOUR_FETCH_MODELS_API_KEY";
const FETCH_MODELS_TOKEN = "ENTER_YOUR_FETCH_MODELS_TOKEN";

export default function BackendIntegration() {
  // ------------------ FETCH MODELS ------------------
  useEffect(() => {
    const fetchModels = async () => {
      console.log("Fetching models...");
      try {
        const res = await axios.get(FETCH_MODELS_API_URL, {
          headers: {
            "x-api-key": FETCH_MODELS_API_KEY,
            Authorization: \`Bearer \${FETCH_MODELS_TOKEN}\`,
          },
        });
        console.log("Models fetched:", res.data.models || []);
      } catch (err) {
        console.error(
          "Error fetching models:",
          err.response?.data?.error || err.message
        );
      }
    };
    fetchModels();
  }, []);

  // ------------------ ADD DATA ------------------
  const handleAddData = async (selectedModel, dataEntries) => {
    console.log("Adding data for model:", selectedModel.modelName);

    try {
      const data = dataEntries.map((entry) => entry.fields);
      const formData = new FormData();
      formData.append("collectionName", selectedModel.modelName);
      formData.append(
        "fields",
        JSON.stringify(
          selectedModel.fields.reduce(
            (acc, field) => ({ ...acc, [field.name]: field.type }),
            {}
          )
        )
      );
      formData.append("data", JSON.stringify(data));

      // Add images
      dataEntries.forEach((entry) => {
        if (entry.image) {
          formData.append("images", entry.image);
        }
      });

      const res = await axios.post(CRUD_API_URL, formData, {
        headers: {
          "x-api-key": CRUD_API_KEY,
          Authorization: \`Bearer \${CRUD_TOKEN}\`,
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("Data added successfully:", res.data);
    } catch (error) {
      console.error(
        "Error adding data:",
        error.response?.data?.message ||
          error.response?.data?.error ||
          error.message
      );
    }
  };

  return null;
}
`;

export default HowToUseCodeInAxios;

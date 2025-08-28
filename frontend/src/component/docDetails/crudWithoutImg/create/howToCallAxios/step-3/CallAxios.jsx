const HowToUseCodeInAxios = `// ------------------ API KEYS & TOKENS ------------------
const CRUD_API_KEY = "YOUR_API_KEY";
const CRUD_TOKEN = "YOUR_CRUD_TOKEN";

const FETCH_MODELS_API_KEY = "YOUR_API_KEY";
const FETCH_MODELS_TOKEN = "YOUR_FETCH_MODELS_TOKEN";

// ------------------ API CALLS ------------------
const fetchModels = async () => {
  try {
    const res = await axios.get(
      "ENTER_YOUR_API_URL",
      {
        headers: {
          "x-api-key": FETCH_MODELS_API_KEY,
          Authorization: \`Bearer \${FETCH_MODELS_TOKEN}\`,
        },
      }
    );
    console.log("Models:", res.data.models || []);
  } catch (err) {
    console.error(err);
    console.log("Error fetching models");
  }
};

const handleCreateModel = async (e) => {
  e.preventDefault();
  console.log("Clearing error");

  try {
    const body = {
      collectionName,
      fields,
    };

    const res = await axios.post(
      "ENTER_YOUR_API_URL",
      body,
      {
        headers: {
          "x-api-key": CRUD_API_KEY,
          Authorization: \`Bearer \${CRUD_TOKEN}\`,
        },
      }
    );

    console.log("Success:", JSON.stringify(res.data));
  } catch (error) {
    console.log(
      "Error:",
      error.response?.data?.message ||
        error.response?.data?.error ||
        error.message
    );
  }
};

const handleAddData = async (e) => {
  e.preventDefault();
  if (!selectedModel) {
    console.log("Please select a model");
    return;
  }

  try {
    let parsedData;
    try {
      parsedData = JSON.parse(addDataJSON);
    } catch {
      console.log("Invalid JSON");
      return;
    }

    const body = {
      collectionName: selectedModel,
      data: parsedData,
    };

    const res = await axios.post(
      "ENTER_YOUR_API_URL",
      body,
      {
        headers: {
          "x-api-key": CRUD_API_KEY,
          Authorization: \`Bearer \${CRUD_TOKEN}\`,
        },
      }
    );

    console.log("Data added successfully:", JSON.stringify(res.data));
  } catch (err) {
    console.error(err);
    console.log("Error adding data");
  }
};
`;

export default HowToUseCodeInAxios;

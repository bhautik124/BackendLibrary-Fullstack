const HowToUseCodeInAxios = `const CREATE_COLLECTION_API_KEY = "ENTER_YOUR_API_KEY";
const CREATE_COLLECTION_TOKEN = "ENTER_YOUR_GENERATED_TOKEN";

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
          "x-api-key": CREATE_COLLECTION_API_KEY,
          Authorization: \`Bearer \${CREATE_COLLECTION_TOKEN}\`,
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

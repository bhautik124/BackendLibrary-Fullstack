const FullCodeOfAddData = `import React, { useState, useEffect } from "react";
import axios from "axios";

// API Constants
const CRUD_API_URL = "ENTER_YOUR_CRUD_API_URL";
const CRUD_API_KEY = "ENTER_YOUR_CRUD_API_KEY";
const CRUD_TOKEN = "ENTER_YOUR_CRUD_TOKEN";

const FETCH_MODELS_API_URL = "ENTER_YOUR_FETCH_MODELS_API_URL";
const FETCH_MODELS_API_KEY = "ENTER_YOUR_FETCH_MODELS_API_KEY";
const FETCH_MODELS_TOKEN = "ENTER_YOUR_FETCH_MODELS_TOKEN";

const AddDataForm = () => {
  // ------------------ STATES ------------------
  const [dataEntries, setDataEntries] = useState([
    { id: Date.now(), fields: {}, image: null, isOpen: false },
  ]);
  const [models, setModels] = useState([]);
  const [selectedModel, setSelectedModel] = useState(null);
  const [showFields, setShowFields] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);

  // ------------------ FETCH MODELS ------------------
  useEffect(() => {
    const fetchModels = async () => {
      setLoading(true);
      try {
        const res = await axios.get(FETCH_MODELS_API_URL, {
          headers: {
            "x-api-key": FETCH_MODELS_API_KEY,
            Authorization: \`Bearer \${FETCH_MODELS_TOKEN}\`,
          },
        });
        setModels(res.data.models || []);
      } catch (err) {
        setError(err.response?.data?.error || err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchModels();
  }, []);

  // ------------------ HANDLERS ------------------
  const handleDataFieldInput = (entryId, fieldName, value) => {
    setDataEntries((prev) =>
      prev.map((entry) =>
        entry.id === entryId
          ? { ...entry, fields: { ...entry.fields, [fieldName]: value } }
          : entry
      )
    );
  };

  const handleImageChange = (entryId, e) => {
    setDataEntries((prev) =>
      prev.map((entry) =>
        entry.id === entryId ? { ...entry, image: e.target.files[0] } : entry
      )
    );
  };

  const toggleEntry = (entryId) => {
    setDataEntries((prev) =>
      prev.map((entry) =>
        entry.id === entryId ? { ...entry, isOpen: !entry.isOpen } : entry
      )
    );
  };

  const addDataEntry = () => {
    setDataEntries((prev) => [
      ...prev,
      { id: Date.now(), fields: {}, image: null, isOpen: false },
    ]);
  };

  const removeDataEntry = (entryId) => {
    setDataEntries((prev) => prev.filter((entry) => entry.id !== entryId));
  };

  const handleAddData = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setLoading(true);

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

      setSuccess(
        "Data added successfully: " + JSON.stringify(res.data, null, 2)
      );
      setDataEntries([
        { id: Date.now(), fields: {}, image: null, isOpen: false },
      ]);
      setSelectedModel(null);
      setShowFields(false);
    } catch (error) {
      setError(
        error.response?.data?.message ||
          error.response?.data?.error ||
          error.message
      );
    } finally {
      setLoading(false);
    }
  };

  // Get entry label based on the first field
  const getEntryLabel = (entry, index) => {
    if (
      !selectedModel ||
      !selectedModel.fields ||
      !selectedModel.fields.length
    ) {
      return \`Entry \${index}\`;
    }
    const firstField = selectedModel.fields[0].name;
    return entry.fields[firstField] || \`Entry \${index}\`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-200 p-6 flex items-center justify-center">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl p-8 transition-all duration-300">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Add Data to Model
        </h1>

        {/* Error & Success Messages */}
        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 rounded-lg mb-6">
            {error}
          </div>
        )}
        {success && (
          <div className="bg-green-50 border-l-4 border-green-500 text-green-700 p-4 rounded-lg mb-6">
            {success}
          </div>
        )}

        {/* Model Selection */}
        <div className="mb-6 flex items-center gap-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Model
            </label>
            <select
              value={selectedModel?.modelName || ""}
              onChange={(e) => {
                const model = models.find(
                  (m) => m.modelName === e.target.value
                );
                setSelectedModel(model || null);
                setShowFields(false);
                setDataEntries([
                  { id: Date.now(), fields: {}, image: null, isOpen: false },
                ]);
              }}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
            >
              <option value="">Select a model</option>
              {models.map((model) => (
                <option key={model.modelName} value={model.modelName}>
                  {model.modelName}
                </option>
              ))}
            </select>
          </div>
          {selectedModel && (
            <button
              type="button"
              onClick={() => setShowFields(!showFields)}
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors mt-6"
            >
              {showFields ? "Hide Fields" : "Show Fields"}
            </button>
          )}
        </div>

        {/* Model Fields Display */}
        {selectedModel && showFields && (
          <div className="mb-6 bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold text-lg text-gray-800 mb-3">
              Fields for {selectedModel.modelName}
            </h3>
            <ul className="list-disc pl-5">
              {selectedModel.fields.slice(0, -2).map((field) => (
                <li key={field._id} className="text-gray-700">
                  <span className="font-medium capitalize">{field.name}</span>:{" "}
                  {field.type}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Data Entries */}
        {selectedModel && (
          <div className="mb-6">
            <h3 className="font-semibold text-lg text-gray-800 mb-3">
              Data Entries
            </h3>
            {dataEntries.map((entry, index) => (
              <div
                key={entry.id}
                className="mb-2 border border-gray-200 rounded-lg bg-gray-50"
              >
                <button
                  type="button"
                  onClick={() => toggleEntry(entry.id)}
                  className="w-full px-4 py-3 text-left bg-gray-100 rounded-t-lg hover:bg-gray-200 transition-colors flex justify-between items-center"
                >
                  <span className="font-medium">
                    {getEntryLabel(entry, index)}
                  </span>
                  <span>{entry.isOpen ? "▲" : "▼"}</span>
                </button>
                {entry.isOpen && (
                  <div className="p-4">
                    {selectedModel.fields
                      .filter(
                        (field) =>
                          field.name !== "imgUrl" && field.name !== "publicId"
                      )
                      .map((field) => (
                        <div key={field._id} className="mb-3">
                          <label className="block text-sm font-medium text-gray-700 capitalize">
                            {field.name}
                          </label>
                          <input
                            type={field.type === "Number" ? "number" : "text"}
                            value={entry.fields[field.name] || ""}
                            onChange={(e) =>
                              handleDataFieldInput(
                                entry.id,
                                field.name,
                                e.target.value
                              )
                            }
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                            placeholder={\`Enter \${field.name}\`}
                          />
                        </div>
                      ))}
                    <div className="mb-3">
                      <label className="block text-sm font-medium text-gray-700">
                        Image (Optional)
                      </label>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleImageChange(entry.id, e)}
                        className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
                      />
                    </div>
                    {dataEntries.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeDataEntry(entry.id)}
                        className="text-red-500 hover:text-red-700 transition-colors"
                      >
                        Remove Entry
                      </button>
                    )}
                  </div>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={addDataEntry}
              className="text-indigo-600 hover:text-indigo-800 font-medium mt-3 transition-colors"
            >
              + Add More Data
            </button>
          </div>
        )}

        {/* Submit Add Data */}
        <button
          type="submit"
          disabled={loading || !selectedModel}
          onClick={handleAddData}
          className={\`w-full text-white py-3 rounded-lg font-medium transition-all transform \${
            loading || !selectedModel
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-indigo-600 hover:bg-indigo-700"
          }\`}
        >
          {loading ? "Adding Data..." : "Add Data"}
        </button>
      </div>
    </div>
  );
};

export default AddDataForm;`;

export default FullCodeOfAddData;

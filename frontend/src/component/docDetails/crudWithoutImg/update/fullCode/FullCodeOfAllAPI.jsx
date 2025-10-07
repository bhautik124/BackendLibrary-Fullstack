const FullCodeOfAllAPI = `import React, { useEffect, useState } from "react";
import axios from "axios";

// API URLs, Keys, Tokens
const GET_API_URL = "Enter Your Generated fetch model Api Here......";
const UPDATE_API_URL = "Enter Your Generated update model Api Here......";
const getApiKey = "GET_MODEL_API_KEY";
const updateApiKey = "UPDATE_MODEL_API_KEY";
const token = "YOUR_GET_MODEL_JWT_TOKEN_HERE";
const updateToken = "YOUR_UPDATE_MODEL_JWT_TOKEN_HERE";


const Home = () => {
  const [models, setModels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [updateModal, setUpdateModal] = useState(null); // { modelName, documentId, allowedFields, initialData }
  const [fieldData, setFieldData] = useState({}); // Object for field values
  const [updateResponse, setUpdateResponse] = useState(null);
  const [updateError, setUpdateError] = useState(null);

  useEffect(() => {
    const fetchAllModels = async () => {
      try {
        const { data } = await axios.get(GET_API_URL, {
          headers: {
            "x-api-key": getApiKey,
            Authorization: \`Bearer \${token}\`,
          },
        });
        setModels(data.models || []);
      } catch (err) {
        setError(
          err.response?.data?.msg || err.message || "Error fetching models"
        );
      } finally {
        setLoading(false);
      }
    };
    fetchAllModels();
  }, []);

  const handleUpdate = async (e, modelName, documentId) => {
    e.preventDefault();
    setUpdateError(null);
    setUpdateResponse(null);

    try {
      const res = await axios.put(
        UPDATE_API_URL,
        {
          collectionName: modelName,
          id: documentId,
          data: fieldData,
        },
        {
          headers: {
            "x-api-key": updateApiKey,
            Authorization: \`Bearer \${updateToken}\`,
            "Content-Type": "application/json",
          },
        }
      );
      setUpdateResponse(res.data);
      // Refresh models after successful update
      const { data } = await axios.get(GET_API_URL, {
        headers: {
          "x-api-key": getApiKey,
          Authorization: \`Bearer \${token}\`,
        },
      });
      setModels(data.models || []);
      setUpdateModal(null); // Close modal on success
    } catch (err) {
      setUpdateError(err.response?.data?.error || err.message);
    }
  };

  const openUpdateModal = (modelName, documentId, initialData, allowedFields) => {
    // Initialize fieldData with values from initialData for allowed fields
    const filteredData = allowedFields.reduce((acc, field) => {
      acc[field] = initialData[field] !== undefined ? initialData[field] : "";
      return acc;
    }, {});
    setUpdateModal({ modelName, documentId, allowedFields });
    setFieldData(filteredData);
    setUpdateError(null);
    setUpdateResponse(null);
  };

  const closeUpdateModal = () => {
    setUpdateModal(null);
    setFieldData({});
    setUpdateError(null);
    setUpdateResponse(null);
  };

  const handleFieldChange = (field, value) => {
    setFieldData((prev) => ({ ...prev, [field]: value }));
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500"></div>
        <span className="ml-4 text-lg font-semibold text-gray-700">
          Loading models...
        </span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="bg-red-100 text-red-700 p-4 rounded-lg shadow-md">
          <p className="font-semibold">Error: {error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
        All Models
      </h1>
      {models.length === 0 ? (
        <div className="text-center text-gray-600 text-lg">
          No models found.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {models.map((model, idx) => (
            <div
              key={idx}
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-200"
            >
              <h2 className="text-xl font-semibold text-gray-800 mb-3">
                {model.modelName}
              </h2>
              <p className="text-gray-600 mb-4">
                <strong>Fields:</strong>{" "}
                {model.fields.map((field) => field.name).join(", ")}
              </p>
              {model.data.length === 0 ? (
                <p className="text-gray-500 italic">No data available</p>
              ) : (
                <div className="space-y-3">
                  {model.data.map((item, index) => (
                    <div key={index} className="border-t border-gray-200 pt-3">
                      <div className="flex justify-between text-sm text-gray-700">
                        <span className="font-medium">_id:</span>
                        <span>{item._id ?? "-"}</span>
                      </div>
                      {model.fields.map((field, i) => (
                        <div
                          key={i}
                          className="flex justify-between text-sm text-gray-700"
                        >
                          <span className="font-medium">{field.name}:</span>
                          <span>{item[field.name] ?? "-"}</span>
                        </div>
                      ))}
                      <button
                        onClick={() =>
                          openUpdateModal(
                            model.modelName,
                            item._id,
                            item,
                            model.fields.map((field) => field.name)
                          )
                        }
                        className="mt-3 w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors"
                      >
                        Update
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
      {updateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Update Document
            </h2>
            <form
              onSubmit={(e) =>
                handleUpdate(e, updateModal.modelName, updateModal.documentId)
              }
            >
              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">
                  Collection Name:
                </label>
                <input
                  type="text"
                  value={updateModal.modelName}
                  disabled
                  className="w-full p-2 border border-gray-300 rounded-md bg-gray-100"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">
                  Document ID:
                </label>
                <input
                  type="text"
                  value={updateModal.documentId}
                  disabled
                  className="w-full p-2 border border-gray-300 rounded-md bg-gray-100"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">
                  Data:
                </label>
                {updateModal.allowedFields.map((field, i) => (
                  <div key={i} className="mb-2">
                    <label className="block text-gray-600 text-sm font-medium mb-1">
                      {field}
                    </label>
                    <input
                      type="text"
                      value={fieldData[field] || ""}
                      onChange={(e) => handleFieldChange(field, e.target.value)}
                      placeholder={\`Enter value for \${field}\`}
                      className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                ))}
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={closeUpdateModal}
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                >
                  Update Document
                </button>
              </div>
              {updateError && (
                <div className="mt-4 bg-red-100 text-red-700 p-3 rounded-md">
                  <p className="font-semibold">Error: {updateError}</p>
                </div>
              )}
              {updateResponse && (
                <div className="mt-4 bg-green-100 text-green-700 p-3 rounded-md">
                  <h3 className="font-semibold">Updated Document:</h3>
                  <pre className="text-sm">{JSON.stringify(updateResponse, null, 2)}</pre>
                </div>
              )}
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;`;

export default FullCodeOfAllAPI;

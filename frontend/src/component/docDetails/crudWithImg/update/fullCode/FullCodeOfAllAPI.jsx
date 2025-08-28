const FullCodeOfAllAPI = `import React, { useEffect, useState } from "react";
import axios from "axios";

// ------------------ API Constants ------------------
const CRUD_UPDATE_API_URL = "ENTER_YOUR_GENERATED_UPDATE_API_URL_HERE";
const CRUD__UPDATE_API_KEY = "ENTER_YOUR_CRUD_UPDATE_API_KEY";
const CRUD__UPDATE_TOKEN = "ENTER_YOUR_CRUD_UPDATE_API_TOKEN";
const FETCH_MODELS_API_URL = "ENTER_YOUR_GENERATED_FETCH_MODELS_API_URL_HERE";
const FETCH_MODELS_API_KEY = "ENTER_YOUR_FETCH_MODELS_API_KEY";
const FETCH_MODELS_TOKEN = "ENTER_YOUR_FETCH_MODELS_API_TOKEN";

export default function ModelsWithData() {
  const [models, setModels] = useState([]);
  const [selectedDoc, setSelectedDoc] = useState(null);
  const [formData, setFormData] = useState({});
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ---------------- Fetch models + data ----------------
  useEffect(() => {
    const fetchModels = async () => {
      try {
        const { data } = await axios.get(FETCH_MODELS_API_URL, {
          headers: {
            "x-api-key": FETCH_MODELS_API_KEY,
            Authorization: \`Bearer \${FETCH_MODELS_TOKEN}\`,
          },
        });
        setModels(data.models || []);
      } catch (err) {
        setError(err.response?.data?.msg || err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchModels();
  }, []);

  // ---------------- Handle Update Form ----------------
  const handleUpdate = (modelName, doc) => {
    setSelectedDoc({ modelName, ...doc });
    setFormData(doc);
  };

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleFile = (e) => {
    setFile(e.target.files[0]);
  };

  const submitUpdate = async () => {
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

      alert("Updated ✅");

      // Refresh models after update
      const refreshed = await axios.get(FETCH_MODELS_API_URL, {
        headers: {
          "x-api-key": FETCH_MODELS_API_KEY,
          Authorization: \`Bearer \${FETCH_MODELS_TOKEN}\`,
        },
      });
      setModels(refreshed.data.models);
      setSelectedDoc(null);
      setFile(null);
    } catch (err) {
      console.error(err.response?.data || err.message);
      alert("Update failed ❌");
    }
  };

  // ---------------- UI ----------------
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
        <div className="relative">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-600"></div>
          <div className="absolute top-0 left-0 h-16 w-16 border-4 border-blue-200 rounded-full animate-pulse"></div>
        </div>
        <span className="mt-4 text-lg font-medium text-gray-600">
          Loading models...
        </span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <div className="bg-red-50 text-red-600 p-6 rounded-xl shadow-lg max-w-md text-center">
          <p className="text-lg font-semibold">Error: {error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-6 sm:px-8">
      <h1 className="text-4xl font-bold text-gray-900 mb-10 text-center tracking-tight">
        All Models
      </h1>

      {models.length === 0 ? (
        <div className="text-center text-gray-500 text-xl font-medium">
          No models found.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {models.map((model, idx) => (
            <div
              key={idx}
              className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow duration-300 border border-gray-100"
            >
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                {model.modelName}
              </h2>

              {model.data.length === 0 ? (
                <p className="text-gray-400 italic text-sm">
                  No data available
                </p>
              ) : (
                <div className="space-y-4">
                  {model.data.map((doc, index) => (
                    <div key={index} className="border-t border-gray-200 pt-4">
                      {/* Fields */}
                      {Object.entries(doc).map(
                        ([k, v]) =>
                          k !== "_id" &&
                          k !== "__v" &&
                          k !== "imgUrl" &&
                          k !== "publicId" &&
                          k !== "createdAt" &&
                          k !== "updatedAt" && (
                            <div
                              key={k}
                              className="flex justify-between text-sm text-gray-600 mb-2"
                            >
                              <span className="font-medium capitalize">
                                {k}:
                              </span>
                              <span className="truncate max-w-[200px] text-gray-500">
                                {String(v) || "-"}
                              </span>
                            </div>
                          )
                      )}

                      {/* Image */}
                      {doc.imgUrl && (
                        <div className="mt-4 flex justify-between items-center">
                          <span className="font-medium text-sm text-gray-600">
                            Image:
                          </span>
                          <a
                            href={doc.imgUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <img
                              src={doc.imgUrl}
                              alt="Uploaded"
                              className="w-24 h-24 object-cover rounded-lg border border-gray-200 shadow-sm hover:scale-105 transition-transform duration-200"
                            />
                          </a>
                        </div>
                      )}

                      {/* Update button */}
                      <div className="mt-4">
                        <button
                          onClick={() => handleUpdate(model.modelName, doc)}
                          className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:from-blue-600 hover:to-blue-700 transition-all duration-200"
                        >
                          Update
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Update Modal */}
      {selectedDoc && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 transition-opacity duration-300">
          <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md transform scale-95 animate-in">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              Update {selectedDoc.modelName}
            </h3>

            {Object.entries(formData).map(
              ([k, v]) =>
                k !== "_id" &&
                k !== "__v" &&
                k !== "imgUrl" &&
                k !== "publicId" &&
                k !== "createdAt" &&
                k !== "updatedAt" && (
                  <div key={k} className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 capitalize mb-1">
                      {k}
                    </label>
                    <input
                      type="text"
                      name={k}
                      value={v || ""}
                      onChange={handleChange}
                      className="border border-gray-200 rounded-lg p-3 w-full focus:ring-2 focus:ring-blue-300 focus:border-blue-500 transition-all duration-200"
                    />
                  </div>
                )
            )}

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Update Image
              </label>
              <input
                type="file"
                onChange={handleFile}
                className="text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-600 hover:file:bg-blue-100 transition-all"
              />
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={submitUpdate}
                className="flex-1 bg-gradient-to-r from-green-500 to-green-600 text-white px-4 py-2 rounded-lg font-medium hover:from-green-600 hover:to-green-700 transition-all duration-200"
              >
                Save
              </button>
              <button
                onClick={() => setSelectedDoc(null)}
                className="flex-1 bg-gray-200 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-300 transition-all duration-200"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}`;

export default FullCodeOfAllAPI;

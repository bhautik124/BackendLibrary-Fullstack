const FullCodeOfBothApi = `import React, { useEffect, useState } from "react";
import axios from "axios";

// ------------------ API Constants ------------------
  const CRUD_DELETE_API_URL = "ENTER_YOUR_DELETE_API_URL";
  const CRUD_DELETE_API_KEY = "ENER_YOUR_DELETE_API_KEY";
  const CRUD_DELETE_TOKEN = "ENER_YOUR_DELETE_TOKEN";
  const FETCH_MODELS_API_URL = "ENTER_YOUR_FETCH_MODELS_API_URL";
  const FETCH_MODELS_API_KEY = "ENER_YOUR_FETCH_MODELS_API_KEY";
  const FETCH_MODELS_TOKEN = "ENER_YOUR_FETCH_MODELS_TOKEN";

export default function ModelsWithDelete() {
  const [models, setModels] = useState([]);
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

  // ---------------- Handle Delete ----------------
  const handleDelete = async (modelName, id) => {
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

      alert("Document deleted ✅");

      // Refresh models after deletion
      const refreshed = await axios.get(FETCH_MODELS_API_URL, {
        headers: {
          "x-api-key": FETCH_MODELS_API_KEY,
          Authorization: \`Bearer \${FETCH_MODELS_TOKEN}\`,
        },
      });
      setModels(refreshed.data.models);
    } catch (err) {
      console.error(err.response?.data || err.message);
      alert("Deletion failed ❌");
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

                      {/* Delete button */}
                      <div className="mt-4">
                        <button
                          onClick={() => handleDelete(model.modelName, doc._id)}
                          className="w-full bg-gradient-to-r from-red-500 to-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:from-red-600 hover:to-red-700 transition-all duration-200"
                        >
                          Delete
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
    </div>
  );
}`;

export default FullCodeOfBothApi;

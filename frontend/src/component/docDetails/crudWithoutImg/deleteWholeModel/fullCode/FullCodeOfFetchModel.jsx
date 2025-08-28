const FullCodeOfFetchModel = `import React, { useEffect, useState } from "react";
import axios from "axios";

const API_URL = "Enter Your Generated Api Here......";
const apiKey = "YOUR_API_KEY_HERE";
const token = "YOUR_JWT_TOKEN_HERE";

const Home = () => {
  const [models, setModels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  useEffect(() => {
    const fetchAllModels = async () => {
      try {
        const { data } = await axios.get(API_URL, {
          headers: {
            "x-api-key": apiKey,
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
};
export default Home;`;

export default FullCodeOfFetchModel;

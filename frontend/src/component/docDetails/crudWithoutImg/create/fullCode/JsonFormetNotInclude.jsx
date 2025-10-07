const JsonFormetNotIncludeFullCode = `
import React, { useState, useEffect } from "react";
import axios from "axios";

const JsonFormetNotIncludeFullCode = () => {
  // ------------------ API KEYS & TOKENS ------------------
  const CRUD_API_KEY = "ENTER_YOUR_CRUD_API_KEY_HERE";
  const CRUD_TOKEN = "ENTER_YOUR_CRUD_TOKEN_HERE";

  const FETCH_MODELS_API_KEY = "ENTER_YOUR_FETCH_MODELS_API_KEY_HERE";
  const FETCH_MODELS_TOKEN = "ENTER_YOUR_FETCH_MODELS_TOKEN_HERE";

  // ------------------ STATES ------------------
  const [models, setModels] = useState([]);
  const [selectedModel, setSelectedModel] = useState("");
  const [modelFields, setModelFields] = useState([]);
  const [addDataJSON, setAddDataJSON] = useState("{}");

  // ------------------ FETCH MODELS ON LOAD ------------------
  useEffect(() => {
    fetchModels();
  }, []);

  const fetchModels = async () => {
    try {
      const res = await axios.get("ENTER_YOUR_FETCH_MODELS_API_URL_HERE", {
        headers: {
          "x-api-key": FETCH_MODELS_API_KEY,
          Authorization: \`Bearer \${FETCH_MODELS_TOKEN}\`,
        },
      });
      setModels(res.data.models || []);
    } catch (err) {
      console.error(err);
      alert("Error fetching models");
    }
  };

  const handleAddData = async (e) => {
    e.preventDefault();
    if (!selectedModel) {
      alert("Please select a model");
      return;
    }

    try {
      let parsedData;
      try {
        parsedData = JSON.parse(addDataJSON);
      } catch {
        alert("Invalid JSON");
        return;
      }

      const body = {
        collectionName: selectedModel,
        data: parsedData,
      };

      const res = await axios.post("ENTER_YOUR_CRUD_API_URL_HERE", body, {
        headers: {
          "x-api-key": CRUD_API_KEY,
          Authorization: \`Bearer \${CRUD_TOKEN}\`,
        },
      });

      alert("Data added successfully: " + JSON.stringify(res.data));
    } catch (err) {
      console.error(err);
      alert("Error adding data");
    }
  };

  const handleShowFields = () => {
    const model = models.find((m) => m.modelName === selectedModel);
    if (model) {
      setModelFields(model.fields || []);
    } else {
      setModelFields([]);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-200 p-6 flex items-center justify-center">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl p-8 transition-all duration-300">
        {/* Header */}
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Add Data to Model
        </h1>

        {/* Select Model */}
        <div className="space-y-6 animate-fade-in">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Model
            </label>
            <div className="flex gap-3">
              <select
                value={selectedModel}
                onChange={(e) => setSelectedModel(e.target.value)}
                required
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
              >
                <option value="">-- Select Model --</option>
                {models.map((m) => (
                  <option key={m.modelName} value={m.modelName}>
                    {m.modelName}
                  </option>
                ))}
              </select>
              <button
                type="button"
                onClick={handleShowFields}
                className="px-4 py-3 bg-gray-100 hover:bg-gray-200 rounded-lg transition-all"
              >
                Show Fields
              </button>
            </div>

            {modelFields.length > 0 && (
              <ul className="mt-4 list-disc list-inside text-sm text-gray-600 bg-gray-50 p-4 rounded-lg">
                {modelFields.map((f) => (
                  <li key={f._id} className="py-1">
                    {f.name} <span className="text-gray-400">({f.type})</span>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Data JSON */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Data (JSON)
            </label>
            <textarea
              rows="5"
              value={addDataJSON}
              onChange={(e) => setAddDataJSON(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg font-mono text-sm focus:ring-2 focus:ring-indigo-500 transition-all"
              required
              placeholder='{"key": "value"}'
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            onClick={handleAddData}
            className="w-full bg-green-600 text-white py-3 rounded-lg font-medium hover:bg-green-700 transition-all transform hover:scale-105"
          >
            Add Data
          </button>
        </div>
      </div>

      <style jsx>{\`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fadeIn 0.3s ease-out;
        }
      \`}</style>
    </div>
  );
};

export default JsonFormetNotIncludeFullCode;
`;
export default JsonFormetNotIncludeFullCode;

import React, { useState } from "react";
import { GoGoal } from "react-icons/go";
import { FaRegQuestionCircle } from "react-icons/fa";
import { LuStepForward } from "react-icons/lu";
import Step2OfCreate from "./Step2OfCreate";
import useApiGenerateCheckAuth from "../../../userLoginPage/protectedRoute/ForApiGenereateCheckAuth";
import { Navigate } from "react-router-dom";
import axios from "axios";

const CreateWithImg = () => {
  const isAuth = useApiGenerateCheckAuth(); // Use the custom hook

  const [apiURL, setApiURL] = useState("");
  const [token, settoken] = useState("");
  const [apikey, setapikey] = useState("");
  const [collectionName, setCollectionName] = useState("");
  const [fields, setFields] = useState([{ name: "", type: "String" }]);
  const [collectionError, setCollectionError] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [collectionSuccess, setCollectionSuccess] = useState("");
  const [redirectToLogin, setRedirectToLogin] = useState(false);
  const [addedFields, setAddedFields] = useState([]);
  const [allFields, setAllFields] = useState([]);
  const [isFieldsAdded, setIsFieldsAdded] = useState(false);

  const handleFieldChange = (index, e) => {
    const { name, value } = e.target;
    const updatedFields = [...fields];
    updatedFields[index][name] = value;
    setFields(updatedFields);
  };

  const addField = () => {
    setFields([...fields, { name: "", type: "String" }]);
  };

  const removeField = (index) => {
    if (fields.length > 1) {
      setFields(fields.filter((_, i) => i !== index));
    }
  };

  const handleCreateCollection = async () => {
    if (isAuth === null) {
      setError("Authentication check is still loading. Please try again.");
      return;
    }

    if (!isAuth) {
      setRedirectToLogin(true); // Trigger redirect to login page
      return;
    }

    if (!collectionName) {
      setCollectionError("Collection name is required.");
      return;
    }

    if (fields.some((field) => !field.name)) {
      setCollectionError("All field names are required.");
      return;
    }

    setCollectionError("");
    setSuggestions([]);
    setCollectionSuccess("");
    setAddedFields([]);
    setAllFields([]);
    setIsFieldsAdded(false);

    try {
      const response = await axios.post(
  "https://backendlibraryy-fullstack-backend.onrender.com/api/create-collection-name-img",
        { collectionName, fields },
        { withCredentials: true }
      );

      const { message, suggestions, addedFields, allFields } = response.data;
      if (response.status === 201) {
        setCollectionSuccess(message);
      } else if (response.status === 200) {
        setCollectionSuccess(message);

        // Check if fields were added to existing model
        if (addedFields && allFields) {
          setAddedFields(addedFields);
          setAllFields(allFields);
          setIsFieldsAdded(true);
        }
      } else if (suggestions) {
        setCollectionError(message);
        setSuggestions(suggestions);
      }
    } catch (err) {
      console.error(err);
      const errorMessage =
        err.response?.data?.message || "Failed to create collection.";
      setCollectionError(errorMessage);
      if (err.response?.data?.suggestions) {
        setSuggestions(err.response.data.suggestions);
      }
    }
  };

  // Redirect to login if needed
  if (redirectToLogin) {
    return <Navigate to="/user-login" />;
  }

  return (
    <div className="pb-40 px-4 sm:px-6 lg:px-8">
      <h1 className="text-zinc-100 text-2xl sm:text-4xl font-bold">
        CRUD Create Operation (3-Step Process)
      </h1>

      <div className="mt-5">
        <div className="flex items-center gap-2 mb-3">
          <GoGoal className="text-xl sm:text-2xl text-zinc-100" />
          <h2 className="text-xl sm:text-2xl font-bold text-zinc-100">
            Purpose
          </h2>
        </div>
        <div className="ml-2 sm:ml-10">
          <h3 className="text-md sm:text-md font-semibold mb-2">
            This API allows you to create collections such as{" "}
            <code className="bg-stone-800 text-zinc-200 px-2 py-1 rounded text-xs sm:text-sm font-mono">
              userList
            </code>{" "}
            or{" "}
            <code className="bg-stone-800 text-zinc-200 px-2 py-1 rounded text-xs sm:text-sm font-mono">
              productList
            </code>{" "}
            with image support and custom fields.
          </h3>
        </div>
      </div>

      {/* Information Section */}
      <div className="mt-8">
        <div className="flex items-center gap-2 mb-3">
          <FaRegQuestionCircle className="text-xl sm:text-2xl text-zinc-100" />
          <h2 className="text-xl sm:text-2xl font-bold text-zinc-100">
            Important Information
          </h2>
        </div>

        <div className="mb-3 mt-5 sm:ml-10">
          <div className="flex items-start gap-3 mb-4">
            <div className="mt-1">
              <LuStepForward className="text-xl" />
            </div>
            <p className="text-base sm:text-lg">
              This is a three-step process: create a model with fields, retrieve
              the created model, and add data to the selected model using the{" "}
              <code className="bg-stone-800 text-zinc-200 px-2 py-1 rounded text-xs sm:text-sm font-mono">
                CRUD Creation
              </code>{" "}
              API.
            </p>
          </div>
        </div>

        <div className="mb-3 mt-5 sm:ml-10">
          <div className="flex items-start gap-3 mb-4">
            <div className="mt-1">
              <LuStepForward className="text-xl" />
            </div>
            <p className="text-base sm:text-lg">
              Save or copy your generated token and API key for authentication
              in further operations.
            </p>
          </div>
        </div>

        <div className="mb-3 mt-5 sm:ml-10">
          <div className="flex items-start gap-3 mb-4">
            <div className="mt-1">
              <LuStepForward className="text-xl" />
            </div>
            <p className="text-base sm:text-lg">
              Supported field types include{" "}
              <code className="bg-stone-800 text-zinc-200 px-2 py-1 rounded text-xs sm:text-sm font-mono">
                string
              </code>
              ,{" "}
              <code className="bg-stone-800 text-zinc-200 px-2 py-1 rounded text-xs sm:text-sm font-mono">
                number
              </code>
              , and{" "}
              <code className="bg-stone-800 text-zinc-200 px-2 py-1 rounded text-xs sm:text-sm font-mono">
                boolean
              </code>
              . Support for{" "}
              <code className="bg-stone-800 text-zinc-200 px-2 py-1 rounded text-xs sm:text-sm font-mono">
                array
              </code>{" "}
              and{" "}
              <code className="bg-stone-800 text-zinc-200 px-2 py-1 rounded text-xs sm:text-sm font-mono">
                object
              </code>{" "}
              types is coming soon.
            </p>
          </div>
        </div>
      </div>

      {/* Step 1 – Create Model and Fields */}
      <div className="mb-3 mt-8">
        <div className="flex items-center gap-2">
          <LuStepForward className="text-xl sm:text-2xl text-zinc-100" />
          <h2 className="text-zinc-100 text-xl sm:text-2xl font-semibold">
            STEP 1 – Create Model and Fields
          </h2>
        </div>
      </div>

      {/* Create New Model */}
      <div className="mt-4 sm:mt-8 p-3 sm:p-4 md:p-6 max-w-full sm:max-w-4xl md:max-w-6xl mx-auto border border-stone-700 rounded-md shadow">
        <h2 className="text-xl sm:text-2xl font-black text-zinc-200 mb-3 sm:mb-4">
          Create a New Model
        </h2>

        <div className="mb-4 sm:mb-6">
          <label className="block font-semibold mb-2 sm:mb-3 text-sm sm:text-base">
            Enter Collection Name
          </label>
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 items-center">
            <input
              type="text"
              className="w-full sm:w-9/12 px-2 sm:px-3 py-1.5 sm:py-2 border border-stone-700 rounded bg-stone-950 text-white text-sm sm:text-base"
              placeholder="e.g., products"
              value={collectionName}
              onChange={(e) => setCollectionName(e.target.value)}
            />
            <button
              onClick={handleCreateCollection}
              className="text-sm sm:text-base md:text-lg font-bold border border-stone-700 bg-stone-800 hover:bg-stone-700 transition rounded-full px-2 sm:px-3 py-1 w-fit"
            >
              Create Collection
            </button>
          </div>

          {/* Fields Section */}
          <div className="mt-4 sm:mt-6">
            <h3 className="font-semibold text-base sm:text-lg text-zinc-200 mb-2 sm:mb-3">
              Fields
            </h3>
            {fields.map((field, index) => (
              <div
                key={index}
                className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3 mb-3 rounded-lg transition-all hover:shadow-sm"
              >
                <input
                  type="text"
                  name="name"
                  placeholder="Field name"
                  value={field.name}
                  onChange={(e) => handleFieldChange(index, e)}
                  className="w-full sm:w-9/12 px-2 sm:px-3 py-1.5 sm:py-2 border border-stone-700 rounded bg-stone-950 text-white text-sm sm:text-base focus:ring-2 focus:ring-stone-500"
                />
                <select
                  name="type"
                  value={field.type}
                  onChange={(e) => handleFieldChange(index, e)}
                  className="w-full sm:w-auto px-2 sm:px-3 py-1.5 sm:py-2 border border-stone-700 rounded bg-stone-950 text-white text-sm sm:text-base focus:ring-2 focus:ring-stone-500"
                >
                  <option value="String">String</option>
                  <option value="Number">Number</option>
                  <option value="Boolean">Boolean</option>
                </select>
                <button
                  type="button"
                  onClick={() => removeField(index)}
                  className="text-xl sm:text-2xl text-red-500 hover:text-red-700 transition-colors"
                >
                  🗑
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={addField}
              className="text-sm sm:text-base font-bold border border-stone-700 hover:bg-stone-900 transition rounded-full px-2 sm:px-3 py-1 w-fit"
            >
              + Add Field
            </button>
          </div>

          {collectionError && (
            <div className="mt-2 text-center">
              <p className="text-red-500 text-sm sm:text-base">
                {collectionError}
              </p>
              {suggestions.length > 0 && (
                <div className="mt-2">
                  <p className="text-white text-sm sm:text-base">
                    Suggested collection names:
                  </p>
                  <ul className="list-disc list-inside text-white text-sm sm:text-base">
                    {suggestions.map((suggestion, index) => (
                      <li key={index}>{suggestion}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
          {collectionSuccess && (
            <div className="text-center text-green-500 mt-2 text-sm sm:text-base">
              <p className="font-semibold">{collectionSuccess}</p>

              {isFieldsAdded && addedFields.length > 0 && (
                <div className="mt-3 p-3">
                  <p className="text-green-700 font-medium mb-2">
                    📝 Fields Added to Existing Model:
                  </p>

                  <p className="text-green-600 text-xs mt-2">
                    Total fields in model: {allFields.length}
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <Step2OfCreate />
    </div>
  );
};

export default CreateWithImg;

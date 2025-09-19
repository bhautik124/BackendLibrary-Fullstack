import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import useApiGenerateCheckAuth from "../../userLoginPage/protectedRoute/ForApiGenereateCheckAuth";

const GetBackupOfData = () => {
  const isAuth = useApiGenerateCheckAuth();

  const handleDownload = async () => {
    try {
      const response = await fetch(
        "https://backendlibrary-fullstack-backend.onrender.com/api/crud-get-backup",
        { method: "GET", credentials: "include" }
      );
      if (!response.ok) throw new Error("Failed to fetch backup data");

      const data = await response.json();
      const blob = new Blob([JSON.stringify(data, null, 2)], {
        type: "application/json",
      });
      const url = URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = "backup.json";
      document.body.appendChild(link);
      link.click();

      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading backup:", error);
      alert("Failed to download backup data.");
    }
  };

  if (isAuth === null)
    return <p className="text-white">Checking authentication...</p>;

  if (isAuth === false) return <Navigate to="/user-login" replace />;

  return (
    <div className="pb-40 px-4 sm:px-6 lg:px-8">
      <h1 className="text-zinc-100 text-2xl sm:text-3xl font-bold mb-4">
        Data Backup
      </h1>

      <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-10">
        <p className="text-base sm:text-lg">
          To get the backup of your data, Click on the "Download" button.
        </p>
        <button
          onClick={handleDownload}
          className="text-base sm:text-lg font-bold border border-stone-700 bg-stone-800 hover:bg-stone-700 transition rounded-full px-3 py-1 sm:py-0 w-fit"
        >
          Download
        </button>
      </div>
    </div>
  );
};

export default GetBackupOfData;

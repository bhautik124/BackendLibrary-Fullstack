import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaCopy } from "react-icons/fa";
import CopyToast from "../../docDetails/copyCodeToast/CopyToast";

const API_URL = "https://backendlibrary-fullstack-backend.onrender.com/api/get-login-user-data";
const LOGOUT_URL = "https://backendlibrary-fullstack-backend.onrender.com/api/user/auth/logout";

const UserPanel = () => {
  const [user, setUser] = useState(null);
  const [expanded, setExpanded] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const navigate = useNavigate();

  const maskSensitiveData = (data) => {
    if (!data || data.length < 10) return data;
    return `${data.slice(0, 6)}*****${data.slice(-4)}`;
  };

  const APIS_PER_PAGE = 6;

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch(API_URL, {
          method: "GET",
          credentials: "include",
        });
        const result = await res.json();

        if (result?.data) {
          setUser(result.data);
        }
      } catch (err) {
        console.error("Error fetching user data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const handleLogout = async () => {
    try {
      const res = await fetch(LOGOUT_URL, {
        method: "POST",
        credentials: "include",
      });
      if (res.ok) {
        setUser(null);
        navigate("/docs");
      } else {
        console.error("Logout failed");
      }
    } catch (err) {
      console.error("Error during logout:", err);
    }
  };

  const toggleExpansion = () => {
    setExpanded((prev) => !prev);
  };

  const handleSetCurrentPage = (page) => {
    setCurrentPage(page);
  };

  const handleCopy = (text) => {
    if (text) {
      navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-white">
        Loading...
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex justify-center items-center h-screen text-white">
        No user data available
      </div>
    );
  }

  const totalPages = Math.ceil(user.apis.length / APIS_PER_PAGE);
  const startIndex = (currentPage - 1) * APIS_PER_PAGE;
  const endIndex = startIndex + APIS_PER_PAGE;
  const paginatedApis = user.apis.slice(startIndex, endIndex);

  return (
    <div className="p-4 sm:p-6 font-mono">
      {/* Top Bar */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-zinc-300 text-center sm:text-left">
          User Profile
        </h1>
        <button
          onClick={handleLogout}
          className="w-full sm:w-auto border border-stone-700 bg-stone-700 text-white px-4 py-2 rounded-lg hover:bg-stone-800 transition"
        >
          Logout
        </button>
      </div>

      {/* User Card */}
      <div className="grid gap-6 grid-cols-1">
        <div className="bg-stone-950 text-zinc-300 rounded-2xl p-4 sm:p-5 border border-stone-700">
          {/* User Info */}
          <h2 className="text-lg sm:text-xl font-bold">
            Name: {user.userName}
          </h2>
          <p className="text-sm sm:text-base break-all">Email: {user.email}</p>

          {/* Show APIs Button */}
          <button
            onClick={toggleExpansion}
            className="mt-3 border border-stone-600 px-3 py-1 rounded hover:bg-stone-800 transition text-white w-full sm:w-auto"
          >
            {expanded ? "Hide APIs" : "Show APIs"}
          </button>

          {/* APIs List */}
          {expanded && (
            <div className="mt-4 overflow-x-auto">
              {paginatedApis.length > 0 ? (
                paginatedApis.map((api) => (
                  <div
                    key={api._id}
                    className="flex flex-col sm:flex-row justify-between sm:items-center border-b border-stone-700 py-3"
                  >
                    <div className="text-sm break-all">
                      <p className="font-bold text-lg">{api.feature}</p>
                      <p className="mt-2 flex items-center gap-2">
                        <span>{api.url}</span>
                      </p>
                      <p className="text-sm mt-2 flex items-center gap-2">
                        <span className="font-bold">API Key:</span> {api.apiKey}
                      </p>
                      {api.token && (
                        <div className="flex items-center gap-4 mt-2">
                          <span className="text-sm">
                            <span className="font-bold">Token : </span>
                            {maskSensitiveData(api.token)}
                          </span>
                          <FaCopy
                            className="cursor-pointer hover:text-zinc-300"
                            onClick={() => handleCopy(api.token)}
                          />
                        </div>
                      )}
                    </div>
                    <button
                      className={`mt-3 sm:mt-0 px-3 py-1 rounded-lg text-sm w-full sm:w-auto ${
                        api.isActive
                          ? "bg-green-500 text-white"
                          : "bg-red-500 text-white"
                      }`}
                    >
                      {api.isActive ? "Active" : "Inactive"}
                    </button>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 mt-2 text-sm">No APIs available</p>
              )}

              {/* Pagination Controls */}
              {totalPages > 1 && (
                <div className="flex flex-wrap justify-center mt-3 gap-2">
                  {Array.from({ length: totalPages }, (_, i) => (
                    <button
                      key={i}
                      onClick={() => handleSetCurrentPage(i + 1)}
                      className={`px-3 py-1 rounded-md border text-sm ${
                        currentPage === i + 1
                          ? "border border-stone-700 bg-stone-700 text-white"
                          : "bg-black border border-stone-700 hover:bg-stone-800 text-white"
                      }`}
                    >
                      {i + 1}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <CopyToast show={copied} message="Copied to clipboard!" />
    </div>
  );
};

export default UserPanel;

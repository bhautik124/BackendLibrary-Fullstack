import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const API_URL = "https://backendlibraryy-fullstack-backend.onrender.com/api/get-all-user-data";
const LOGOUT_URL = "https://backendlibraryy-fullstack-backend.onrender.com/api/admin/auth/logout";
const API_ACCESS_URL = "https://backendlibraryy-fullstack-backend.onrender.com/api/admin/api-access";

const DashBoard = () => {
  const [users, setUsers] = useState([]);
  const [expandedUsers, setExpandedUsers] = useState({});
  const [currentPages, setCurrentPages] = useState({});
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const APIS_PER_PAGE = 6;

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch(API_URL, {
          method: "GET",
          credentials: "include",
        });
        const result = await res.json();

        if (result?.data) {
          setUsers(result.data);

          const initialExpanded = {};
          const initialPages = {};
          result.data.forEach((_, index) => {
            initialExpanded[index] = false;
            initialPages[index] = 1;
          });
          setExpandedUsers(initialExpanded);
          setCurrentPages(initialPages);
        }
      } catch (err) {
        console.error("Error fetching users:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleLogout = async () => {
    try {
      const res = await fetch(LOGOUT_URL, {
        method: "POST",
        credentials: "include",
      });
      if (res.ok) {
        setUsers([]);
        navigate("/admin-login");
      } else {
        console.error("Logout failed");
      }
    } catch (err) {
      console.error("Error during logout:", err);
    }
  };

  // ✅ Backend Connected Toggle
  const toggleApiStatus = async (userIndex, apiIndex) => {
    try {
      const user = users[userIndex];
      const api = user.apis[apiIndex];
      const updatedStatus = !api.isActive;

      const res = await fetch(API_ACCESS_URL, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          userId: user._id,
          url: api.url,
          isActive: updatedStatus,
        }),
      });

      const result = await res.json();

      if (res.ok) {
        // ✅ Backend update success → update state
        setUsers((prev) => {
          const updated = [...prev];
          updated[userIndex].apis[apiIndex].isActive = updatedStatus;
          return updated;
        });
        console.log("API status updated:", result.message);
      } else {
        console.error("Failed to update API status:", result);
      }
    } catch (err) {
      console.error("Error updating API status:", err);
    }
  };

  const toggleUserExpansion = (userIndex) => {
    setExpandedUsers((prev) => ({
      ...prev,
      [userIndex]: !prev[userIndex],
    }));
  };

  const setCurrentPageForUser = (userIndex, page) => {
    setCurrentPages((prev) => ({
      ...prev,
      [userIndex]: page,
    }));
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-white">
        Loading...
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 font-mono">
      {/* Top Bar */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-zinc-300 text-center sm:text-left">
          Total Users: {users.length}
        </h1>
        <button
          onClick={handleLogout}
          className="w-full sm:w-auto border border-stone-700 bg-stone-700 text-white px-4 py-2 rounded-lg hover:bg-stone-800 transition"
        >
          Logout
        </button>
      </div>

      {/* Users Grid */}
      <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
        {users.map((user, userIndex) => {
          const totalPages = Math.ceil(user.apis.length / APIS_PER_PAGE);
          const startIndex = (currentPages[userIndex] - 1) * APIS_PER_PAGE;
          const endIndex = startIndex + APIS_PER_PAGE;
          const paginatedApis = user.apis.slice(startIndex, endIndex);

          return (
            <div
              key={user._id}
              className="bg-stone-950 text-zinc-300 rounded-2xl p-4 sm:p-5 border border-stone-700"
            >
              {/* User Info */}
              <h2 className="text-lg sm:text-xl font-bold">
                Name: {user.userName}
              </h2>
              <p className="text-sm sm:text-base break-all">
                Email: {user.email}
              </p>

              {/* Show APIs Button */}
              <button
                onClick={() => toggleUserExpansion(userIndex)}
                className="mt-3 border border-stone-600 px-3 py-1 rounded hover:bg-stone-800 transition text-white w-full sm:w-auto"
              >
                {expandedUsers[userIndex] ? "Hide APIs" : "Show APIs"}
              </button>

              {/* APIs List */}
              {expandedUsers[userIndex] && (
                <div className="mt-4 overflow-x-auto">
                  {paginatedApis.length > 0 ? (
                    paginatedApis.map((api, apiIndex) => (
                      <div
                        key={api._id}
                        className="flex flex-col sm:flex-row justify-between sm:items-center border-b border-stone-700 py-2 gap-2"
                      >
                        <div className="text-sm break-all">
                          <p className="font-medium">{api.feature}</p>
                          <p>{api.url}</p>
                          <p className="text-xs">API Key: {api.apiKey}</p>
                        </div>
                        <button
                          onClick={() =>
                            toggleApiStatus(userIndex, startIndex + apiIndex)
                          }
                          className={`px-3 py-1 rounded-lg text-sm w-full sm:w-auto ${
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
                    <p className="text-gray-500 mt-2 text-sm">
                      No APIs available
                    </p>
                  )}

                  {/* Pagination Controls */}
                  {totalPages > 1 && (
                    <div className="flex flex-wrap justify-center mt-3 gap-2">
                      {Array.from({ length: totalPages }, (_, i) => (
                        <button
                          key={i}
                          onClick={() =>
                            setCurrentPageForUser(userIndex, i + 1)
                          }
                          className={`px-3 py-1 rounded-md border text-sm ${
                            currentPages[userIndex] === i + 1
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
          );
        })}
      </div>
    </div>
  );
};

export default DashBoard;

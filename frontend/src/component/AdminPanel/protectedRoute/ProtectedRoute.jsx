import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const ProtectedRoute = ({ children }) => {
  const [isAuth, setIsAuth] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
  const res = await axios.get("https://backendlibraryy-fullstack-backend.onrender.com/api/check-auth", {
          withCredentials: true,
        });
        setIsAuth(true);
      } catch (err) {
        setIsAuth(false);
      }
    };
    checkAuth();
  }, []);

  if (isAuth === null) return <p>Loading...</p>;
  return isAuth ? children : <Navigate to="/admin-login" />;
};

export default ProtectedRoute;
